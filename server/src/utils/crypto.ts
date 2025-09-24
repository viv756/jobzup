import crypto from "crypto";

export const generateToken = () => {
  const joinToken = crypto.randomBytes(16).toString("hex"); // random room id

  return joinToken;
};
