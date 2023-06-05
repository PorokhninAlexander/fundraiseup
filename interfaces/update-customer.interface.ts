import {ObjectId} from "mongodb";
import {ICustomer} from "./customer.interface";

export interface IUpdateCustomer {
    updateOne: {
        filter: {
            _id: ObjectId
        },
        update: ICustomer,
        upsert: boolean
    }
}