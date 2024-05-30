import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token.01010101";

//From the mail and role we generate and sign the token
const generateToken = (email: string, role: string) => {
  const jwt = sign({ email, role }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};

const generateTokenCompleted = (idUser: string, name: string, surname: string, username: string, role:string, level:Number, imageURL:string, experience:Number) => {
  const jwt = sign({ idUser, name, surname, username, role, level, imageURL, experience }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};

//We verify the signature of the token that we receive as a parameter
const verifyToken = (jwt: string) => {
  try {
    const isOk = verify(jwt, JWT_SECRET); //We verify 
    return isOk;
  } catch(err) {
    return null;
  }
};

export { generateToken, verifyToken, generateTokenCompleted };