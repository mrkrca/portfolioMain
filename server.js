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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static(join(__dirname, 'public')));
app.use("/publicProjects/DiceGame", express.static(join(__dirname, 'publicProjects', 'DiceGame')));
app.use("/publicProjects/SimonGame", express.static(join(__dirname, 'publicProjects', 'SimonGame')));
app.use("/publicProjects/calculator", express.static(join(__dirname, 'publicProjects', 'calculator')));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});


app.get("/publicProjects/DiceGame/", (req, res) => {
  res.sendFile(join(__dirname, "publicProjects", "DiceGame", "dicee.html"));
});

app.get("/publicProjects/SimonGame/", (req, res) => {
  res.sendFile(join(__dirname, "publicProjects", "SimonGame", "index.html"));
});

app.get("/publicProjects/calculator/", (req, res) => {
  res.sendFile(join(__dirname, "publicProjects", "calculator", "calculator.html"));
});


app.post('/submit', async (req, res) => {
  const { name, email, message, 'cf-turnstile-response': turnstileResponse } = req.body;

  // Verify Turnstile response
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
  const verificationUrl = `https://challenges.cloudflare.com/turnstile/v0/siteverify`;
  const verificationResponse = await fetch(verificationUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${turnstileSecret}&response=${turnstileResponse}`
  });
  const verificationResult = await verificationResponse.json();

  if (!verificationResult.success) {
    return res.status(400).send('Turnstile verification failed');
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
});
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});