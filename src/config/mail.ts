export default () => ({
  host: process.env.MAIL_HOST || "in-v3.mailjet.com",
  port: parseInt(process.env.MAIL_PORT, 10) || 2525,
  secure: process.env.MAIL_SECURE || false,
  user: process.env.MAIL_USER || "6968b6e3b0a9052ec4343015ce2e4924",
  pass: process.env.MAIL_PASSWORD || "0483e070f683adb1fca4604494133a33",
  from: process.env.MAIL_FROM || "achilleaikpe@adjemin.com",
  dir: "templates",
  strict: true,
});
