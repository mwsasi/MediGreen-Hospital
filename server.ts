import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import cron from "node-cron";
import nodemailer from "nodemailer";
import twilio from "twilio";
import fs from "fs";
import { addDays, format, isBefore, subHours } from "date-fns";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load Firebase Config
const firebaseConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(), "firebase-applet-config.json"), "utf-8"));

// Initialize Firebase Admin
admin.initializeApp({
  projectId: firebaseConfig.projectId,
});

const db = admin.firestore();

// Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Twilio Client
const twilioClient = process.env.TWILIO_ACCOUNT_SID ? twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
) : null;

// Notification Task
async function sendReminders() {
  console.log("Checking for upcoming appointments to send reminders...");
  
  const tomorrow = addDays(new Date(), 1);
  const tomorrowStr = format(tomorrow, "yyyy-MM-dd");
  
  try {
    const appointmentsRef = db.collection("appointments");
    const snapshot = await appointmentsRef
      .where("date", "==", tomorrowStr)
      .where("status", "==", "confirmed")
      .get();

    if (snapshot.empty) {
      console.log("No appointments found for tomorrow.");
      return;
    }

    for (const doc of snapshot.docs) {
      const appointment = doc.data();
      
      if (appointment.reminderSent) continue;

      // Get patient email/phone from users collection
      const userRef = db.collection("users").doc(appointment.patientId);
      const userDoc = await userRef.get();
      
      if (!userDoc.exists) continue;
      const user = userDoc.data();

      console.log(`Sending reminder to ${user.email} for appointment with ${appointment.doctorName}`);

      // Send Email
      if (process.env.SMTP_USER && user.email) {
        try {
          await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to: user.email,
            subject: "Appointment Reminder - MediGreen Hospital",
            text: `Hi ${user.displayName},\n\nThis is a reminder for your appointment with ${appointment.doctorName} tomorrow, ${appointment.date} at ${appointment.time}.\n\nWe look forward to seeing you!`,
            html: `
              <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px;">
                <h2 style="color: #059669;">Appointment Reminder</h2>
                <p>Hi <strong>${user.displayName}</strong>,</p>
                <p>This is a reminder for your upcoming appointment:</p>
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0;">
                  <p style="margin: 5px 0;"><strong>Doctor:</strong> ${appointment.doctorName}</p>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${appointment.date}</p>
                  <p style="margin: 5px 0;"><strong>Time:</strong> ${appointment.time}</p>
                </div>
                <p>We look forward to seeing you!</p>
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                <p style="font-size: 12px; color: #6b7280;">MediGreen Hospital - 123 Medical Drive</p>
              </div>
            `,
          });
        } catch (emailErr) {
          console.error("Failed to send email:", emailErr);
        }
      }

      // Send SMS
      if (twilioClient && user.phone) {
        try {
          await twilioClient.messages.create({
            body: `Reminder: Appointment with ${appointment.doctorName} tomorrow at ${appointment.time}. - MediGreen Hospital`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: user.phone,
          });
        } catch (smsErr) {
          console.error("Failed to send SMS:", smsErr);
        }
      }

      // Mark as sent
      await doc.ref.update({ reminderSent: true });
    }
  } catch (err) {
    console.error("Error in reminder task:", err);
  }
}

// Schedule task (every hour)
cron.schedule("0 * * * *", sendReminders);

// Run once on startup for testing (optional, but good for demo)
// sendReminders();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
