import mongoose, {Schema} from "mongoose";

const productServiceSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
) 

export const productService = mongoose.model("productService", productServiceSchema)