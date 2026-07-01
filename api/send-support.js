// ═══════════════════════════════════════════════════════════════
// NAILDESK — Support Request Email Handler
// Vercel serverless function
// Sends support requests to account@ollieconsult.com
// ═══════════════════════════════════════════════════════════════

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { type, topics, message, urgent, studioName, studioEmail } = req.body;

  if (!type) {
    return res.status(400).json({ error: 'Missing request type' });
  }

  const isCpa = type === 'cpa';

  const subject = isCpa
    ? `[NailDesk] Business Support Request — ${studioName || 'Unknown Studio'}`
    : `[NailDesk] ${urgent ? '🚨 URGENT — ' : ''}IT Support Request — ${studioName || 'Unknown Studio'}`;

  const html = isCpa ? `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#FAF8F6;border-radius:12px">
      <div style="background:#2C2420;padding:20px;border-radius:10px;margin-bottom:20px;text-align:center">
        <div style="font-family:Georgia,serif;font-size:22px;color:#fff;font-style:italic">NailDesk</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:0.15em;text-transform:uppercase;margin-top:4px">Business Support Request</div>
      </div>

      <div style="background:#fff;border-radius:10px;padding:20px;margin-bottom:14px;border:1px solid #E8E0D8">
        <div style="font-size:11px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Studio Details</div>
        <div style="font-size:14px;color:#2C2420"><strong>Studio:</strong> ${studioName || '—'}</div>
        <div style="font-size:14px;color:#2C2420;margin-top:6px"><strong>Email:</strong> ${studioEmail || '—'}</div>
      </div>

      <div style="background:#fff;border-radius:10px;padding:20px;margin-bottom:14px;border:1px solid #E8E0D8">
        <div style="font-size:11px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Topics Requested</div>
        ${(topics || []).map(t => `
          <div style="display:inline-block;background:#F4EEE6;color:#9C7A62;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;margin:3px">${t}</div>
        `).join('')}
      </div>

      ${message ? `
      <div style="background:#fff;border-radius:10px;padding:20px;margin-bottom:14px;border:1px solid #E8E0D8">
        <div style="font-size:11px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Additional Details</div>
        <div style="font-size:14px;color:#2C2420;line-height:1.6">${message}</div>
      </div>
      ` : ''}

      <div style="font-size:11px;color:#9C8E84;text-align:center;margin-top:16px">Reply directly to this email to respond to the studio owner.</div>
    </div>
  ` : `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:24px;background:#FAF8F6;border-radius:12px">
      <div style="background:#2C2420;padding:20px;border-radius:10px;margin-bottom:20px;text-align:center">
        <div style="font-family:Georgia,serif;font-size:22px;color:#fff;font-style:italic">NailDesk</div>
        <div style="font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:0.15em;text-transform:uppercase;margin-top:4px">IT Support Request${urgent ? ' — 🚨 URGENT' : ''}</div>
      </div>

      ${urgent ? `
      <div style="background:#FCEAEA;border-radius:10px;padding:14px 18px;margin-bottom:14px;border:1px solid #CC5C5C">
        <div style="font-size:13px;color:#CC5C5C;font-weight:700">🚨 This issue is marked URGENT — studio operations may be affected</div>
      </div>
      ` : ''}

      <div style="background:#fff;border-radius:10px;padding:20px;margin-bottom:14px;border:1px solid #E8E0D8">
        <div style="font-size:11px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Studio Details</div>
        <div style="font-size:14px;color:#2C2420"><strong>Studio:</strong> ${studioName || '—'}</div>
        <div style="font-size:14px;color:#2C2420;margin-top:6px"><strong>Email:</strong> ${studioEmail || '—'}</div>
      </div>

      <div style="background:#fff;border-radius:10px;padding:20px;margin-bottom:14px;border:1px solid #E8E0D8">
        <div style="font-size:11px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Issue Type</div>
        <div style="background:#EEF2F5;color:#7E97A8;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:600;display:inline-block">${topics?.[0] || '—'}</div>
      </div>

      ${message ? `
      <div style="background:#fff;border-radius:10px;padding:20px;margin-bottom:14px;border:1px solid #E8E0D8">
        <div style="font-size:11px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Description</div>
        <div style="font-size:14px;color:#2C2420;line-height:1.6">${message}</div>
      </div>
      ` : ''}

      <div style="font-size:11px;color:#9C8E84;text-align:center;margin-top:16px">Reply directly to this email to respond to the studio owner.</div>
    </div>
  `;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'NailDesk <noreply@naildesk.shop>',
        to: 'account@ollieconsult.com',
        reply_to: studioEmail || 'account@ollieconsult.com',
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Send error:', error);
    return res.status(500).json({ error: error.message });
  }
}
