import { ObjectId } from "mongoose";

export interface User {
    name: string;
    surname: string;
    imageURL: string;
    username: string; //User name that will appear in the application
    email: string;
    password: string;
    level: Number; //Level that depends on the experience > In order to level up: exp_actual = 50*next_level + 500 
    experience: Number; //Current user experience > Increases each time a challenge is accomplished
    badges: String[]; //The insignias won by the user
    followers?: ObjectId[];
    following?: ObjectId[];
    campus?: ObjectId;
    entities?: ObjectId[];
    history?: ObjectId[]; //List of ended challenges
    role: "user" | "admin"; //admin == Has all the permissions 
    active: boolean; //When the user disables his or her account it is set false
}