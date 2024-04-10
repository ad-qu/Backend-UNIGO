import { ObjectId } from "mongoose";

export interface Itinerary {
    name: string;
    description: string;
    challenges?: ObjectId[];
    badge: string;
}