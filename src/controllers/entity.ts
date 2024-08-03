import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { get_AllEntities, get_Not_Following_Entities, get_Following_Entities, delete_Entities, 
    add_Entity, delete_FollowEntity, add_FollowEntity, update_Entity, get_Entity, get_FollowingPeople } from "../services/entity";

const getAllEntities = async(req:Request, res:Response) => {
    try{
        const response = await get_AllEntities();
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_ALL_ENTITIES");
    }
};

const getEntity = async({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await get_Entity (idEntity);
        const data = response ? response: "NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res, "ERROR_GET_ENTITY");
    }
};

const getNotFollowingEntities = async ({params}:Request, res:Response) => {
    try{
        const {idUser} = params;
        const response = await get_Not_Following_Entities(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_NOT_ENTITIES");
    }
};

const getFollowersEntities = async ({params}:Request, res:Response) => {
    try{
        const {idUser} = params;
        const response = await get_Following_Entities(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_NOT_ENTITIES");
    }
};

const getFollowingPeople = async ({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await get_FollowingPeople(idEntity);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_NOT_USERS");
    }
};

const deleteEntities = async ({params}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await delete_Entities(idEntity);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_DELETE_ENTITY");
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
        handleHttp(res, "ERROR_CREATION");
    }
};

const addFollowEntities = async ({params}:Request, res:Response) => {
    try{
        const {idUser, idEntity} = params;
        const response = await add_FollowEntity(idUser, idEntity);
        res.send(response);
    }catch(e){
        handleHttp(res, "ERROR_FOLLOWING_ENTITY");
    }
};

const updateEntity = async ({params, body}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await update_Entity(idEntity, body);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_UPDATE_ENTITY");
    }
};

const deleteFollowEntities = async ({params}:Request, res:Response) => {
    try{
        const {idUser, idEntity} = params;
        const response = await delete_FollowEntity(idUser, idEntity);
        res.send(response);
    }catch(e){
        handleHttp(res, "ERROR_UNFOLLOWING_ENTITY");
    }
};

export { getAllEntities, getFollowersEntities, getNotFollowingEntities, getEntity, 
    addFollowEntities, addEntity, deleteEntities, deleteFollowEntities, updateEntity, getFollowingPeople };