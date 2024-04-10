/* eslint-disable quotes */
import { Schema, model } from "mongoose";

import { Itinerary } from "../interfaces/itinerary.interface";

const ItinerarySchema = new Schema<Itinerary>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        challenges: {
            type: [Schema.Types.ObjectId],
            ref: 'challenges',
        },
        badge: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ItineraryModel = model('itineraries', ItinerarySchema);

export default ItineraryModel;