const envChecker = () => {
  if (!process.env.MONGO_URI_MEET) {
    throw new Error("MONGO_URI_MEET must be defined");
  }
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET must be defined");
  }
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET must be defined");
  }
  if (!process.env.CLIENT_URL) {
    throw new Error("CLIENT_URL must be defined");
  }
  if (!process.env.ACCOUNT_SID) {
    throw new Error("ACCOUNT_SID must be defined");
  }
  if (!process.env.AUTH_TOKEN) {
    throw new Error("AUTH_TOKEN must be defined");
  }
  
};

export { envChecker };
