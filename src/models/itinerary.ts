/* eslint-disable quotes */
import { Schema, model } from "mongoose";

import { Itinerary } from "../interfaces/itinerary.interface";

const ItinerarySchema = new Schema<Itinerary>(
    {
        name: {
            type: String,
            required: true,
        },
        imageURL: {
            type: String,
            required: false,
        },

        challenges: {
            type: [Schema.Types.ObjectId],
            ref: 'challenges',
            required: false,
        },
        number: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ItineraryModel = model('itineraries', ItinerarySchema);

export default ItineraryModel;