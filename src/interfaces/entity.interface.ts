import { ObjectId } from "mongoose";

export interface Entity {
    name: string;
    description: string;
    imageURL: string;
    verified: string;
    followers: ObjectId[];
    admin: ObjectId;
    itineraries?: ObjectId[];
    chat?: ObjectId[];
    news?: ObjectId[];
}