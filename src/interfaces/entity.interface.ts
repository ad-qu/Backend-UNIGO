import { ObjectId } from "mongoose";

export interface Entity {
    name: string;
    description: string;
    imageURL: string;
    verified: boolean;
    admins: String[];
    itineraries?: ObjectId[];
    chat?: ObjectId[];
    news?: ObjectId[];
}