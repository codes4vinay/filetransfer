import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBconnection from './database/db.js';
import nodemailer from 'nodemailer';


const app = express();

app.use(cors());
app.use('/', router);

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
        to: user.email,
        subject: "Your File Upload Link",
        text: `Your file has been uploaded successfully. Access it here: ${result}`,
        html: `<p>Your file has been uploaded successfully. <a href="${result}">Click here</a> to access it.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};


const PORT = 8000;
DBconnection();

app.listen(PORT, () => {
    console.log("server is running on port 8000");
});

