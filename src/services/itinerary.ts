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
const get_EntityItineraries = async (idEntity: string) => {
    const entity = await EntityModel.findById(idEntity)
        .select('itineraries') 
        .populate({
            path: "itineraries",
            select: "name description imageURL number",
        });

    return entity?.itineraries;
};


const get_Itinerary = async(idItinerary: string) => {
    const responseItem = await ItineraryModel.findById({_id: idItinerary});
    return responseItem;
};


const get_UserItineraries = async(idUser: string) => {
    try {
        const user = await UserModel.findById(idUser);
        if (!user) {
            return null;
        }

        const entities = await EntityModel.find({
            _id: { $in: user.entities }
        });

        const itineraryIds = entities.reduce((acc, entity) => {
            return acc.concat(entity.itineraries || []);
        }, [] as ObjectId[]);

        const itineraries = await ItineraryModel.find({
            _id: { $in: itineraryIds }
        });

        const challengeIds = itineraries.reduce((acc, itinerary) => {
            return acc.concat(itinerary.challenges || []);
        }, [] as ObjectId[]);

        const incompleteChallenges = await ChallengeModel.find({
            _id: { $in: challengeIds, $nin: user.history }
        });

        const incompleteItineraryIds = Array.from(new Set(incompleteChallenges.map(challenge => challenge.itinerary.toString())));

        const incompleteItineraries = await ItineraryModel.find({
            _id: { $in: incompleteItineraryIds }
        });

        return incompleteItineraries;
    } catch (error) {
        console.error(error);
        return null;
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
const update_Itinerary = async(idItinerary: string, data: Itinerary) => {
    const responseItem = await EntityModel.findByIdAndUpdate({_id: idItinerary}, data, {new: true});
    return responseItem;
};
const delete_Itinerary = async(idItinerary: string) => {
    const responseItem = await ItineraryModel.findByIdAndRemove({_id: idItinerary});

    await ChallengeModel.deleteMany({itinerary: idItinerary});

    return responseItem;
};

export { get_AllItineraries, add_Itinerary, update_Itinerary, delete_Itinerary, get_UserItineraries, get_EntityItineraries, get_Itinerary };
