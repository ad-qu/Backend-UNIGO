import { User } from "../interfaces/user.interface";
import { Auth } from "./../interfaces/auth.interface";
import UserModel from "../models/user";
import CampusModel from '../models/campus';
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateTokenCompleted } from "../utils/jwt.handle";

const signUp = async ({ name, surname, username, email, password, campus, level, experience, role }: User) => {
    const check = await UserModel.findOne({ email });
    if (check) { return 409; }
    else {
      const passHash = await encrypt(password); 
      level = 1; experience = 0;
      if (role == null) { role = "user"; } 
      const active = true;
 
      const user = await UserModel.create({ name, surname, username, email, 
        password: passHash, campus, level, experience, role, active });
      
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

  let campus;

  if(check.campus != null) {
    campus = await CampusModel.findById(check.campus).select('latitude longitude');
  }
  

  const token = generateTokenCompleted(
      check.id, check.name, check.surname,
      check.username, check.imageURL, check.experience, 
      check.role, check.level
  );

  const data = {
      token, 
      _id: check.id,
      name: check.name,
      surname: check.surname,
      username: check.username,
      imageURL: check?.imageURL,
      campus: check?.campus,
      latitude: campus?.latitude,  
      longitude: campus?.longitude, 
      experience: check.experience,
      role: check.role,
      level: check.level,
  };

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
    
    const token = generateTokenCompleted(
      googleUser.id, googleUser.name, googleUser.surname,
      googleUser.username, googleUser.imageURL, googleUser.experience, 
      googleUser.role, googleUser.level
  );

      const data = {
        token, 
        _id: googleUser.id,
        name: googleUser.name,
        surname: googleUser.surname,
        username: googleUser.username,
        imageURL: googleUser?.imageURL,
        campus: null,
        latitude: null,  
        longitude: null, 
        experience: googleUser.experience,
        role: googleUser.role,
        level: googleUser.level,
    };
    return data;
  }
};

export { signUp, logIn, signUpGoogle };