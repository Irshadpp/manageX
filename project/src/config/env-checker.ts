const envChecker = () => {
  if (!process.env.MONGO_URI_PROJECT) {
    throw new Error("MONGO_URI_PROJECT must be defined");
  }
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET must be defined");
  }
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET must be defined");
  }
};

export { envChecker };
