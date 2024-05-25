import { ObjectId, Types } from "mongoose";

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

const get_Itinerary = async(idItinerary: string) => {
    const responseItem = await ItineraryModel.findById({_id: idItinerary});
    return responseItem;
};


const get_UserItineraries = async(idUser: string) => {
    const user = await UserModel.findById({_id: idUser}).populate({path: "entities"});
    const entIds = user?.entities as ObjectId[];
    const itineraries = [];
    
    for (const entityId of entIds) {
        const entity = await EntityModel.findById(entityId).populate('itineraries');
        if (entity?.itineraries) {
            itineraries.push(...entity.itineraries);
        }
    }

    return itineraries;
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

    await ChallengeModel.deleteMany({itinerary: idItinerary});

    return responseItem;
};

export { get_AllItineraries, add_Itinerary, delete_Itinerary, get_UserItineraries, get_EntityItineraries, get_Itinerary };
