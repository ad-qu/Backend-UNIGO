import { ObjectId } from "mongoose";

export interface Chat {
    roomId: ObjectId; //Room identificator of the entity's room
    conversation: ObjectId[];
}