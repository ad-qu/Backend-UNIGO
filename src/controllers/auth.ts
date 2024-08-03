import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";

import { signupUser, loginUser, signupGoogle } from "../services/auth";

const signupControl = async ({ body }: Request, res: Response) => {
  try{
    const response = await signupUser(body);
    if (response == "ALREADY_USER"){
        res.status(220);
        res.send(response);
        console.log("Already existing user");
    }
    else {
        res.send(response);
    }        
} catch(e){
    handleHttp(res, "ERROR_SIGNUP");
    console.log("Error");
  }
};

const loginControl = async ({ body }: Request, res: Response) => {
  
  const { email, password } = body;
  const responseUser = await loginUser({ email, password });

  console.log("Password of the user: " + password);

  if (responseUser == "PASSWORD_INCORRECT") {
    res.status(222);
    console.log("Password incorrect");
    res.send(responseUser);
  } else if (responseUser == "NOT_FOUND_USER") {
    res.status(221);
    console.log("Not found User");
    res.send(responseUser);    
  } else if (responseUser == "NOT_ACTIVE_USER") {
    res.status(220);
    console.log("No active user");
    res.send(responseUser);
  } else {
    res.status(200);
    res.send(responseUser);
  }  
};

const googleControl = async ({ body }: Request, res: Response) => {
  try{
    const response = await signupGoogle(body);
    if (response == "ALREADY_USER"){
        res.status(220);
        res.send(response);
        console.log("Already existing Google user");
    }
    else {
        res.send(response);
    }        
} catch(e){
    handleHttp(res, "ERROR_SIGNUP");
    console.log("Error");
  }
};

export { signupControl, loginControl, googleControl };