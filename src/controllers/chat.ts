import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import{ get_Chat, add_Chat, delete_Chat }  from "../services/chat";

import { encrypt } from "../utils/bcrypt.handle";

const getChat = async({params}:Request, res:Response) => {
    try{
        const {idChat} = params;
        const response = await get_Chat(idChat);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_CHAT");
    }
};

const addChat = async ({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await add_Chat(idEntity);
       
        res.send(response);
   
    }catch(e){
        handleHttp(res,"ERROR_POST_CHAT");
    }
};

const updateChat = async ({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await add_Chat(idEntity);
       
        res.send(response);
   
    }catch(e){
        handleHttp(res,"ERROR_POST_CHAT");
    }
};

const deleteChat = async ({params}:Request, res:Response) => {
    try{
        const {idChat} = params;
        const response = await delete_Chat(idChat);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_DELETE_CHAT");
    }
};

export { getChat, addChat, updateChat, deleteChat };