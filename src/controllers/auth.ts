import { Request, Response } from "express";
import { handleHttp } from "../utils/http.handle";
import { signUp, logIn, signUpGoogle } from "../services/auth";

const signUpControl = async ({ body }: Request, res: Response) => {
  try{
    const response = await signUp(body);
    if (response == 409) {
      handleHttp(res, 409);
    } 
    else if (response == null) {
      handleHttp(res, 204);
    }
    else {
      res.status(201).send({
        response,
      }); 
    }    
  } catch(e){
    handleHttp(res, 500);
  }
};

const logInControl = async ({ body }: Request, res: Response) => {
  console.log("31231231");
  const { email, password } = body;
  const response = await logIn({ email, password });
console.log("000000");
  if (response == 401) {
    console.log("1");

    handleHttp(res, 500);
  } 
  else if (response == 404) {
    console.log("2");
    handleHttp(res, 404);
  } 
  else if (response == 423) {
    console.log("3");

    handleHttp(res, 423);
  } 
  else {
    console.log("4");

    res.status(222).send({
      response,
    }); 
  }  
};

const googleControl = async ({ body }: Request, res: Response) => {
  try{
    const response = await signUpGoogle(body);
    if (response == 409) {
      handleHttp(res, 409);
    }
    else if (response == null) {
      handleHttp(res, 204);
    }
    else {
      res.status(201).send({
        response,
      }); 
    }    
  } catch(e) {
    handleHttp(res, 500);
  }
};

export { signUpControl, logInControl, googleControl };