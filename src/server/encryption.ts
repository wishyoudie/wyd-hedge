import { env } from "@/env";
import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "crypto";

const key = createHash("sha512")
  .update(env.BOT_TOKEN)
  .digest("hex")
  .substring(0, 32);

const getIv = () =>
  createHash("sha512")
    .update(generateRandomString() + generateRandomString())
    .digest("hex")
    .substring(0, 16);

export function encrypt(data: string) {
  const iv = getIv();
  const cipher = createCipheriv("aes-256-cbc", key, iv);

  return Buffer.concat([
    Buffer.from(cipher.update(data, "utf-8", "hex") + cipher.final("hex")),
    Buffer.from("-" + iv),
  ]).toString("base64");
}

export function decrypt(data: string) {
  const buff = Buffer.from(data, "base64").toString("utf-8");
  const parts = buff.split("-");

  const decipher = createDecipheriv("aes-256-cbc", key, parts[1]!);
  return decipher.update(parts[0]!, "hex", "utf8") + decipher.final("utf8");
}

export function generatePasswordHash(password: string) {
  return createHash("sha512").update(password).digest("hex");
}

export function generateRandomString() {
  const buf = randomBytes(16);

  return buf.toString("hex");
}
