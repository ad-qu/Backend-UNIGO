import { ObjectId } from "mongoose";

export interface Campus {
    name: string;
    users: ObjectId[];
    entities: ObjectId[];
    latitude: string;
    longitude: string;
}