import mongoose, { Types } from "mongoose";

import ChatModel from "../models/chat";
import MessageModel from "../models/message";

const get_Message = async(idMessage: string) => {
    const responseItem = await MessageModel.findById({_id: idMessage});
    return responseItem;
};

const add_Message = async (idChat: string, idUser: string, senderName: string, message: string) => {
   
    const newMsg = new MessageModel({
        _id: new mongoose.Types.ObjectId(),
        idUser,
        senderName,
        message
    });

    return newMsg;
};

const delete_Message = async (idMessage: string) => {
    const responseItem = await ChatModel.findByIdAndRemove({_id: idMessage});

    await ChatModel.updateOne(
        { conversation: idMessage },
        { $pull: { conversation: idMessage } }
    );
    return responseItem;
};

export { get_Message, add_Message, delete_Message };
