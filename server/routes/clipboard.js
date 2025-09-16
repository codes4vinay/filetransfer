import express from "express";
import Clipboard from "../models/Clipboard.js";

const router = express.Router();

// Send text
router.post("/send", async (req, res) => {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: "Text required" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    try {
        const clip = new Clipboard({ code, content });
        await clip.save();
        res.json({ code });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to save clipboard" });
    }
});

// Receive text
router.post("/receive", async (req, res) => {
    let { code } = req.body;

    if (!code) return res.status(400).json({ error: "Code required" });

    code = code.toString().trim(); // <-- ensure string, remove spaces

    try {
        const clip = await Clipboard.findOne({ code });
        if (!clip) return res.status(404).json({ error: "Code not found" });

        const content = clip.content;
        await clip.deleteOne(); // optional: remove after fetch

        res.json({ content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch clipboard" });
    }
});

export default router;
