const envChecker = () => {
  if (!process.env.MONGO_URI_CHAT) {
    throw new Error("MONGO_URI_CHAT must be defined");
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
};

export { envChecker };
