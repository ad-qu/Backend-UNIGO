import { Request, Response } from "express";

import { handleHttp } from "../utils/error.handle";
import { get_AllItineraries, add_Itinerary } from "../services/itinerary"; 

export const getAllItineraries = async (req:Request, res:Response) => {
    try{
        const response = await get_AllItineraries();
        res.send(response);
    } catch(e){
        handleHttp(res, "ERROR_GET_ALL_CHALLENGES");
    }
};

export const addItinerary = async ({body}:Request, res:Response) => {
    try{
        const response = await add_Itinerary(body);
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
