import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { company_name, from_name, phone, email, message, website } = req.body ?? {};

  if (!company_name || !from_name || !phone || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const websiteLine = website ? `\n웹사이트   : ${website}` : '';

  const mailOptions = {
    from: `"OrangeLabs 문의" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `[문의] ${company_name} · ${from_name}`,
    text: `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 OrangeLabs 홈페이지 문의가 도착했습니다
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

업체명    : ${company_name}
담당자    : ${from_name}
연락처    : ${phone}
이메일    : ${email}${websiteLine}

──────────────────────────────────────
문의 내용
──────────────────────────────────────
${message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim(),
    html: `
<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#f9f9f9;padding:32px;border-radius:8px;">
  <h2 style="color:#f97316;margin:0 0 24px;">OrangeLabs 홈페이지 문의</h2>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <tr><td style="padding:8px 12px;color:#666;width:90px;">업체명</td>
        <td style="padding:8px 12px;font-weight:600;">${company_name}</td></tr>
    <tr style="background:#fff;"><td style="padding:8px 12px;color:#666;">담당자</td>
        <td style="padding:8px 12px;font-weight:600;">${from_name}</td></tr>
    <tr><td style="padding:8px 12px;color:#666;">연락처</td>
        <td style="padding:8px 12px;">${phone}</td></tr>
    <tr style="background:#fff;"><td style="padding:8px 12px;color:#666;">이메일</td>
        <td style="padding:8px 12px;"><a href="mailto:${email}">${email}</a></td></tr>
    ${website ? `<tr><td style="padding:8px 12px;color:#666;">웹사이트</td>
        <td style="padding:8px 12px;"><a href="${website}">${website}</a></td></tr>` : ''}
  </table>
  <div style="margin-top:24px;padding:16px;background:#fff;border-left:4px solid #f97316;border-radius:4px;font-size:14px;line-height:1.7;white-space:pre-wrap;">${message}</div>
</div>
`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Nodemailer error:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
