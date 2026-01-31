import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('File', fileSchema);
