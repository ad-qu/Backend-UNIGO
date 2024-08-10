import { User } from "../interfaces/user.interface";
import { Auth } from "./../interfaces/auth.interface";

import UserModel from "../models/user";

import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateTokenCompleted } from "../utils/jwt.handle";

const signUp = async ({ name, surname, username, email, password, level, experience, role }: User) => {
    const check = await UserModel.findOne({ email });
    if (check) { return 409; }
    else {
      const passHash = await encrypt(password); 
      level = 1; experience = 0;
      if (role == null) { role = "user"; } 
      const active = true;
 
      const user = await UserModel.create({ name, surname, username, email, 
        password: passHash, level, experience, role, active });
      
      return user;
    }
};

  const logIn = async ({ email, password }: Auth) => {
    const check = await UserModel.findOne({ email });
    if (!check) return 404;

    if (check.active == false) return 423;
  
    const passwordHash = check.password;

    const isCorrect = await verified(password, passwordHash);
    if (!isCorrect) return 401;

    const token = generateTokenCompleted(check.id, check.name, check.surname,
      check.username, check.role, check.level, check.imageURL, check.experience);

    const data = { token };
    
    return data;
};

//Registers the user from Google data, we store it in the database and return the user with a token
const signUpGoogle = async ({ name, surname, username, email, password, level, experience, role }: User) => {
  const check = await UserModel.findOne({ email });
  if (check) { return 409; }
  else {
    const passHash = await encrypt(password); 
    level = 1; experience = 0;
    if (role == null) { role = "user"; } 
    const active = true;
      
    const googleUser = await UserModel.create({ name, surname, username, email, password: passHash, level, experience, role, active });
    
    const token = generateTokenCompleted(googleUser.id, googleUser.name, googleUser.surname,
      googleUser.username, googleUser.role, googleUser.level, googleUser.imageURL, googleUser.experience);

    const data = { token };

    return data;
  }
};

export { signUp, logIn, signUpGoogle };