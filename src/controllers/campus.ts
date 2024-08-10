import { Request, Response } from "express";

import { handleHttp } from "../utils/http.handle";
import { get_AllCampus, get_ListCampus, get_Campus, add_Campus, delete_Campus } from "../services/campus"; 

const getAllCampus = async (req:Request, res:Response) => {
    try{
        const response = await get_AllCampus();
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const getListCampus = async ({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await get_ListCampus(idEntity);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const getCampus = async({params}:Request, res:Response) => {
    try{
        const {idNew} = params;
        const response = await get_Campus (idNew);
        const data = response ? response: "NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res, 500);
    }
};

const addCampus = async ({params, body}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await add_Campus(idEntity, body);
        res.send(response);
    } catch (e) {
        handleHttp(res, 500);
    }
};

const deleteCampus = async ({params}:Request, res:Response) => {
    try{
        const {idNew} = params;
        const response = await delete_Campus(idNew);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

export { getAllCampus, getListCampus, getCampus, addCampus, deleteCampus }