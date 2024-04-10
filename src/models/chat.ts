/* eslint-disable quotes */
import { Schema, model } from "mongoose";

import { Chat } from "../interfaces/chat.interface";

const ChatSchema = new Schema<Chat>(
    {
        entity: {
            type: String,
            required: true,
        },
        messages: {
            type: [Schema.Types.ObjectId],
            ref: 'messages',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ChatModel = model('chats', ChatSchema);

export default ChatModel;