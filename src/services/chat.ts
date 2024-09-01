import mongoose, { ObjectId, Types } from "mongoose";

import { New } from "../interfaces/new.interface";
import EntityModel from "../models/entity";
import ChatModel from "../models/chat";
import MessageModel from "../models/message";
import { Chat } from '../interfaces/chat.interface';



const get_Chat = async (idEntity: string) => {
    try {
        const entity = await EntityModel.findById(idEntity).select('chat').populate({
            path: 'chat',
            populate: {
                path: 'conversation',
                model: MessageModel,  // Asegúrate de que esto corresponde al modelo Message
                select: 'idUser senderName message', // Campos que quieres traer de cada mensaje
            },
        });

        if (!entity) {
            return "ENTITY_NOT_FOUND";
        }

        if (!entity.chat) {
            return "CHAT_NOT_FOUND";
        }

        return entity.chat;
    } catch (error) {
        console.error("Error getting chat:", error);
        throw error;
    }
};

const add_Chat = async (roomId: string) => {
    try {
        const chat = new ChatModel({
            roomId: new mongoose.Types.ObjectId(roomId),
            conversation: [] 
        });
        
        const savedChat = await chat.save(); 

        return savedChat;
    } catch (error) {
        console.error("Error creating chat:", error);
        throw error;
    }
};

const update_Chat = async (idChat: string, idUser: string, senderName: string, message: string) => {
    const chat = await ChatModel.findById(idChat);
    const newMsg = new MessageModel({
        _id: new mongoose.Types.ObjectId(),
        idUser,
        senderName,
        message
    });
    chat?.conversation.push(newMsg.id);
    await newMsg.save();
    await chat?.save();
    return chat?.save();
};

const delete_Chat = async (idChat: string) => {
    const responseItem = await ChatModel.findByIdAndRemove({_id: idChat});

    await EntityModel.updateOne(
        { chat: idChat },
        { $pull: { chat: idChat } }
    );

    return responseItem;
};

export { get_Chat, add_Chat, update_Chat, delete_Chat };
