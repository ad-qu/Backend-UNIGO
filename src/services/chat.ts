import mongoose, { ObjectId, Types } from "mongoose";

import { New } from "../interfaces/new.interface";
import EntityModel from "../models/entity";
import ChatModel from "../models/chat";

const get_Chat = async(idChat: string) => {
    const responseItem = await ChatModel.findById({_id: idChat}).populate('conversation');
    return responseItem;
};

const add_Chat = async (idEntity: string) => {
   
    const entityId = idEntity;
    const conversation = null;

    const chat = new ChatModel({
        _id: new mongoose.Types.ObjectId(),
        entityId,
        conversation
    });
    
    await EntityModel.findByIdAndUpdate(
        {_id: idEntity},
        {$addToSet: {chat: new Types.ObjectId(chat._id)}},
        {new: true}
    );

    return chat;
};

const update_Chat = async (roomId: string, idUser: string, senderName: string, message: string) => {
   
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
