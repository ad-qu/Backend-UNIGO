import { Types } from "mongoose";

import { Itinerary } from "../interfaces/itinerary.interface";
import ItineraryModel from "../models/itinerary";
import ChallengeModel from "../models/challenge";
import UserModel from "../models/user";
import EntityModel from "../models/entity";

const get_AllItineraries = async() => {
    const responseItem = await ItineraryModel.find({});
    return responseItem;
};
const get_EntityItineraries = async() => {
    const responseItem = await EntityModel.find({}).populate({path: "itineraries"});
    return responseItem;
};

const get_UserItineraries = async(idUser: string) => {
    const ent = await UserModel.findById({_id: idUser}).populate({path: "entities"});
    
    if (ent?.entities?.length != 0 && ent != null) {
    const responseItem = await EntityModel.findById({_id: ent?.id}).populate({path: "itineraries"});
    return responseItem;
    }

};

const add_Itinerary = async (idEntity: string, item: Itinerary) => {
    const itin = await ItineraryModel.findOne({name: item.name});
    if (itin != null)
        return "ALREADY_USED_NAME";

    const responseInsert = await ItineraryModel.create(item);

    const itineraryId = responseInsert._id;

    await EntityModel.findByIdAndUpdate(
        {_id: idEntity},
        {$addToSet: {itineraries: new Types.ObjectId(itineraryId)}},
        {new: true}
    );

    return responseInsert;
};

const delete_Itinerary = async(idItinerary: string) => {
    const responseItem = await ItineraryModel.findByIdAndRemove({_id: idItinerary});

    await ChallengeModel.findOneAndRemove({itinerary: idItinerary});

    return responseItem;
};

export { get_AllItineraries, add_Itinerary, delete_Itinerary, get_UserItineraries, get_EntityItineraries };
