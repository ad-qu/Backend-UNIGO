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
import { add_Chat } from './chat';

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
    .select('name description imageURL verified admin campus');
    return entityNotFollowing;
};

const get_Following_Entities = async (idUser: string) => {
    console.log(idUser);

    const responseItem = await UserModel.findById(
        {_id: idUser},
        ).populate({
            path: "entities",
            select: "name description imageURL verified admin campus",
        });
    if (responseItem?.entities?.length != 0 && responseItem != null)
    {
        console.log(responseItem.entities);

        return responseItem.entities;
    }
    console.log(responseItem);
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
        // Busca la entidad y poblala con el chat
        const entity = await EntityModel.findById(idEntity).populate('chat');

        if (!entity) {
            throw new Error('No se encontró la entidad');
        }

        // Eliminar itinerarios y sus desafíos
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

        // Eliminar noticias
        if (entity.news && entity.news.length > 0) {
            await NewModel.deleteMany({ _id: { $in: entity.news } });
        }

        // Eliminar el chat asociado y sus mensajes
        if (entity.chat) {
            const chat = await ChatModel.findById(entity.chat);
            if (chat) {
                // Eliminar mensajes asociados al chat
                await MessageModel.deleteMany({ _id: { $in: chat.conversation } });
                // Eliminar el chat
                await ChatModel.findByIdAndDelete(chat._id);
            }
        }

        // Eliminar referencias de la entidad en usuarios
        await UserModel.updateMany(
            { entities: new Types.ObjectId(idEntity) },
            { $pull: { entities: new Types.ObjectId(idEntity) } }
        );

        // Eliminar la entidad
        const responseItem = await EntityModel.findByIdAndDelete(idEntity);
        return responseItem;

    } catch (error) {
        console.error('Error al eliminar itinerarios, desafíos, noticias, chats y actualizar usuarios:', error);
        throw error;
    }
};

const add_Entity = async (item: Entity) => {
    try {
        const existingEntity = await EntityModel.findOne({ name: item.name });
        if (existingEntity) return "ALREADY_USED_NAME";

        const responseInsert = await EntityModel.create(item);
        const entityId = responseInsert._id;

        const admin = await UserModel.findByIdAndUpdate(
            item.admin,
            { $addToSet: { entities: entityId } },
            { new: true }
        );

        const chat = await add_Chat(entityId.toString());

        await EntityModel.findByIdAndUpdate(
            entityId,
            { chat: chat._id, $addToSet: { followers: admin?._id } },
            { new: true }
        );

        return responseInsert;
    } catch (error) {
        console.error("Error adding entity:", error);
        throw error;
    }
};

const update_Entity = async(idEntity: string, data: Entity) => {
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
