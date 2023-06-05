import { Schema } from 'mongoose'
import { ICustomer } from '../interfaces/customer.interface'

export const CustomerSchema = new Schema<ICustomer>(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        address: {
            line1: { type: String, required: true },
            line2: { type: String, required: true },
            postcode: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            country: { type: String, required: true },
        },
        createdAt: { type: Date, default: Date.now(), required: true },
    },
    { versionKey: false }
)
