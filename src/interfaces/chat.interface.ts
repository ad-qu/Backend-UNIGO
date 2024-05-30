import { ObjectId } from "mongoose";

export interface Chat {
    roomId: string; //Room identificator of the entity's room
    conversation: ObjectId[];
}