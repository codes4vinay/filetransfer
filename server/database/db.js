import mongoose from "mongoose";


const DBconnection = async () => {
    const DB_URL = `mongodb+srv://admin:admin@file-sharing.cgwrj.mongodb.net/?retryWrites=true&w=majority&appName=file-sharing`;
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('DataBase connected successfully');
    } catch (error) {
        console.error('Error while connecting with the database', error.message);
    }
}

export default DBconnection;