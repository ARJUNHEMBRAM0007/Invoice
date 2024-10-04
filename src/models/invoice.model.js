import mongoose, {Schema} from "mongoose";

const invoiceSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User', required: true
        },

        clientId: {
            type: Schema.Types.ObjectId,
            ref: 'Client', required: true
        },
        invoiceNumber: {
            type: String, required: true
        },

        invoiceDate: {
            type: Date,
            required: true
        },

        dueDate: {
            type: Date,
            required: true
        },

        items: [{
            description: {
                type: String
            },
            quantity: {
                type: Number
            },
            rate: {
                type: Number
            }
        }],

        status: {
            type: String,
            default: "pending"
        },

        discount: {
            type: Number
        },

        tax: {
            type: Number,
            default: 0
        },
        totalAmount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            default: "INR"
        },
        notes: {
            type: String
        }

    },
    {
        timestamps: true
    }
) 

export const Invoice = mongoose.model("Invoice", invoiceSchema)