import { Auth } from "./../interfaces/auth.interface";
import UserModel from "../models/user";
import { User } from "../interfaces/user.interface";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateTokenCompleted } from "../utils/jwt.handle";

const signupUser = async ({ name, surname, username, email, password, level, experience, role }: User) => {
    const checkIs = await UserModel.findOne({ email });
    if (checkIs) { return "ALREADY_USER"; }
   
    level = 1;
    experience = 0;
    if (role == null) { role = "user"; }
    const active = true;
    const passHash = await encrypt(password);
      
    const newUser = await UserModel.create({ name, surname, username, email, password: passHash, level, experience, role, active });
      
    return newUser;
};

  const loginUser = async ({ email, password }: Auth) => {
    const checkIs = await UserModel.findOne({ email });
    if (!checkIs) return "NOT_FOUND_USER";

    if (checkIs.active == false) return "NOT_ACTIVE_USER";
  
    const passwordHash = checkIs.password;

    console.log("Hashed password: " + passwordHash); 

    const isCorrect = await verified(password, passwordHash);
    if (!isCorrect) return "PASSWORD_INCORRECT";

    const token = generateTokenCompleted(checkIs.id, checkIs.name, checkIs.surname,
      checkIs.username, checkIs.role, checkIs.level, checkIs.imageURL, checkIs.experience);

    const data = {token};
    
    return data;
};

const signupGoogle = async ({ name, surname, username, email, password, level, experience, role }: User) => {
  const checkIs = await UserModel.findOne({ email });
  if (checkIs) { return "ALREADY_USER"; }
 
  level = 1;
  experience = 0;
  if (role == null) { role = "user"; }
  const active = true;
  const passHash = await encrypt(password);
    
  const googleUser = await UserModel.create({ name, surname, username, email, password: passHash, level, experience, role, active });
    
  const token = generateTokenCompleted(googleUser.id, googleUser.name, googleUser.surname,
    googleUser.username, googleUser.role, googleUser.level, googleUser.imageURL, googleUser.experience);
    
  const data = {token};

  return data;
};

export { signupUser, loginUser, signupGoogle };