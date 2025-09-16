import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBconnection from './database/db.js';
import nodemailer from 'nodemailer';
<<<<<<< HEAD
import axios from "axios";
import multer from 'multer';
import mongoose from 'mongoose';
import File from './models/file.js';
import path from 'path';
import fs from 'fs';
import cron from 'node-cron';
import { fileURLToPath } from 'url';
import clipboardRoutes from "./routes/clipboard.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
=======
import axios from 'axios';
>>>>>>> f75b4543fb1434138d7f7b3dc0db5b5495f9e947

const app = express();
const url = `https://go.filetranfer.tech/`;
const interval = 1800000;

<<<<<<< HEAD
const allowedOrigins = ['http://localhost:5173', 'https://go.filetranfer.tech'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Middleware
app.use(express.json());
app.use('/files', express.static(path.join(__dirname, 'uploads')));

// Reload website interval
function reloadWebsite() {
    axios.get(url).then(() => {
        console.log("Website reloaded");
    }).catch((error) => {
        console.error(`Error: ${error.message}`);
=======
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
>>>>>>> f75b4543fb1434138d7f7b3dc0db5b5495f9e947
    });
}
setInterval(reloadWebsite, interval);

<<<<<<< HEAD
// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// File upload route
app.post('/upload', upload.single("file"), async (req, res) => {
    try {
        const fileUrl = `https://go.filetranfer.tech/files/${req.file.filename}`;

        const file = new File({
            filename: req.file.originalname,
            fileUrl,
            createdAt: new Date(),
            expiresAt: new Date(Date.now() + 15 * 60 * 1000)
        });

        await file.save();
        res.status(200).json({ path: fileUrl });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Something went wrong during upload." });
    }
});

// Email sender function
const sendEmail = async (userEmail, fileLink) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "Filespire@gmail.com",
            pass: "qjzr moma kzxt iohy",
        },
    });

    const mailOptions = {
        from: "Filespire <Filespire@gmail.com>",
        to: userEmail,
        subject: "Your File Upload Link",
        text: `Your file has been uploaded successfully. Access it here: ${fileLink}`,
        html: `<p>Your file has been uploaded successfully. <a href="${fileLink}">Click here</a> to access it.</p>`,
    };
=======
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
>>>>>>> f75b4543fb1434138d7f7b3dc0db5b5495f9e947

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

<<<<<<< HEAD
// Cron job for deleting expired files
cron.schedule('* * * * *', async () => {
    const currentTime = new Date();
    try {
        const expiredFiles = await File.find({ expiresAt: { $lte: currentTime } });

        for (const file of expiredFiles) {
            const filePath = path.join(__dirname, 'uploads', file.filename);
            fs.unlinkSync(filePath); // Delete from disk
            await file.delete();     // Delete from DB
            console.log(`Expired file deleted: ${file.filename}`);
        }
    } catch (error) {
        console.error("Error deleting expired files:", error);
    }
});


app.use("/api/clipboard", clipboardRoutes);

// Existing router
app.use('/', router);

// Start server
=======
// Database Connection and Server Start
>>>>>>> f75b4543fb1434138d7f7b3dc0db5b5495f9e947
const PORT = 8000;
DBconnection();

app.listen(PORT, () => {
<<<<<<< HEAD
    console.log(`Server is running on port ${PORT}`);
=======
  console.log(`Server is running on port ${PORT}`);
>>>>>>> f75b4543fb1434138d7f7b3dc0db5b5495f9e947
});
