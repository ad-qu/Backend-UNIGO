import mongoose, { Types } from "mongoose";

import EntityModel from "../models/entity";
import ChatModel from "../models/chat";

const get_Message = async(idChat: string) => {
    const responseItem = await ChatModel.findById({_id: idChat}).populate('conversation');
    return responseItem;
};

const add_Message = async (idEntity: string) => {
   
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

const delete_Message = async (idChat: string) => {
    const responseItem = await ChatModel.findByIdAndRemove({_id: idChat});

    await EntityModel.updateOne(
        { chat: idChat },
        { $pull: { chat: idChat } }
    );

    return responseItem;
};

export { get_Message, add_Message, delete_Message };
