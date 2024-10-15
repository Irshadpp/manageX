import Stripe from "stripe";

console.log(process.env.STRIPE_SECRET!, "api key............")

export const stripe = new Stripe("sk_test_51Q9lFJKT4uALUwNbQ24h8dhZLpfWXmf9QjxUNajM2WuHZDt5MAtFfmYvAay0LfExDfFJU7JLzuIL1fGZPQBDfO1r00oAYX4HjQ");