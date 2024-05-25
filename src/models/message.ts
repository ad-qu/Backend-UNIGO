/* eslint-disable quotes */
import { Schema, model } from "mongoose";

import { Message } from "../interfaces/message.interface";

const MessageSchema = new Schema<Message>(
    {
        idUser: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const MessageModel = model('messages', MessageSchema);

export default MessageModel;