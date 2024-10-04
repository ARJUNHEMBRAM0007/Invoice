import mongoose, {Schema} from "mongoose";

const timeTrackingSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Client',
            required: true
        },
        project: {
            type: String,
            required: true
        },
        hours: {
            type: Number,
        },
        date: {
            type: Date,
        }
    }
) 

export const timeTracking = mongoose.model("timeTraking", timeTrackingSchema)