import nodemailer from "nodemailer";

type Params = { email: string; name: string; subj: string; body: string };

export async function sendEmail({ email, name, subj, body }: Params) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER_NAME,
      to: email,
      subject: subj,
      html: `
      <body>
        <h3>Hi ${name}!</h3>
        <br/>
        <p>${body}</p>
        <p>From ITVALLELY team</p>
      </body>`,
    };

    await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (err) {
    return { error: true };
  }
}
