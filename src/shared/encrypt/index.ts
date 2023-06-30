import * as bcrypt from 'bcrypt';

const generateHash = async (password) => {
  return await bcrypt.hash(password, 10);
};

const compareHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export { generateHash, compareHash };
