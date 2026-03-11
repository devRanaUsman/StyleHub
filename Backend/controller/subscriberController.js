import Subscriber from "../model/Subscriber.js";
import nodemailer from "nodemailer";

export const subscribe = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required." });
  }

  try {
    // Check if user is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ success: false, message: "This email is already subscribed." });
    }

    // Save to database
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    // Create a Nodemailer transporter. 
    // We are using a mock transport since no real credentials were provided, 
    // but in a production app, you would use actual SMTP credentials like:
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });

    // For development, creates a test account if standard env vars are missing
    let transporter;
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER.trim(),
          pass: process.env.EMAIL_PASS.trim().replace(/\s+/g, ''),
        },
      });
    } else {
      // Using Ethereal Email for testing purposes
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Setup email data
    const mailOptions = {
      from: '"StyleHub Fashion" <noreply@stylehub.com>', // sender address
      to: email, // list of receivers
      subject: "🎉 Thank you for subscribing to StyleHub!", // Subject line
      html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
            <h1 style="color: #5355e9; text-align: center;">Stay in Style</h1>
            <p style="font-size: 16px;">Hi there,</p>
            <p style="font-size: 16px;">Thank you for subscribing to our newsletter! We're thrilled to have you join the <strong>StyleHub Fashion Forward</strong> community.</p>
            <p style="font-size: 16px;">You will now be the first to know about our latest collections, exclusive offers, and fashion tips.</p>
            <br />
            <p style="font-size: 16px;">Best Regards,</p>
            <p style="font-size: 16px;"><strong>The StyleHub Team</strong></p>
          </div>
        `, // html body
    };

    // Send Mail
    const info = await transporter.sendMail(mailOptions);
    console.log("Newsletter Welcome Email sent: %s", info.messageId);

    // If using test ethereal email, log the URL to preview the email
    if (nodemailer.getTestMessageUrl(info)) {
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }


    res.status(201).json({ success: true, message: "Subscription successful. Thank you!" });
  } catch (error) {
    console.error("Subscription Error:", error);
    res.status(500).json({ success: false, message: "Internal server error. Please try again later." });
  }
};
