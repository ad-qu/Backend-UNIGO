import { Types } from "mongoose";

import { New } from "../interfaces/new.interface";
import EntityModel from "../models/entity";
import ChatModel from "../models/chat";

const get_Chat = async(idChat: string) => {
    const responseItem = await ChatModel.findById({_id: idChat});
    return responseItem;
};

const add_Chat = async (idEntity: string, item: New) => {
    const responseInsert = await ChatModel.create(item);

    const chatId = responseInsert._id;

    await EntityModel.findByIdAndUpdate(
        {_id: idEntity},
        {$addToSet: {chat: new Types.ObjectId(chatId)}},
        {new: true}
    );

    return responseInsert;
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
