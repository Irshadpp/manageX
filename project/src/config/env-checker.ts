const envChecker = () => {
  if (!process.env.MONGO_URI_PROJECT) {
    throw new Error("MONGO_URI_PROJECT must be defined");
  }
};

export { envChecker };
