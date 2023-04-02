import { Types } from "mongoose";

import { User } from "../interfaces/user.interface";
import UserModel from "../models/user";
import ChallengeModel from "../models/user";


const get_Users = async() => {
    const responseItem = await UserModel.find({});
    return responseItem;
};

const get_User = async(id: string) => {
    const responseItem = await UserModel.findOne({_id: id});
    return responseItem;
};

const update_User = async(id: string, data: User) => {
    const responseItem = await UserModel.findOneAndUpdate({_id: id}, data,{new: true});
    return responseItem;
};

const delete_User = async(id: string) => {
    const responseItem = await UserModel.findOneAndRemove({_id: id});
    return responseItem;
}

const disable_User = async(id: string) => {
    const responseItem = await UserModel.findOneAndUpdate(
        {_id: id},
        { active: false });
    return responseItem;
}

const add_Challenge = async(idUser: string, nameChallenge: string) => {
    const challenge = await ChallengeModel.findOne({name: nameChallenge});
    const responseItem = await UserModel.findOneAndUpdate(
        {_id: idUser},
        {$addToSet: {record: new Types.ObjectId(challenge?.name)}},
        {new: true}
        );
    return responseItem;
}

const sign_up = async(item: User) => {
    const responseItem = await UserModel.create(item);
    return responseItem;
}

const add_Friend = async(idUser: string, usernameFriend: string) => {
    const friend = await UserModel.findOne({username: usernameFriend});   
    const responseItem = await UserModel.findOneAndUpdate(
        {_id: idUser},
        {$addToSet: {record: new Types.ObjectId(friend?.id)}},
        {new: true}
        );
    return responseItem;
}

const delete_Friend = async(id: string) => {
    const responseItem = await UserModel.findOneAndRemove({_id: id});
    return responseItem;
}

const log_in = async(credential: string, password: string) => {
    const responseItem = await UserModel.findOne({email: credential}, {password: password});
    return responseItem;
}

export { delete_User, disable_User, add_Challenge, delete_Friend, add_Friend, update_User, sign_up, log_in, get_User, get_Users };
