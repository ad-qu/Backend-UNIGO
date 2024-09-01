import { Request, Response } from "express";
import { handleHttp } from "../utils/http.handle";
import { get_Message, add_Message, delete_Message }  from "../services/message";

import { encrypt } from "../utils/bcrypt.handle";

const getMessage = async({params}:Request, res:Response) => {
    try{
        const {idMessage} = params;
        const response = await get_Message(idMessage);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const addMessage = async ({params, body}:Request, res:Response) => {
    try{
        const {idChat} = params;
        const {idUser, senderName, message} = body;
        const response = await add_Message(idChat, idUser, senderName, message);
       
        res.send(response);
   
    }catch(e){
        handleHttp(res, 500);
    }
};

const deleteMessage = async ({params}:Request, res:Response) => {
    try{
        const {idMessage} = params;
        const response = await delete_Message(idMessage);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

export { getMessage, addMessage, deleteMessage };