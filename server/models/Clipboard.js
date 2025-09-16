import mongoose from "mongoose";

const clipboardSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Clipboard = mongoose.model("Clipboard", clipboardSchema);

export default Clipboard;
