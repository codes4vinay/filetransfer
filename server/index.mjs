import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBconnection from './database/db.js';
import nodemailer from 'nodemailer';
import axios from "axios";

const app = express();
const url = `https://go.filetranfer.tech/`;
const interval = 1800000;

// Middleware to parse JSON
app.use(express.json());

// CORS Configuration
app.use(
  cors({
    origin: 'https://filetranfer.tech', // Allow specific origin
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true, // Allow credentials like cookies
  })
);

// Fallback headers (Optional, in case CORS needs fallback handling)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://filetranfer.tech');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Keep Website Reloading
function reloadWebsite() {
  axios
    .get(url)
    .then(() => {
      console.log("Website reloaded");
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
}
setInterval(reloadWebsite, interval);

// Routes
app.use('/', router);

// Email Sender
const sendEmail = async (userEmail, fileLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "filespire@gmail.com",
      pass: "qjzr moma kzxt iohy",
    },
  });

  const mailOptions = {
    from: "Filespire <filespire@gmail.com>",
    to: userEmail, // Correct variable name
    subject: "Your File Upload Link",
    text: `Your file has been uploaded successfully. Access it here: ${fileLink}`,
    html: `<p>Your file has been uploaded successfully. <a href="${fileLink}">Click here</a> to access it.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// Database Connection and Server Start
const PORT = 8000;
DBconnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

