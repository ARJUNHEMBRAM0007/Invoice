import mongoose, {Schema} from "mongoose";

const expenseSchema = new Schema(
    {
       description: {
        type: String
       },
       amount: {
        type: Number,
        required: true
       },
       date: {
        type: Date,
        required: true
       },
       category: {
        type: String
       }
       //add merchant 
    },
    {
        timestamps: true
    }
) 

export const Expense = mongoose.model("Expense", expenseSchema)