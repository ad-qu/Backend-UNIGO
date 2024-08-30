import { Schema, model } from "mongoose";

import { Campus } from '../interfaces/campus.interface';

const CampusSchema = new Schema<Campus>(
    {
        name: {
            type: String,
            required: true,
        },
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
); 

const CampusModel = model('campus', CampusSchema);

export default CampusModel;