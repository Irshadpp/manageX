const envChecker = () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.SMTP_HOST) {
    throw new Error("SMPT_HOST must be defined");
  }
  if (!process.env.SMTP_USER) {
    throw new Error("SMTP_USER must be defined");
  }
  if (!process.env.SMTP_PASSWORD) {
    throw new Error("SMTP_PASSWORD must be defined");
  }
  if (!process.env.JWT_EMAIL_SECRET) {
    throw new Error("JWT_EMAIL_SECRET must be defined");
  }
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET must be defined");
  }
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET must be defined");
  }
};

export { envChecker };
