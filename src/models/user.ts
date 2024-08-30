/* eslint-disable quotes */
import { Schema, model } from "mongoose";

import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>(
    {
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: false,
        },
        imageURL: {
            type: String,
            required: false,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        level: {
            type: Number,
            required: false,
        },
        experience: {
            type: Number,
            required: false,
        },
        followers: {
            type: [Schema.Types.ObjectId],
            ref: 'users',
            required: false,
        },
        following: {
            type: [Schema.Types.ObjectId],
            ref: 'users',
            required: false,
        },
        campus: {
            type: Schema.Types.ObjectId,
            ref: 'campus',
            required: false,
        },
        entities: {
            type: [Schema.Types.ObjectId],
            ref: 'entities',
            required: false,
        },
        history: {
            type: [Schema.Types.ObjectId],
            ref: 'challenges',
            required: false,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            required: false,
        },
        active: {
            type: Boolean,
            required: false,
        },
        badges: {
            type: [String],
            // enum: ["becari", "junior", "amateur", "sensei", "c-master"],
            required: false,
        }        
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

//Once the Schema is created, it must be implemented
//1st argument ('users') is the name of the collection
//2nd argument (UserSchema) is what it feds it
const UserModel = model('users', UserSchema);

export default UserModel;