import { Request, Response } from "express";

import { handleHttp } from "../utils/http.handle";
import { get_AllNews, get_EntityNews, get_New, add_New, delete_New } from "../services/new"; 

const getAllNews = async (req:Request, res:Response) => {
    try{
        const response = await get_AllNews();
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const getEntityNews = async ({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await get_EntityNews(idEntity);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const getNew = async({params}:Request, res:Response) => {
    try{
        const {idNew} = params;
        const response = await get_New (idNew);
        const data = response ? response: "NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res, 500);
    }
};

const addNew = async ({params, body}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await add_New(idEntity, body);
        res.send(response);
    } catch (e) {
        handleHttp(res, 500);
    }
};

const deleteNew = async ({params}:Request, res:Response) => {
    try{
        const {idNew} = params;
        const response = await delete_New(idNew);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

export { getAllNews, getEntityNews, addNew, getNew, deleteNew }