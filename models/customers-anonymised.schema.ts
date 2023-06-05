import { model } from 'mongoose'
import { ICustomer } from '../interfaces/customer.interface'
import { CustomerSchema } from '../schemas/customer.schema'

export const CustomerAnonymisedModel = model<ICustomer>(
    'CustomerAnonymised',
    CustomerSchema,
    'customers_anonymised'
)
