const envChecker = () => {
  if (!process.env.MONGO_URI_SUBSCRIPTION) {
    throw new Error("MONGO_URI_SUBSCRIPTION must be defined");
  }
  if (!process.env.CLIENT_URL) {
    throw new Error("CLIENT_URL must be defined");
  }
  if (!process.env.STRIPE_SECRET) {
    throw new Error("STRIPE_SECRET must be defined");
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_SECRET must be defined");
  }
};

export { envChecker };
