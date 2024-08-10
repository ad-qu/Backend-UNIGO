import { Request, Response } from "express";
import { handleHttp } from "../utils/http.handle";
import { get_AllEntities, get_Not_Following_Entities, get_Following_Entities, delete_Entities, 
    add_Entity, delete_FollowEntity, add_FollowEntity, update_Entity, get_Entity, get_FollowingPeople } from "../services/entity";

const getAllEntities = async(req:Request, res:Response) => {
    try{
        const response = await get_AllEntities();
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const getEntity = async({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await get_Entity (idEntity);
        const data = response ? response: "NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res, 500);
    }
};

const getNotFollowingEntities = async ({params}:Request, res:Response) => {
    try{
        const {idUser} = params;
        const response = await get_Not_Following_Entities(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const getFollowersEntities = async ({params}:Request, res:Response) => {
    try{
        const {idUser} = params;
        const response = await get_Following_Entities(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const getFollowingPeople = async ({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await get_FollowingPeople(idEntity);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const deleteEntities = async ({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await delete_Entities(idEntity);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const addEntity = async({body}:Request, res:Response) => {
    try{
        const response = await add_Entity(body);
        if (response == ("ALREADY_USED_NAME")) {
            res.status(400);
            res.send(response);
        }
        else {
            res.send(response);
        }
    }catch(e){
        handleHttp(res, 500);
    }
};

const addFollowEntities = async ({params}:Request, res:Response) => {
    try{
        const {idUser, idEntity} = params;
        const response = await add_FollowEntity(idUser, idEntity);
        res.send(response);
    }catch(e){
        handleHttp(res, 500);
    }
};

const updateEntity = async ({params, body}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await update_Entity(idEntity, body);
        res.send(response);
    } catch(e){
        handleHttp(res, 500);
    }
};

const deleteFollowEntities = async ({params}:Request, res:Response) => {
    try{
        const {idUser, idEntity} = params;
        const response = await delete_FollowEntity(idUser, idEntity);
        res.send(response);
    }catch(e){
        handleHttp(res, 500);
    }
};

export { getAllEntities, getFollowersEntities, getNotFollowingEntities, getEntity, 
    addFollowEntities, addEntity, deleteEntities, deleteFollowEntities, updateEntity, getFollowingPeople };