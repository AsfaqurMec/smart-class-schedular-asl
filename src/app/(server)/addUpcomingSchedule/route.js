import { connectDB } from "../../../../lib/connectDB";
import nodemailer from "nodemailer";
import { format, parse } from "date-fns";
//import bcrypt from "bcrypt";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

import { NextResponse } from "next/server";


// Format time to 6:00 PM format
const formatTime = (timeStr) =>
  format(parse(timeStr, "HH:mm", new Date()), "h:mm a");

export const POST = async (request) => {
  const slot = await request.json();
  try {
    
    const db = await connectDB();
    const userCollection = db.collection("upcoming");

    const resp = await userCollection.insertOne(slot);
  
    const users = await db.collection("users").find().toArray();
    const recipientEmails = users.map((u) => u.email).filter(Boolean);

    // Format times
    const formattedStart = formatTime(slot?.startTime);
    const formattedEnd = formatTime(slot?.endTime);

     // Setup Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // or use "smtp.ethereal.email" for testing
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

     // Send Email
    await transporter.sendMail({
      from: `"Scheduler ASL" <${EMAIL_USER}>`,
      bcc: recipientEmails,
      subject: "📢 New Upcoming Session Added",
      html: `
        <h3>📅 New Upcoming Session has been added!</h3>
        <p><strong>Topic:</strong> ${slot?.topic}</p>
        <p><strong>Course:</strong> ${slot?.course}</p>
        <p><strong>Date:</strong> ${slot?.day}</p>
        <p><strong>Time:</strong> ${formattedStart} - ${formattedEnd}</p>

        <p>Please give your suitable time schedule within 3 days.</p>

        <p>Thank you.</p>
      `,
    });

   return NextResponse.json(slot);
  } catch (error) {
    //console.log(error);
    
    return NextResponse.json(
      { message: "Something Went Wrong", error },
      { status: 500 }
    );
  }
};