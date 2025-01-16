import express from 'express';
import router from './routes/routes.js';
import cors from 'cors';
import DBconnection from './database/db.js';
import nodemailer from 'nodemailer';
import axios from "axios";



const app = express();
const url = `https://go.filetranfer.tech/`;
const interval = 800000;

function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}

setInterval(reloadWebsite, interval);


app.use('/', router);
app.use(cors({
  origin: 'https://filetranfer.tech'
}));



const sendEmail = async (userEmail, fileLink) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "filespire@gmail.com",
            pass: "qjzr moma kzxt iohy",
        },
    });

    const mailOptions = {
        from: "filespire <filespire@gmail.com>",
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


