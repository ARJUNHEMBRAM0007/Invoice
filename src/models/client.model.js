import mongoose, {Schema} from "mongoose";

const clientSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        clientName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true
        },
        mobile: {
            type: Number,
            required: true,
            trim: true
        },
        website: {
            type: String,
            trim: true
        },
        taxNumber: {
            type: String,
            trim: true
        },
        contactName: {
            type: String,
            required: true,
            trim: true
        },
        billingAddress: {
            type: String,
            trim: true
        },
        customPaymentTerms: {
            type:String
        },
    },
    {
        timestamps: true
    }
) 

export const Client = mongoose.model("Client", clientSchema)