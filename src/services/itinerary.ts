import { Types } from "mongoose";

import { Itinerary } from "../interfaces/itinerary.interface";
import ItineraryModel from "../models/itinerary";

export const get_AllItineraries = async() => {
    const responseItem = await ItineraryModel.find({}).populate({path: "challenges", select: "name descr exp"});
    return responseItem;
};

export const add_Itinerary = async (item: Itinerary) => {
    const chall = await ItineraryModel.findOne({name: item.name});
    if (chall!=null)
        return "ALREADY_USED_NAME";
    const responseInsert = await ItineraryModel.create(item);
    return responseInsert;
};