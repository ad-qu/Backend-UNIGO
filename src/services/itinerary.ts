import { Types } from "mongoose";

import { Itinerary } from "../interfaces/itinerary.interface";
import ItineraryModel from "../models/itinerary";

const get_AllItineraries = async() => {
    const responseItem = await ItineraryModel.find({}).populate({path: "challenges", select: "name description experience"});
    return responseItem;
};

const add_Itinerary = async (item: Itinerary) => {
    const chall = await ItineraryModel.findOne({name: item.name});
    if (chall!=null)
        return "ALREADY_USED_NAME";
    const responseInsert = await ItineraryModel.create(item);
    return responseInsert;
};

const delete_Itinerary = async(idItinerary: string) => {
    const responseItem = await ItineraryModel.findByIdAndRemove({_id: idItinerary});
    return responseItem;
};

export {get_AllItineraries, add_Itinerary, delete_Itinerary};
