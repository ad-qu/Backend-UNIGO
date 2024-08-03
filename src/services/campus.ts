import { Types } from "mongoose";

import { New } from "../interfaces/new.interface";
import CampusModel from "../models/campus";

const get_AllCampus = async() => {
    const responseItem = await CampusModel.find({});
    return responseItem;
};
const get_ListCampus = async(idEntity: string) => {
    const responseItem = await CampusModel.findById({});
    return responseItem;
};

const get_Campus = async(idNew: string) => {
    const responseItem = await CampusModel.findById({_id: idNew});
    return responseItem;
};

const add_Campus = async (idEntity: string, item: New) => {
    const responseInsert = await CampusModel.create(item);
   
    return responseInsert;
};

const delete_Campus = async (idNew: string) => {
    const responseItem = await CampusModel.findByIdAndRemove({});
    return responseItem;
};

export { get_AllCampus, get_ListCampus, get_Campus, add_Campus, delete_Campus };
