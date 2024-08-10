import { ObjectId } from "mongoose";

export interface Itinerary {
    name: string;
    imageURL: string;
    challenges?: ObjectId[];
    number: number; //Number of challenges
}