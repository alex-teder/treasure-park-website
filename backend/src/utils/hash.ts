import bcrypt from "bcrypt";
const saltRounds = 7;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}