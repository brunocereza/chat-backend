import * as bcrypt from 'bcrypt';

const generateHash = async (password: string, size: number) => {
  const saltNumber = await bcrypt.genSalt(size);
  return await bcrypt.hash(password, saltNumber);
};

const compareHash = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export { generateHash, compareHash };
