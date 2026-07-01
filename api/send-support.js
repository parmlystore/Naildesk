// NailDesk — Support Request Email Handler
// Sends to account@ollieconsult.com via Resend

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { type, topics, message, urgent, studioName, clientName, clientEmail, clientPhone } = req.body;
  if (!type) return res.status(400).json({ error: 'Missing type' });

  const isCpa = type === 'cpa';
  const subject = isCpa
    ? `[NailDesk] Business Support — ${clientName || studioName}`
    : `[NailDesk] ${urgent ? '🚨 URGENT — ' : ''}IT Support — ${clientName || studioName}`;

  const html = `
    <div style="font-family:sans-serif;max-width:540px;margin:0 auto;padding:20px;background:#FAF8F6;border-radius:12px">
      <div style="background:#2C2420;padding:18px;border-radius:10px;text-align:center;margin-bottom:16px">
        <div style="font-size:20px;color:#fff;font-style:italic;font-family:Georgia,serif">NailDesk</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.5);letter-spacing:0.15em;text-transform:uppercase;margin-top:4px">
          ${isCpa ? 'Business Support Request' : `IT Support Request${urgent ? ' — 🚨 URGENT' : ''}`}
        </div>
      </div>

      ${urgent ? `<div style="background:#FCEAEA;border-radius:8px;padding:12px;margin-bottom:14px;color:#CC5C5C;font-weight:700;font-size:13px">🚨 URGENT — Studio operations may be affected. Please respond ASAP.</div>` : ''}

      <div style="background:#fff;border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid #E8E0D8">
        <div style="font-size:10px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">Contact Details</div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Name:</strong> ${clientName || '—'}</div>
        <div style="font-size:14px;color:#2C2420;margin-bottom:4px"><strong>Email:</strong> <a href="mailto:${clientEmail}" style="color:#9C7A62">${clientEmail || '—'}</a></div>
        <div style="font-size:14px;color:#2C2420"><strong>Phone:</strong> <a href="tel:${clientPhone}" style="color:#9C7A62">${clientPhone || '—'}</a></div>
      </div>

      <div style="background:#fff;border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid #E8E0D8">
        <div style="font-size:10px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">
          ${isCpa ? 'Topics Requested' : 'Issue Type'}
        </div>
        ${(topics || []).map(t => `<span style="display:inline-block;background:#F4EEE6;color:#9C7A62;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:600;margin:3px">${t}</span>`).join('')}
      </div>

      ${message ? `
      <div style="background:#fff;border-radius:10px;padding:16px;margin-bottom:12px;border:1px solid #E8E0D8">
        <div style="font-size:10px;color:#9C8E84;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px">Details</div>
        <div style="font-size:14px;color:#2C2420;line-height:1.6">${message}</div>
      </div>
      ` : ''}

      <div style="font-size:11px;color:#9C8E84;text-align:center;margin-top:14px">
        Reply directly to this email — it goes to ${clientEmail || 'the client'}
      </div>
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
        from: 'NailDesk <onboarding@resend.dev>',
        to: 'account@ollieconsult.com',
        reply_to: clientEmail || 'account@ollieconsult.com',
        subject,
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Failed to send' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
