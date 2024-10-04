import mongoose, {Schema} from "mongoose";

const paymentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User', required: true
        },
        invoiceId: {
            type: Schema.Types.ObjectId,
            ref: 'Invoice', required: true
        },
        paymentDate: {
            type: Date, required: true
        },
        amountPaid: {
            type: Number, required: true
        },
        paymentMethod: {
            type: String, required: true
        },
        paymentStatus: {
            type: String, default: 'Completed'
        },
        transactionId: {
            type: String, required: true
        }
        
    },
    {
        timestamps: true
    }
) 

export const Payment = mongoose.model("Payment", paymentSchema)