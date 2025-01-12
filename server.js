import bodyParser from "body-parser"; 
import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import fetch from "node-fetch"; 

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static(join(__dirname, 'public')));
app.use("/publicProjects/DiceGame", express.static(join(__dirname, 'publicProjects', 'DiceGame')));
app.use("/publicProjects/SimonGame", express.static(join(__dirname, 'publicProjects', 'SimonGame')));
app.use("/publicProjects/calculator", express.static(join(__dirname, 'publicProjects', 'calculator')));



app.get("/publicProjects/DiceGame/", (req, res) => {
  res.sendFile(join(__dirname, "publicProjects", "DiceGame", "dicee.html"));
});

app.get("/publicProjects/SimonGame/", (req, res) => {
  res.sendFile(join(__dirname, "publicProjects", "SimonGame", "index.html"));
});

app.get("/publicProjects/calculator/", (req, res) => {
  res.sendFile(join(__dirname, "publicProjects", "calculator", "calculator.html"));
});


app.get("/", (req, res) => {
  res.render("index", { siteKey: process.env.RECAPTCHA_SITE_KEY });
});

app.post('/submit', async (req, res) => {
  const { name, email, message, 'g-recaptcha-response': recaptchaResponse } = req.body;

  // Verify reCAPTCHA response
  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${recaptchaResponse}`;

  try {
    const recaptchaRes = await fetch(verificationUrl, { method: 'POST' });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return res.status(400).json({ success: false, message: 'reCAPTCHA verification failed' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: "PORTFOLIO EMAIL",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ success: true, message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).send({ success: false, message: 'Error sending email' });
    }
  } catch (error) {
    res.status(500).send({ success: false, message: 'Error verifying reCAPTCHA' });
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});