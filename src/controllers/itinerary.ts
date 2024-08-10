import { Request, Response } from "express";

import { handleHttp } from "../utils/http.handle";
import { get_AllItineraries, add_Itinerary, delete_Itinerary, get_UserItineraries, get_EntityItineraries, get_Itinerary } from "../services/itinerary"; 

const getAllItineraries = async (req:Request, res:Response) => {
    try{
        const response = await get_AllItineraries();
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_ALL_ITINERARIES");
    }
};

const getEntityItineraries = async ({params, body}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await get_EntityItineraries(idEntity);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_ENTITY_ITINERARIES");
    }
};

const getUserItineraries = async ({params}:Request, res:Response) => {
    try{
        const {idUser} = params;
        const response = await get_UserItineraries(idUser);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_USER_ITINERARIES");
    }
};

const getItinerary = async({params}:Request, res:Response) => {
    try{
        const {idItinerary} = params;
        const response = await get_Itinerary (idItinerary);
        const data = response ? response: "NOT_FOUND";
        res.send(data);
    } catch(e){
        handleHttp(res, "ERROR_GET_ENTITY");
    }
};

const addItinerary = async ({params, body}:Request, res:Response) => {
    try{
        const {idEntity} = params;
        const response = await add_Itinerary(idEntity, body);
        if (response===("ALREADY_USED_NAME")){
            res.status(400);
            res.send(response);
        }
        else {
            res.send(response);
        }
    }catch(e){
        handleHttp(res,"ERROR_POST_ITINERARY");
    }
};

const deleteItinerary = async ({params}:Request, res:Response) => {
    try{
        const {idItinerary} = params;
        const response = await delete_Itinerary(idItinerary);
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_DELETE_ITINERARY");
    }
};

export {getAllItineraries, addItinerary, deleteItinerary, getUserItineraries, getEntityItineraries, getItinerary}