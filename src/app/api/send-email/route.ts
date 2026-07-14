import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_USER = process.env.SMTP_USER || process.env.EMAIL_USER; // Your email
const EMAIL_PASS = process.env.SMTP_PASS || process.env.EMAIL_PASS; // Your email app password
const EMAIL_TO = process.env.ADMIN_EMAIL || process.env.EMAIL_TO || EMAIL_USER; // Where to receive messages

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Professional email template for you (the recipient)
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #FF8C00 0%, #FF5F00 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">New Contact Form Submission</h1>
                      <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">From your portfolio website</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.5;">
                        You have received a new message from your portfolio contact form.
                      </p>
                      
                      <!-- Contact Details -->
                      <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                        <tr>
                          <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #FF8C00;">
                            <p style="margin: 0 0 5px; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Name</p>
                            <p style="margin: 0; color: #333; font-size: 16px; font-weight: 600;">${name}</p>
                          </td>
                        </tr>
                        <tr><td style="height: 10px;"></td></tr>
                        <tr>
                          <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #FF8C00;">
                            <p style="margin: 0 0 5px; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                            <p style="margin: 0; color: #333; font-size: 16px; font-weight: 600;">
                              <a href="mailto:${email}" style="color: #FF8C00; text-decoration: none;">${email}</a>
                            </p>
                          </td>
                        </tr>
                        <tr><td style="height: 10px;"></td></tr>
                        <tr>
                          <td style="padding: 15px; background-color: #f8f9fa; border-left: 4px solid #FF8C00;">
                            <p style="margin: 0 0 5px; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Subject</p>
                            <p style="margin: 0; color: #333; font-size: 16px; font-weight: 600;">${subject}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Message -->
                      <div style="margin: 30px 0;">
                        <p style="margin: 0 0 10px; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                        <div style="padding: 20px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #FF8C00;">
                          <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                      </div>
                      
                      <!-- Quick Reply Button -->
                      <table role="presentation" style="margin: 30px 0;">
                        <tr>
                          <td style="text-align: center;">
                            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #FF8C00 0%, #FF5F00 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">Reply to ${name}</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0; color: #999; font-size: 12px;">
                        This email was sent from your portfolio contact form<br>
                        <span style="color: #666;">${new Date().toLocaleString()}</span>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Auto-reply email template for the sender
    const autoReplyHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You for Contacting Me</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
          <table role="presentation" style="width: 100%; border-collapse: collapse;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 8px; overflow: hidden;">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #FF8C00 0%, #FF5F00 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">Thank You for Reaching Out!</h1>
                      <p style="margin: 10px 0 0; color: rgba(255, 255, 255, 0.9); font-size: 14px;">I've received your message</p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="margin: 0 0 20px; color: #333; font-size: 18px; font-weight: 600;">Hi ${name},</p>
                      
                      <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                        Thank you for contacting me! I've received your message and I'm excited to connect with you.
                      </p>
                      
                      <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                        I typically respond within <strong style="color: #FF8C00;">24-48 hours</strong>. I'll review your message carefully and get back to you as soon as possible.
                      </p>
                      
                      <!-- Message Summary -->
                      <div style="margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 6px; border-left: 4px solid #FF8C00;">
                        <p style="margin: 0 0 10px; color: #999; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Your Message Summary</p>
                        <p style="margin: 0 0 5px; color: #333; font-size: 14px;"><strong>Subject:</strong> ${subject}</p>
                        <p style="margin: 0; color: #666; font-size: 14px; line-height: 1.5; margin-top: 10px;">${message.substring(0, 150)}${message.length > 150 ? '...' : ''}</p>
                      </div>
                      
                      <p style="margin: 0 0 20px; color: #666; font-size: 16px; line-height: 1.6;">
                        In the meantime, feel free to check out my portfolio and recent projects.
                      </p>
                      
                      <!-- CTA Buttons -->
                      <table role="presentation" style="margin: 30px 0;">
                        <tr>
                          <td style="padding-right: 10px;">
                            <a href="https://heetportfolio.vercel.app" style="display: inline-block; padding: 14px 24px; background: linear-gradient(135deg, #FF8C00 0%, #FF5F00 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">View Portfolio</a>
                          </td>
                          <td>
                            <a href="https://github.com/HeetSoni26" style="display: inline-block; padding: 14px 24px; background-color: #333; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 14px;">GitHub Profile</a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 30px 0 0; color: #666; font-size: 16px; line-height: 1.6;">
                        Best regards,<br>
                        <strong style="color: #333;">Heet Soni</strong><br>
                        <span style="color: #999; font-size: 14px;">Full Stack Developer</span>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px; background-color: #f8f9fa; text-align: center; border-top: 1px solid #e0e0e0;">
                      <p style="margin: 0 0 10px; color: #666; font-size: 14px; font-weight: 600;">Connect with me</p>
                      <p style="margin: 0; color: #999; font-size: 12px;">
                        <a href="mailto:heetks2607@gmail.com" style="color: #FF8C00; text-decoration: none; margin: 0 10px;">Email</a> |
                        <a href="https://www.linkedin.com/in/heet-soni-8a9082273/" style="color: #FF8C00; text-decoration: none; margin: 0 10px;">LinkedIn</a> |
                        <a href="https://github.com/HeetSoni26" style="color: #FF8C00; text-decoration: none; margin: 0 10px;">GitHub</a>
                      </p>
                      <p style="margin: 15px 0 0; color: #999; font-size: 11px;">
                        This is an automated response. Please do not reply to this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // Send email to you (admin)
    await transporter.sendMail({
      from: `"Portfolio Contact Form" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      subject: `New Contact: ${subject}`,
      html: adminEmailHTML,
      replyTo: email,
    });

    // Send auto-reply to the sender
    await transporter.sendMail({
      from: `"Heet Soni" <${EMAIL_USER}>`,
      to: email,
      subject: `Thank you for contacting me - ${subject}`,
      html: autoReplyHTML,
    });

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

