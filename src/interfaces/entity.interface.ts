import { ObjectId } from "mongoose";

export interface Entity {
    name: string;
    description: string;
    imageURL: string;
    verified: string;
    admins: ObjectId[];
    itineraries?: ObjectId[];
    chat?: ObjectId[];
    news?: ObjectId[];
}