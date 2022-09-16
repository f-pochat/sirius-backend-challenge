import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password: string): Promise<string> => {
  const saltOrRounds = 10;
  return await bcrypt.hash(password, saltOrRounds);
}

export const comparePasswords = async (password: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(password,hashed);
}