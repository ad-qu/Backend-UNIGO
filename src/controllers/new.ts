import { Request, Response } from "express";

import { handleHttp } from "../utils/error.handle";
import { get_AllNews, get_EntityNews, get_New, add_New, delete_New } from "../services/new"; 

const getAllNews = async (req:Request, res:Response) => {
    try{
        const response = await get_AllNews();
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_ALL_NEWS");
    }
};

const getEntityNews = async (req:Request, res:Response) => {
    try{
        const response = await get_EntityNews();
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_ENTITY_NEWS");
    }
};

const getNew = async({params}:Request, res:Response) => {
    try{
        const {idNew} = params;
        const response = await get_New (idNew);
        const data = response ? response: "NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res, "ERROR_GET_NEW");
    }
};

const addNew = async ({params, body}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await add_New(idEntity, body);
       
        res.send(response);
   
    }catch(e){
        handleHttp(res,"ERROR_POST_NEW");
    }
};

const deleteNew = async ({params}:Request, res:Response) => {
    try{
        const {idNew} = params;
        const response = await delete_New(idNew);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_DELETE_NEW");
    }
};

export { getAllNews, getEntityNews, addNew, getNew, deleteNew }