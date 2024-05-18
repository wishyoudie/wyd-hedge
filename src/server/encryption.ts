import { env } from "@/env";
import { createCipheriv, createDecipheriv, createHash } from "crypto";

const key = createHash("sha512")
  .update(env.BOT_USERNAME)
  .digest("hex")
  .substring(0, 32);
const iv = createHash("sha512")
  .update(env.BOT_TOKEN)
  .digest("hex")
  .substring(0, 16);

export function encrypt(data: string) {
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  return Buffer.from(
    cipher.update(data, "utf-8", "hex") + cipher.final("hex"),
  ).toString("base64");
}

export function decrypt(data: string) {
  const buff = Buffer.from(data, "base64");
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  return (
    decipher.update(buff.toString("utf-8"), "hex", "utf8") +
    decipher.final("utf8")
  );
}
