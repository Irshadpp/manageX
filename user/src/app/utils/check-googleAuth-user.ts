import { NotFoundError } from "@ir-managex/common";
import axios from "axios";
import { GoogleTokenInfo } from "../controllers/types/google-token.type";

export const checkGoogleAuthUser = async (token: string) => {
  if (!token) {
    throw new NotFoundError();
  }
  const res = await axios.get<GoogleTokenInfo>(
    `https://oauth2.googleapis.com/tokeninfo?id_token=${token}`
  );
  return res.data;
};
