import { Request, Response } from "express";
import { handleHttp } from "../utils/http.handle";
import { signUp, logIn, signUpGoogle } from "../services/auth";

const signUpControl = async ({ body }: Request, res: Response) => {
  try {
    console.log("213123");
    console.log(body);
    const response = await signUp(body);
    console.log(response);
    if (response == 409) {
      console.log("1");

      handleHttp(res, 409);
    } 
    else if (response == null) {
      console.log("2");

      handleHttp(res, 204);
    }
    else {
      console.log("3");
      console.log(response.campus
            );      res.status(201).send(response); 
    }    
  } catch(e){
    console.log("4");

    handleHttp(res, 500);
  }
};

const logInControl = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;
    const response = await logIn({ email, password });
    if (response == 401) {
      handleHttp(res, 401);
    } 
    else if (response == 404) {
      handleHttp(res, 404);
    } 
    else if (response == 423) {
      handleHttp(res, 423);
    } 
    else {
      res.status(222).send(response); 
    }  
  } catch(e) {
    handleHttp(res, 500);
  }
};

const googleControl = async ({ body }: Request, res: Response) => {
  try {
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