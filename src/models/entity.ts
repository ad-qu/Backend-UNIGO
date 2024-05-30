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
        followers: {
            type: [Schema.Types.ObjectId],
            ref: 'users',
            required: false,
        },
        admin: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true,
        },
        itineraries: {
            type: [Schema.Types.ObjectId],
            ref: 'itineraries',
            required: false,
        },
        chat:{
            type: [Schema.Types.ObjectId],
            ref: 'chats',
            required: false,
        },
        news: {
            type: [Schema.Types.ObjectId],
            ref: 'news',
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const EntityModel = model('entities', EntitySchema);

export default EntityModel;