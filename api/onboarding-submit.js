// NailDesk — Onboarding Intake Handler
// Runs after a client pays (Basic/Pro/Studio) and fills in the setup form
// at /onboarding. Uploads their logo, stores the submission, and emails
// both Leona and the client. Requires SUPABASE_URL, SUPABASE_SERVICE_KEY
// and RESEND_API_KEY to be set as Vercel environment variables.

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

const NOTIFY_EMAIL = 'account@ollieconsult.com';
const TIER_LABELS = { basic: 'Basic', pro: 'Pro', studio: 'Studio' };
const DAY_LABELS = { Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday', Sun: 'Sunday' };
const STYLE_PRESET_LABELS = {
  blush_cream: 'Blush & Cream', sage_ivory: 'Sage & Ivory', terracotta_sand: 'Terracotta & Sand',
  charcoal_gold: 'Charcoal & Gold', monochrome: 'Monochrome',
};
// Discounted for choosing it now, at signup - full price if added later.
const STYLING_ADDON_PRICE = 99;
const STYLING_ADDON_LATER_PRICE = 149;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    tier, stripeSessionId,
    studioName, ownerName, ownerEmail, ownerPhone, address, timezone, instagram,
    logoDataUrl, logoFilename,
    wantsStyling, stylePreference, styleNotes,
    hours, services,
    requireDeposit, depositAmount, bankAccountName, bankBsb, bankAccountNumber,
    specialRequests,
  } = req.body || {};

  if (!studioName || !ownerName || !ownerEmail) {
    return res.status(400).json({ error: 'Missing required fields (studio name, owner name, email)' });
  }

  // ── 1. Upload logo (if provided) ─────────────────────────────────
  let logoUrl = null;
  if (logoDataUrl && typeof logoDataUrl === 'string' && logoDataUrl.startsWith('data:')) {
    try {
      const match = logoDataUrl.match(/^data:(.+?);base64,(.+)$/);
      if (match) {
        const contentType = match[1];
        const buffer = Buffer.from(match[2], 'base64');
        const ext = (logoFilename && logoFilename.includes('.'))
          ? logoFilename.split('.').pop().toLowerCase().replace(/[^a-z0-9]/g, '')
          : (contentType.split('/')[1] || 'png');
        const safeSlug = studioName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'studio';
        const path = `${safeSlug}-${Date.now()}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from('studio-logos')
          .upload(path, buffer, { contentType, upsert: false });

        if (uploadError) {
          console.error('Logo upload error:', uploadError);
        } else {
          const { data: pub } = supabase.storage.from('studio-logos').getPublicUrl(path);
          logoUrl = pub?.publicUrl || null;
        }
      }
    } catch (e) {
      console.error('Logo processing error:', e);
      // Non-fatal — continue without a logo rather than failing the whole submission.
    }
  }

  // ── 2. Store the submission ──────────────────────────────────────
  const { data: submission, error: insertError } = await supabase
    .from('onboarding_submissions')
    .insert({
      tier: tier || null,
      stripe_session_id: stripeSessionId || null,
      studio_name: studioName,
      owner_name: ownerName,
      owner_email: ownerEmail,
      owner_phone: ownerPhone || null,
      address: address || null,
      timezone: timezone || 'Australia/Sydney',
      instagram: instagram || null,
      logo_url: logoUrl,
      wants_styling_addon: !!wantsStyling,
      style_preference: wantsStyling ? (stylePreference || null) : null,
      style_notes: wantsStyling ? (styleNotes || null) : null,
      hours: hours || null,
      services: services || null,
      require_deposit: !!requireDeposit,
      deposit_amount: requireDeposit ? (depositAmount || null) : null,
      bank_account_name: bankAccountName || null,
      bank_bsb: bankBsb || null,
      bank_account_number: bankAccountNumber || null,
      special_requests: specialRequests || null,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Insert error:', insertError);
    return res.status(500).json({ error: 'Failed to save submission' });
  }

  // ── 3. Notify Leona ───────────────────────────────────────────────
  const openDays = (hours || []).filter(h => h.isOpen);
  const hoursHtml = (hours || []).length
    ? (hours || []).map(h => `
        <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #F4EEE6;font-size:13px">
          <span style="color:#2C2420;font-weight:600">${DAY_LABELS[h.day] || h.day}</span>
          <span style="color:${h.isOpen ? '#2C2420' : '#9C8E84'}">${h.isOpen ? `${h.start || '—'} – ${h.end || '—'}` : 'Closed'}</span>
        </div>`).join('')
    : '<div style="color:#9C8E84;font-size:13px">Not provided</div>';

  const servicesHtml = (services || []).length
    ? (services || []).map(s => `
        <div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #F4EEE6;font-size:13px">
          <span style="color:#2C2420">${s.name || '—'} <span style="color:#9C8E84">(${s.duration || '?'} min)</span></span>
          <span style="color:#2C2420;font-weight:700">$${s.price ?? '—'}</span>
        </div>`).join('')
    : '<div style="color:#9C8E84;font-size:13px">Not provided</div>';

  const notifyHtml = `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:20px;background:#FAF8F6;border-radius:12px">
      <div style="background:#2C2420;padding:18px;border-radius:10px;text-align:center;margin-bottom:16px">
        <div style="font-size:20px;color:#fff;font-style:italic;font-family:Georgia,serif">NailDesk</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:0.15em;text-transform:uppercase;margin-top:4px">
          New Onboarding Submission — ${TIER_LABELS[tier] || tier || 'Unknown tier'}
        </div>
      </div>

      ${logoUrl ? `<div style="text-align:center;margin-bottom:14px"><img src="${logoUrl}" alt="Logo" style="max-width:140px;max-height:140px;border-radius:10px;border:1px solid #E8E0D8"/></div>` : ''}

      <div style="background:#fff;border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid #E8E0D8">
        <div style="font-size:10px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Business</div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Studio:</strong> ${studioName}</div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Owner:</strong> ${ownerName}</div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Email:</strong> <a href="mailto:${ownerEmail}" style="color:#9C7A62">${ownerEmail}</a></div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Phone:</strong> <a href="tel:${ownerPhone || ''}" style="color:#9C7A62">${ownerPhone || '—'}</a></div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Address:</strong> ${address || '—'}</div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Timezone:</strong> ${timezone || 'Australia/Sydney'}</div>
        <div style="font-size:14px;color:#2C2420"><strong>Instagram:</strong> ${instagram || '—'}</div>
      </div>

      ${wantsStyling ? `
      <div style="background:#FAF1E2;border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid #C2914F">
        <div style="font-size:10px;color:#C2914F;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">🎨 Wants Custom Styling Add-on — $${STYLING_ADDON_PRICE} AUD (signup price)</div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Preferred palette:</strong> ${STYLE_PRESET_LABELS[stylePreference] || stylePreference || '—'}</div>
        ${styleNotes ? `<div style="font-size:14px;color:#2C2420"><strong>Notes:</strong> ${styleNotes}</div>` : ''}
        <div style="font-size:12px;color:#9C8E84;margin-top:8px">They opted in during signup, so send them a $${STYLING_ADDON_PRICE} AUD payment link (not the standard $${STYLING_ADDON_LATER_PRICE}).</div>
      </div>
      ` : ''}

      <div style="background:#fff;border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid #E8E0D8">
        <div style="font-size:10px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Hours (${openDays.length} days open)</div>
        ${hoursHtml}
      </div>

      <div style="background:#fff;border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid #E8E0D8">
        <div style="font-size:10px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Services & Pricing</div>
        ${servicesHtml}
      </div>

      <div style="background:#fff;border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid #E8E0D8">
        <div style="font-size:10px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Deposit / Bank Details</div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Require deposit:</strong> ${requireDeposit ? `Yes — $${depositAmount || '—'}` : 'No'}</div>
        ${requireDeposit ? `
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Account name:</strong> ${bankAccountName || '—'}</div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>BSB:</strong> ${bankBsb || '—'}</div>
        <div style="font-size:14px;color:#2C2420"><strong>Account no.:</strong> ${bankAccountNumber || '—'}</div>
        ` : ''}
      </div>

      ${specialRequests ? `
      <div style="background:#fff;border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid #E8E0D8">
        <div style="font-size:10px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Special Requests</div>
        <div style="font-size:14px;color:#2C2420;line-height:1.6">${specialRequests}</div>
      </div>
      ` : ''}

      <div style="font-size:11px;color:#9C8E84;text-align:center;margin-top:14px">
        Submission ID: ${submission.id}${stripeSessionId ? ` · Stripe session: ${stripeSessionId}` : ''}
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'NailDesk <onboarding@resend.dev>',
      to: NOTIFY_EMAIL,
      reply_to: ownerEmail,
      subject: `[NailDesk] New ${TIER_LABELS[tier] || ''} onboarding — ${studioName}`,
      html: notifyHtml,
    });
  } catch (e) {
    console.error('Notify email error:', e);
    // Non-fatal — the submission is already saved either way.
  }

  // ── 4. Confirm to the client ─────────────────────────────────────
  const clientHtml = `
    <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:20px;background:#FAF8F6;border-radius:12px">
      <div style="background:#2C2420;padding:18px;border-radius:10px;text-align:center;margin-bottom:16px">
        <div style="font-size:20px;color:#fff;font-style:italic;font-family:Georgia,serif">NailDesk</div>
      </div>
      <div style="background:#fff;border-radius:10px;padding:20px;border:1px solid #E8E0D8">
        <div style="font-size:16px;color:#2C2420;font-weight:700;margin-bottom:10px">Thanks, ${ownerName.split(' ')[0] || ownerName}! 🎉</div>
        <div style="font-size:14px;color:#2C2420;line-height:1.7;margin-bottom:14px">
          We've received your studio details for <strong>${studioName}</strong>. We'll get your NailDesk app set up and email you the link within 1–2 business days.
        </div>
        ${wantsStyling ? `
        <div style="font-size:14px;color:#2C2420;line-height:1.7;margin-bottom:14px">
          You also asked for custom styling (${STYLE_PRESET_LABELS[stylePreference] || stylePreference || 'your preferred palette'}) — we'll follow up separately with mockups and a payment link for that add-on.
        </div>
        ` : ''}
        <div style="font-size:14px;color:#2C2420;line-height:1.7">
          If anything about your details changes in the meantime, just reply to this email and let us know.
        </div>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: 'NailDesk <onboarding@resend.dev>',
      to: ownerEmail,
      reply_to: NOTIFY_EMAIL,
      subject: `We've got your details, ${studioName} — NailDesk`,
      html: clientHtml,
    });
  } catch (e) {
    console.error('Client confirmation email error:', e);
    // Non-fatal.
  }

  return res.status(200).json({ success: true, id: submission.id, logoUrl });
}
