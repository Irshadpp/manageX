const envChecker = () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.SMTP_HOST) {
    throw new Error("SMPT_HOST must be defined");
  }
  if (!process.env.SMTP_USER) {
    throw new Error("SMPT_HOST must be defined");
  }
  if (!process.env.SMTP_PASSWORD) {
    throw new Error("SMPT_HOST must be defined");
  }
  if (!process.env.JWT_EMAIL_SECRET) {
    throw new Error("SMPT_HOST must be defined");
  }
};

export { envChecker };
