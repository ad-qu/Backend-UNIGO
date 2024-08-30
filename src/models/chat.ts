/* eslint-disable quotes */
import { Schema, model } from "mongoose";

import { Chat } from "../interfaces/chat.interface";

const ChatSchema = new Schema<Chat>(
    {
        roomId: {
            type: Schema.Types.ObjectId,
            ref: 'entities',
            required: true,
        },
        conversation: {
            type: [Schema.Types.ObjectId],
            ref: 'messages',
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ChatModel = model('chats', ChatSchema);

export default ChatModel;