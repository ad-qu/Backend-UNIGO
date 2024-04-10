/* eslint-disable quotes */
import { Schema, model } from "mongoose";

import { New } from "../interfaces/new.interface";

const NewSchema = new Schema<New>(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const NewModel = model('news', NewSchema);

export default NewModel;