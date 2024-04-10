import { ObjectId } from "mongoose";

export interface Chat {
    entity: string;
    messages?: ObjectId[];
}