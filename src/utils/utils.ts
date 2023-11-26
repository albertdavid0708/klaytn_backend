import { TokenType, UserType } from "./Enum";
import { env } from "../config/config";

const CAValidator = require("cryptocurrency-address-validator");

// --- Create password validator schema

const generateString = (length: number = 6) => {
  const set = "0123456789abcdefghijklmnoporstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let salt = "";
  for (let i = 0; i < length; i++) {
    const p = Math.floor(Math.random() * set.length);
    salt += set[p];
  }
  return salt;
};

export const Utils = {
  generateString,
};
