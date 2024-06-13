import { Types } from "mongoose";

import { New } from "../interfaces/new.interface";
import EntityModel from "../models/entity";
import NewModel from "../models/new";

const get_AllNews = async() => {
    const responseItem = await NewModel.find({});
    return responseItem;
};
const get_EntityNews = async(idEntity: string) => {
    console.log(idEntity);
    const responseItem = await EntityModel.findById({_id: idEntity}).populate({path: "news"});
    return responseItem?.news;
};

const get_New = async(idNew: string) => {
    const responseItem = await NewModel.findById({_id: idNew});
    return responseItem;
};

const add_New = async (idEntity: string, item: New) => {
    const responseInsert = await NewModel.create(item);
    const newId = responseInsert._id;
    await EntityModel.findByIdAndUpdate(
        {_id: idEntity},
        {$addToSet: {news: new Types.ObjectId(newId)}},
        {new: true}
    );
    return responseInsert;
};

const delete_New = async (idNew: string) => {
    const responseItem = await NewModel.findByIdAndRemove({_id: idNew});

    await EntityModel.updateOne(
        { news: idNew },
        { $pull: { news: idNew } }
    );

    return responseItem;
};

export { get_AllNews, get_EntityNews, get_New, add_New, delete_New };
