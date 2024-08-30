import { Types } from "mongoose";

import { New } from "../interfaces/new.interface";
import CampusModel from "../models/campus";
import { Campus } from "../interfaces/campus.interface";

const get_AllCampus = async() => {
    const responseItem = await CampusModel.find({});
    return responseItem;
};

const get_Campus = async(idCampus: string) => {
    const responseItem = await CampusModel.findById({_id: idCampus});
    return responseItem;
};

const add_Campus = async (item: Campus) => {
    const responseInsert = await CampusModel.create(item);
   
    return responseInsert;
};

const delete_Campus = async (idCampus: string) => {
    const responseItem = await CampusModel.findByIdAndRemove({_id: idCampus});
    return responseItem;
};

export { get_AllCampus, get_Campus, add_Campus, delete_Campus };
