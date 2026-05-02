import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, company, service, district, message } = req.body;

  // Basic validation
  if (!name || !email || !service || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Email regex check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  try {
    // Configure transporter using environment variables set in Vercel dashboard
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,   // your Gmail address (set in Vercel env vars)
        pass: process.env.EMAIL_PASS,   // your Gmail App Password (set in Vercel env vars)
      },
    });

    // Email TO the SSS team
    const mailToSSS = {
      from: `"SSS Website Contact" <${process.env.EMAIL_USER}>`,
      to: 'usman293eb@gmail.com',
      replyTo: email,
      subject: `[SSS Website] New Inquiry: ${service} — ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
            .wrapper { max-width: 620px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #0a1628, #1565C0); padding: 32px 40px; }
            .header img { height: 48px; }
            .header h1 { color: #fff; font-size: 1.2rem; margin: 12px 0 0; }
            .header p { color: rgba(255,255,255,0.65); font-size: 0.85rem; margin: 4px 0 0; }
            .body { padding: 36px 40px; }
            .field { margin-bottom: 20px; }
            .field label { display: block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #1565C0; margin-bottom: 4px; }
            .field .value { font-size: 0.95rem; color: #1D2939; font-weight: 500; }
            .message-box { background: #F0F7FF; border: 1px solid #E3F2FD; border-radius: 8px; padding: 18px; margin-top: 8px; font-size: 0.92rem; color: #1D2939; line-height: 1.6; white-space: pre-wrap; }
            .divider { border: none; border-top: 1px solid #EAECF0; margin: 24px 0; }
            .footer { background: #0a1628; padding: 20px 40px; text-align: center; font-size: 0.78rem; color: rgba(255,255,255,0.5); }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>New Project Inquiry</h1>
              <p>Submitted via sss-company.com contact form</p>
            </div>
            <div class="body">
              <div class="field"><label>Full Name</label><div class="value">${name}</div></div>
              <div class="field"><label>Email Address</label><div class="value">${email}</div></div>
              ${phone ? `<div class="field"><label>Phone</label><div class="value">${phone}</div></div>` : ''}
              ${company ? `<div class="field"><label>Organization / Company</label><div class="value">${company}</div></div>` : ''}
              <div class="field"><label>Service Interested In</label><div class="value">${service}</div></div>
              ${district ? `<div class="field"><label>Project Location / District</label><div class="value">${district}</div></div>` : ''}
              <hr class="divider">
              <div class="field">
                <label>Message / Project Details</label>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              SSS — Solutions Services & Supplies · Lahore, Punjab, Pakistan<br>
              Registered with PEC · FBR · PRA · Taxation Department
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Auto-reply email TO the sender
    const autoReply = {
      from: `"SSS — Solutions Services & Supplies" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting SSS — We'll be in touch soon!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f5f7fa; margin: 0; padding: 0; }
            .wrapper { max-width: 620px; margin: 30px auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
            .header { background: linear-gradient(135deg, #0a1628, #1565C0); padding: 36px 40px; text-align: center; }
            .header h1 { color: #fff; font-size: 1.4rem; margin: 12px 0 4px; }
            .header p { color: rgba(255,255,255,0.7); font-size: 0.88rem; margin: 0; }
            .body { padding: 40px; }
            .body p { color: #475467; font-size: 0.95rem; line-height: 1.7; margin-bottom: 16px; }
            .highlight { background: #F0F7FF; border-left: 3px solid #1565C0; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 24px 0; }
            .highlight p { margin: 0; color: #1D2939; font-size: 0.9rem; }
            .summary { background: #F5F7FA; border-radius: 10px; padding: 20px 24px; margin: 24px 0; }
            .summary h4 { font-size: 0.78rem; letter-spacing: 0.1em; text-transform: uppercase; color: #1565C0; margin-bottom: 14px; }
            .summary-row { display: flex; gap: 12px; margin-bottom: 8px; font-size: 0.88rem; }
            .summary-row span:first-child { color: #98A2B3; width: 120px; flex-shrink: 0; }
            .summary-row span:last-child { color: #1D2939; font-weight: 500; }
            .contact-box { background: #0a1628; border-radius: 10px; padding: 20px 24px; margin-top: 24px; }
            .contact-box h4 { color: #fff; font-size: 0.85rem; margin-bottom: 14px; }
            .contact-box p { color: rgba(255,255,255,0.65); font-size: 0.85rem; margin: 4px 0; }
            .footer { text-align: center; padding: 24px 40px; font-size: 0.78rem; color: #98A2B3; border-top: 1px solid #EAECF0; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>Message Received!</h1>
              <p>Solutions Services & Supplies · Lahore, Punjab</p>
            </div>
            <div class="body">
              <p>Dear <strong>${name}</strong>,</p>
              <p>Thank you for reaching out to SSS — Solutions Services & Supplies. We have received your inquiry and our team will get back to you within <strong>24 hours</strong>.</p>

              <div class="highlight">
                <p>📋 <strong>Your Inquiry Reference:</strong> SSS-${Date.now().toString().slice(-6)}<br>
                🕐 <strong>Submitted:</strong> ${new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi', dateStyle: 'long', timeStyle: 'short' })}</p>
              </div>

              <div class="summary">
                <h4>Inquiry Summary</h4>
                <div class="summary-row"><span>Service:</span><span>${service}</span></div>
                ${district ? `<div class="summary-row"><span>Location:</span><span>${district}</span></div>` : ''}
                ${company ? `<div class="summary-row"><span>Organization:</span><span>${company}</span></div>` : ''}
              </div>

              <p>In the meantime, feel free to explore our services at our website or contact us directly:</p>

              <div class="contact-box">
                <h4>Direct Contact</h4>
                <p>📞 042-3543673</p>
                <p>✉️ usman293eb@gmail.com</p>
                <p>📍 Lahore, Punjab, Pakistan</p>
                <p>🕐 Mon – Sat · 9:00 AM – 6:00 PM PKT</p>
              </div>
            </div>
            <div class="footer">
              © 2025 Solutions Services & Supplies · NTN: 3530218699626 · PEC: 85282_C6_EE07-EE08<br>
              Registered with PEC · FBR · PRA · Taxation Department
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailToSSS);
    await transporter.sendMail(autoReply);

    return res.status(200).json({ success: true, message: 'Email sent successfully' });

  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}
