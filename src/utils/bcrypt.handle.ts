import { hash, compare } from "bcryptjs"; 

//HASH is to encrypt and compare to compare the plain password with the encrypted one
const encrypt = async (pass: string) => {
  const passwordHash = await hash(pass, 8);
  return passwordHash;
};

const verified = async (pass: string, passHash: string) => {
  const isCorrect = await compare(pass, passHash);
  return isCorrect;
};

export { encrypt, verified };