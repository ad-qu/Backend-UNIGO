import { Types } from 'mongoose';
import { Entity } from '../interfaces/entity.interface';
import { User } from '../interfaces/user.interface';
import EntityModel from "../models/entity";
import UserModel from '../models/user';
import ItineraryModel from '../models/itinerary';
import ChallengeModel from '../models/challenge';
import ChatModel from '../models/chat';
import MessageModel from '../models/message';
import NewModel from '../models/new';

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

const delete_Entities = async (idEntity: string) => {
    try {
        const entity = await EntityModel.findById(idEntity);

        if (!entity) {
            throw new Error('No se encontró la entidad');
        }

        if (entity.itineraries && entity.itineraries.length > 0) {
            for (const idItinerary of entity.itineraries) {
                const itinerary = await ItineraryModel.findById(idItinerary);
                if (itinerary) {
                    if (itinerary.challenges && itinerary.challenges.length > 0) {
                        await ChallengeModel.deleteMany({ itinerary: idItinerary });
                    }
                    await ItineraryModel.findByIdAndDelete(idItinerary);
                }
            }
        }

        if (entity.news && entity.news.length > 0) {
            await NewModel.deleteMany({ _id: { $in: entity.news } });
        }

        await UserModel.updateMany(
            { entities: new Types.ObjectId(idEntity) }, 
            { $pull: { entities: new Types.ObjectId(idEntity) } },
            { new: true }
        );

        const responseItem = await EntityModel.findByIdAndDelete(idEntity);
        return responseItem;

    } catch (error) {
        console.error('Error al eliminar itinerarios, desafíos, noticias y actualizar usuarios:', error);
        throw error;
    }
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
