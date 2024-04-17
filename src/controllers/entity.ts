import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { get_AllEntities, get_not_Following_Entities, get_Following_Entities, delete_Entities, 
    add_Entity, delete_FollowEntity, add_FollowEntity } from "../services/entity";

const getAllEntities = async(req:Request, res:Response) => {
    try{
        const response = await get_AllEntities();
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_ALL_ENTITIES");
    }
};

const getNotFollowingEntities = async ({params, body}:Request, res:Response) => {
    try{
        const {idUser} = params;
        const response = await get_not_Following_Entities(idUser, body);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_NOT_ENTITIES");
    }
};

const getFollowersEntities = async ({params, body}:Request, res:Response) => {
    try{
        const {idUser} = params;
        const response = await get_Following_Entities(idUser, body);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_NOT_ENTITIES");
    }
};

const deleteEntities = async ({params}:Request, res:Response) => {
    try{
        const {idUser} = params;
        const response = await delete_Entities(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_DELETE_ENTITY");
    }
};

const addEntity = async({body}:Request, res:Response) => {
    try{
        const response = await add_Entity(body);
        if (response===("ALREADY_USED_NAME")) {
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
        console.log(idUser + "   " + idEntity);

        const response = await add_FollowEntity(idUser, idEntity);
        res.send(response);
    }catch(e){
        handleHttp(res, "ERROR_FOLLOWING_ENTITY");
    }
};

const deleteFollowEntities = async ({params}:Request, res:Response) => {
    try{
        const {idUser, idFollowed} = params;
        const response = await delete_FollowEntity(idUser, idFollowed);
        res.send(response);
    }catch(e){
        handleHttp(res, "ERROR_UNFOLLOWING_ENTITY");
    }
};

export { getAllEntities, getFollowersEntities, getNotFollowingEntities, 
    addFollowEntities, addEntity, deleteEntities, deleteFollowEntities };