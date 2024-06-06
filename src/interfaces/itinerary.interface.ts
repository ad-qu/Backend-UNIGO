import { ObjectId } from "mongoose";

export interface Itinerary {
    name: string;
    description: string;
    imageURL: string;
    challenges?: ObjectId[];
    number: number; //number of challenges
}