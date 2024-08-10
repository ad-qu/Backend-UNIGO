import { ObjectId } from 'mongoose';

export interface Challenge {
    name: string;
    description: string;
    latitude: string;
    longitude: string;
    question: String[];
    answer:string,
    experience: Number; //Amount of experience that the challenge will give to the users
    itinerary: ObjectId,
    imageURL: string;
}