import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { service, name, email, ...rest } = data;

    // Format the email body
    const fields = Object.entries({ name, email, ...rest })
      .filter(([, v]) => v)
      .map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1).replace(/([A-Z])/g, ' $1')}: ${v}`)
      .join("\n");

    if (process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "lisa@lisahoughtonstudio.com",
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: '"Lisa Houghton Studio" <lisa@lisahoughtonstudio.com>',
        to: "lisa@lisahoughtonstudio.com",
        replyTo: email,
        subject: `New enquiry — ${service}`,
        text: `New enquiry from ${name}\n\n${fields}\n\n---\nSent from lisahoughtonstudio.com`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1a1a;">
            <p style="font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #6b6b6b;">New enquiry — ${service}</p>
            <h2 style="font-weight: 400; font-size: 22px; margin: 8px 0 24px;">From ${name}</h2>
            <div style="border-left: 2px solid #1a1a1a; padding-left: 16px; margin-bottom: 24px;">
              ${fields.split("\n").map(line => `<p style="margin: 6px 0; font-size: 14px; line-height: 1.6;">${line}</p>`).join("")}
            </div>
            <p style="font-size: 11px; color: #9a9790;">Sent from lisahoughtonstudio.com</p>
          </div>
        `,
      });
    } else {
      // Email not yet configured — log for now
      console.log("Enquiry received (email not configured):", JSON.stringify(data, null, 2));
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Enquiry error:", err);
    return Response.json({ success: false }, { status: 500 });
  }
}
