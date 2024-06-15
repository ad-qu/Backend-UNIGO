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

const get_Not_Following_Entities = async (idUser: string) => {
    const user = await UserModel.findById(idUser);
    const entityNotFollowing = await EntityModel.find({_id: { $ne: idUser, $nin: user?.entities }})
    .select('name description imageURL verified admin');
    return entityNotFollowing;
};

const get_Following_Entities = async (idUser: string) => {
    const responseItem = await UserModel.findById(
        {_id: idUser},
        ).populate({
            path: "entities",
            select: "name description imageURL verified admin",
        });
    if (responseItem?.entities?.length != 0 && responseItem != null)
    {
        return responseItem.entities;
    }
        return responseItem;
};

const get_FollowingPeople = async (idEntity: string) => {
    const responseItem = await EntityModel.findById({_id: idEntity},).populate({
        path: "followers",
        select: "name surname username level imageURL active",
    });
    return responseItem?.followers;
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

    const admin = await UserModel.findByIdAndUpdate(
        {_id: item.admin},
        {$addToSet: {entities: new Types.ObjectId(entityId)}},
        {new: true}
    );

    await EntityModel.findByIdAndUpdate(
        { _id: entityId },
        { $addToSet: { followers: new Types.ObjectId(admin?.id) } },
        { new: true }
    );

    return responseInsert;
};

const update_Entity = async(idEntity: string, data: User) => {
    const responseItem = await EntityModel.findByIdAndUpdate({_id: idEntity}, data, {new: true});
    return responseItem;
};

const add_FollowEntity = async(idUser: string, idEntity: string) => {
    const entity = await EntityModel.findById({_id: idEntity});
    await EntityModel.findByIdAndUpdate(
        { _id: idEntity },
        { $addToSet: { followers: new Types.ObjectId(idUser) } },
        { new: true }
    );
    const responseItem = await UserModel.findByIdAndUpdate({_id: idUser},
        {$addToSet: {entities: new Types.ObjectId(entity?.id)}}, {new: true});
        
    return responseItem;
};

const delete_FollowEntity = async(idUser: string, idEntity: string) => {
    const entity = await EntityModel.findById({_id: idEntity}); 
    await EntityModel.findByIdAndUpdate(
        { _id: idEntity },
        { $pull: { followers: new Types.ObjectId(idUser) } },
        { new: true }
    );
    const responseItem = await UserModel.findByIdAndUpdate({_id: idUser},
        {$pull: {entities: new Types.ObjectId(entity?.id)}}, {new: true})
       
    return responseItem;
};

export { get_AllEntities, get_Not_Following_Entities, get_Following_Entities, delete_Entities, 
    add_Entity, add_FollowEntity, delete_FollowEntity, update_Entity, get_Entity, get_FollowingPeople};
