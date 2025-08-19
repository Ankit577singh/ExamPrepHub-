const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // false for port 587, true for port 465
  auth: {
    user: "94cc95002@smtp-brevo.com", // your Brevo SMTP login
    pass: "xarMERZTqf2mjFIV", // your Brevo SMTP key
  },
});

module.exports = transporter;