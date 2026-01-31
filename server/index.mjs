import express from 'express';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';
import cron from 'node-cron';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

import router from './routes/routes.js';
import clipboardRoutes from './routes/clipboard.js';
import DBconnection from './database/db.js';
import File from './models/file.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ─────────────────────────────
   MIDDLEWARE
───────────────────────────── */
app.use(express.json());

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());

/* ─────────────────────────────
   HOME
───────────────────────────── */
app.get('/', (req, res) => {
    res.send(`
        <p>
            This is Filespire Server<br>
            Made by <a href="https://vinaydev.in" target="_blank">Vinay Kumar</a>
        </p>
    `);
});

/* ─────────────────────────────
   STATIC FILES
───────────────────────────── */
app.use('/files', express.static(path.join(__dirname, 'uploads')));

/* ─────────────────────────────
   MULTER SETUP (SHORT FILENAME)
───────────────────────────── */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const shortName = crypto.randomBytes(4).toString('hex');
        cb(null, `${Date.now()}-${shortName}${ext}`);
    }
});

const upload = multer({ storage });

/* ─────────────────────────────
   FILE UPLOAD
───────────────────────────── */
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const fileUrl = `https://link.filespire.in/files/${req.file.filename}`;

        const newFile = new File({
            filename: req.file.filename,
            fileUrl,
            createdAt: new Date()
        });

        await newFile.save();

        res.status(200).json({
            path: fileUrl
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Upload failed' });
    }
});

/* ─────────────────────────────
   AUTO DELETE AFTER 30 DAYS
   (RUNS DAILY AT MIDNIGHT)
───────────────────────────── */
cron.schedule('0 0 * * *', async () => {
    try {
        const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
        const cutoffDate = new Date(Date.now() - THIRTY_DAYS);

        const oldFiles = await File.find({
            createdAt: { $lte: cutoffDate }
        });

        for (const file of oldFiles) {
            const filePath = path.join(__dirname, 'uploads', file.filename);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            await file.deleteOne();
            console.log(`Deleted (30 days): ${file.filename}`);
        }
    } catch (err) {
        console.error('Cleanup error:', err);
    }
});

/* ─────────────────────────────
   ROUTES
───────────────────────────── */
app.use('/api/clipboard', clipboardRoutes);
app.use('/', router);

/* ─────────────────────────────
   SERVER START
───────────────────────────── */
const PORT =  process.env.PORT || 8080;
DBconnection();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
