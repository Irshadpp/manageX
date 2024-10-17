const envChecker = () => {
  if (!process.env.MONGO_URI_CHAT) {
    throw new Error("MONGO_URI_CHAT must be defined");
  }
  if (!process.env.CLIENT_URL) {
    throw new Error("CLIENT_URL must be defined");
  }
};

export { envChecker };
