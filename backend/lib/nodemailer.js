const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   auth: {
//     user: ,
//     pass: ,
//   },
//   host: "smtp.gmail.com",
//   service: "gmail",
// });

const mailer = async ({ subject, html, to, text }) => {
  await transporter.sendMail({
    subject: subject || `testing`,
    to: to || `passifyv2devs@gmail.com`,
    html: html || `testing`,
    text: text || `Verify your account`,
  });
};

module.exports = mailer;
