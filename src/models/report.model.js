import mongoose, {Schema} from "mongoose";

const reportSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reportType: {
            type: String,
            enum: ['revenue', 'expenses', 'profit', 'taxation'],
            required: true
        },
        data: {
            type: Object,
            required: true
        }
    },
    {
        timestamps: true
    }
) 

export const Report = mongoose.model("Report", reportSchema)