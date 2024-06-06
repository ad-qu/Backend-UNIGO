import { ObjectId, Types } from "mongoose";

import { Challenge } from "../interfaces/challenge.interface";
import ChallengeModel from "../models/challenge";
import UserModel from "../models/user";
import { User } from "../interfaces/user.interface";
import ItineraryModel from "../models/itinerary";
import EntityModel from "../models/entity";

const get_AllChallenges = async() => {
    const responseItem = await ChallengeModel.find({});
    return responseItem;
};

const get_Challenge = async (idChallenge: string) => {
    const responseItem = await ChallengeModel.findById({_id: idChallenge}); 
    return responseItem;
};

const add_Challenge = async (item: Challenge) => {
    const itin = await ItineraryModel.findById({_id: item.itinerary, challenges: { $elemMatch: {name: item.name}}})
    if (itin) { return "ALREADY_CHALLENGE_NAMED" }

    const responseInsert = await ChallengeModel.create(item);

    const challengeId = responseInsert._id;
    await ItineraryModel.findByIdAndUpdate(
        {_id: item.itinerary},
        {$addToSet: {challenges: new Types.ObjectId(challengeId)}, $inc: {number: 1}},
        {new: true}
    );
    return responseInsert;
};

const update_Challenge = async (idChallenge: string, data: Challenge) => {
    const responseItem = await ChallengeModel.findByIdAndUpdate({_id: idChallenge}, data, {new: true}); 
    return responseItem;
};

const get_HistoryChallenges = async (idUser: string) => {
    const user = await UserModel.findById({_id: idUser}).populate({path: "history"});
    const history = user?.history as ObjectId[]; 
    return history;
};

const get_ItineraryChallenges = async (idItinerary: string) => {
    const itin = await ItineraryModel.findById(
        {_id: idItinerary})
        .populate({path: "challenges", 
        select: "name description latitude longitude question experience itinerary",});

    const challenges = itin?.challenges as ObjectId[]; 
    return challenges;
};
const delete_Challenge = async (idChallenge: string) => {
    const responseItem = await ChallengeModel.findByIdAndRemove({_id: idChallenge});

    await ItineraryModel.updateOne(
        { challenges: idChallenge },
        { $pull: { challenges: idChallenge } }
    );

    return responseItem;
};

const solve_Challenge = async (idChallenge: string, answer: string, idUser: string) => {
    const chall = await ChallengeModel.findById({_id: idChallenge}); 
    if(chall != null){
        if (answer === chall.answer){
            const response = await add_ChallengeToUser(idUser, idChallenge);
            console.log(response);
            const user = await UserModel.findById({_id: idUser}); 
            const answerStatus = "ANSWER_OK";
            console.log(`Answer ${answer} OK del challenge ${chall._id}`);
            
            return `${answerStatus}/${user?.level}/${user?.experience}`;
        }
        return "ANSWER_NOK";
    } 
    return "ANSWER_NOK";  
};

const add_ChallengeToUser = async(idUser: string, idChallenger: string) => {
    const chall = await ChallengeModel.findById({_id: idChallenger});
    const awardedExp = chall?.experience;
    const responseItem = await UserModel.findByIdAndUpdate({_id: idUser},
        {$addToSet: {record: new Types.ObjectId(idChallenger)},$inc: { exp: awardedExp }}, {new: true});
        console.log(`El responseItem del add_challenge es ${responseItem}`);

    const itin = await ItineraryModel.findOne({name: chall?.itinerary});
    const isSubset = itin?.challenges?.every((element) => responseItem?.history?.includes(element));
    if (isSubset) {
        console.log("Todos los challenges del Itinerario estan completados");
    }       

    if (responseItem && Number(responseItem?.experience) >= 100){
        responseItem.level = Number(responseItem.level) + 1;
        responseItem.experience = Number(responseItem.experience) - 100;
        console.log(responseItem);
        responseItem.save();
    }
    return responseItem;
};

const get_Challenges = async(pageNumber: number, nPerPage: number) => {
    const responseItem = await ChallengeModel.find({}).limit(nPerPage).skip((pageNumber - 1)*nPerPage);
    return responseItem;
};

const get_ChallengeCount = async() => {
    const responseItem = await ChallengeModel.find({}).count();
    return responseItem;
};

export{ get_HistoryChallenges, add_ChallengeToUser, get_ItineraryChallenges, solve_Challenge, get_AllChallenges, get_Challenges, get_Challenge, get_ChallengeCount, add_Challenge, 
    update_Challenge, delete_Challenge };