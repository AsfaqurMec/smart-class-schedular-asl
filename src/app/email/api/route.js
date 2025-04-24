import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { email, code } = await req.json(); // Extract data from the request

    if (!email || !code) {
      return new Response(JSON.stringify({ message: "Email and code are required" }), { status: 400 });
    }

    // Nodemailer Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Password Reset Code",
      text: `Your password reset code is: ${code}. It is valid for 5 minutes.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully" }), { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), { status: 500 });
  }
}

