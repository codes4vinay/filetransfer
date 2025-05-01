import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBconnection from './database/db.js';
import nodemailer from 'nodemailer';
import axios from 'axios';

const app = express();
const url = `https://go.filetranfer.tech/`;
const interval = 1800000;

// Middleware to parse JSON
app.use(express.json());

// ✅ Updated CORS Configuration
const allowedOrigins = [
  'http://localhost:5173',        // Local development
  'https://filetranfer.tech'      // Production
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// ❌ DO NOT use manual CORS headers – already handled by cors()

// Keep Website Reloading
function reloadWebsite() {
  axios
    .get(url)
    .then(() => {
      console.log('Website reloaded');
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
}
setInterval(reloadWebsite, interval);

// Routes
app.use('/', router);

// Email Sender Function
const sendEmail = async (userEmail, fileLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'filespire@gmail.com',
      pass: 'qjzr moma kzxt iohy',
    },
  });

  const mailOptions = {
    from: 'Filespire <filespire@gmail.com>',
    to: userEmail,
    subject: 'Your File Upload Link',
    text: `Your file has been uploaded successfully. Access it here: ${fileLink}`,
    html: `<p>Your file has been uploaded successfully. <a href="${fileLink}">Click here</a> to access it.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Database Connection and Server Start
const PORT = 8000;
DBconnection();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
