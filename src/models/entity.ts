/* eslint-disable quotes */
import { Schema, model } from "mongoose";

import { Entity } from "../interfaces/entity.interface";

const EntitySchema = new Schema<Entity>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        imageURL: {
            type: String,
            required: false,
        },
        verified: {
            type: String,
            required: false,
        },
        admin: {
            type: [Schema.Types.ObjectId],
            ref: 'users',
            required: true,
        },
        itineraries: {
            type: [Schema.Types.ObjectId],
            ref: 'itineraries',
        },
        chat:{
            type: [Schema.Types.ObjectId],
            ref: 'chats',
        },
        news: {
            type: [Schema.Types.ObjectId],
            ref: 'news',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const EntityModel = model('entities', EntitySchema);

export default EntityModel;