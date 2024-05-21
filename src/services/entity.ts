import { Types } from 'mongoose';
import { Entity } from '../interfaces/entity.interface';
import { User } from '../interfaces/user.interface';
import EntityModel from "../models/entity";
import UserModel from '../models/user';

const get_AllEntities = async() => {
    const responseItem = await EntityModel.find({});
    return responseItem;
};

const get_Entity = async(idEntity: string) => {
    const responseItem = await EntityModel.findById({_id: idEntity});
    return responseItem;
};

const get_not_Following_Entities = async (idUser: string, data: User) => {
    const user = await UserModel.findById(idUser);
    if (user){
        const usersNotFollowing = await EntityModel.find({
        _id: { $ne: idUser, $nin: user.entities }
        });
        return usersNotFollowing; 
    }
    else {
        return null;
    }   
};

const get_Following_Entities = async (idUser: string) => {
    const responseItem = await UserModel.findById(
        {_id: idUser},
        ).populate({
            path: "entities",
            select: "name description imageURL verified",
        });
    if (responseItem?.entities?.length != 0 && responseItem != null)
    {
        return responseItem.entities;
    }
        return responseItem;
};

const delete_Entities = async(idEntity: string) => {
    const responseItem = await EntityModel.findByIdAndRemove({_id: idEntity});
    return responseItem;
};

const add_Entity = async (item: Entity) => {
    const entity = await EntityModel.findOne({ name: item.name });
    if (entity != null)
        return "ALREADY_USED_NAME";

    const responseInsert = await EntityModel.create(item);

    const entityId = responseInsert._id;

    await UserModel.findByIdAndUpdate(
        {_id: item.admin},
        {$addToSet: {entities: new Types.ObjectId(entityId)}},
        {new: true}
    );
    return responseInsert;
};

const update_Entity = async(idEntity: string, data: User) => {
 
    const responseItem = await EntityModel.findByIdAndUpdate({_id: idEntity}, data, {new: true});
    return responseItem;
};

const add_FollowEntity = async(idUser: string, idEntity: string) => {
    const entity = await EntityModel.findById({_id: idEntity}); //Person being followed
    const responseItem = await UserModel.findByIdAndUpdate({_id: idUser},
        {$addToSet: {entities: new Types.ObjectId(entity?.id)}}, {new: true});
      
    return responseItem;
};

const delete_FollowEntity = async(idUser: string, idEntity: string) => {
    const entity = await UserModel.findById({_id: idEntity}); //Person being followed
    const responseItem = await UserModel.findByIdAndUpdate({_id: idUser},
        {$pull: {following: new Types.ObjectId(entity?.id)}}, {new: true})
       
    return responseItem;
};

export { get_AllEntities, get_not_Following_Entities, get_Following_Entities, delete_Entities, 
    add_Entity, add_FollowEntity, delete_FollowEntity, update_Entity, get_Entity};
