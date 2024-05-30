import mongoose, { Types } from "mongoose";

import { New } from "../interfaces/new.interface";
import EntityModel from "../models/entity";
import ChatModel from "../models/chat";

const get_Chat = async(idChat: string) => {
    const responseItem = await ChatModel.findById({_id: idChat}).populate('conversation');
    return responseItem;
};

const add_Chat = async (idEntity: string) => {
   
    const roomId = idEntity;
    const conversation = null;

    const chat = new ChatModel({
        _id: new mongoose.Types.ObjectId(),
        roomId,
        conversation
    });
    
    await EntityModel.findByIdAndUpdate(
        {_id: idEntity},
        {$addToSet: {chat: new Types.ObjectId(chat._id)}},
        {new: true}
    );

    return chat;
};

const delete_Chat = async (idChat: string) => {
    const responseItem = await ChatModel.findByIdAndRemove({_id: idChat});

    await EntityModel.updateOne(
        { chat: idChat },
        { $pull: { chat: idChat } }
    );

    return responseItem;
};

export { get_Chat, add_Chat, delete_Chat };
