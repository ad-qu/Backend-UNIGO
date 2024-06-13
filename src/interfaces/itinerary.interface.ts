import { ObjectId } from "mongoose";

export interface Itinerary {
    name: string;
    imageURL: string;
    challenges?: ObjectId[];
    number: number; //number of challenges
}