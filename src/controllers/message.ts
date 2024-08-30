import { Request, Response } from "express";
import { handleHttp } from "../utils/http.handle";
import { get_Message, add_Message, delete_Message }  from "../services/message";

import { encrypt } from "../utils/bcrypt.handle";

const getMessage = async({params}:Request, res:Response) => {
    try{
        const {idChat} = params;
        const response = await get_Message(idChat);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const addMessage = async ({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await add_Message(idEntity);
       
        res.send(response);
   
    }catch(e){
        handleHttp(res, 500);
    }
};

const deleteMessage = async ({params}:Request, res:Response) => {
    try{
        const {idChat} = params;
        const response = await delete_Message(idChat);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

export { getMessage, addMessage, deleteMessage };