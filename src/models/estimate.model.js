import mongoose, {Schema} from "mongoose";

const estimateSchema = new Schema(
    {
        clientId: {
            type: Schema.Types.ObjectId,
            ref: 'Client', required: true
        },
        items: [{
            description: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            },
            rate: {
                type: Number,
                required: true
            }
        }],
        totalAmount: {
            type: Number,
            required: true
        },
        expirationDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
) 

export const Estimate = mongoose.model("Estimate", estimateSchema)