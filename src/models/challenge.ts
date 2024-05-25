/* eslint-disable quotes */
import { Schema, model } from "mongoose";

import { Challenge } from "../interfaces/challenge.interface";

const ChallengeSchema = new Schema<Challenge>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
        experience: {
            type: Number,
            required: false,
        },
        question:{
            type:[String],
            required:false,
        },
        answer: {
            type: String,
            required: false,
        },
        itinerary: {
            type: [Schema.Types.ObjectId],
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const ChallengeModel = model('challenges', ChallengeSchema);

export default ChallengeModel;