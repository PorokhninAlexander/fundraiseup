import { faker } from '@faker-js/faker'
import { CustomerModel } from '../models/customer.model'
import { ICustomer } from '../interfaces/customer.interface'
import { HydratedDocument } from 'mongoose'
import { errorLog, successLog } from '../helpers/logs'

const MIN_CUSTOMERS_COUNT = 1
const MAX_CUSTOMERS_COUNT = 10
const MS_DELAY_BETWEEN_INSERT = 200

export default async (): Promise<void> => {
    const customerGenerator = (): HydratedDocument<ICustomer> => {
        return new CustomerModel({
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            address: {
                line1: faker.location.streetAddress(),
                line2: faker.location.secondaryAddress(),
                postcode: faker.location.zipCode(),
                city: faker.location.city(),
                state: faker.location.state(),
                country: faker.location.country(),
            },
        })
    }

    const generateCustomersToInsert = (): HydratedDocument<ICustomer>[] => {
        return faker.helpers.multiple(customerGenerator, {
            count: { min: MIN_CUSTOMERS_COUNT, max: MAX_CUSTOMERS_COUNT },
        })
    }

    const insertCustomers = async (): Promise<void> => {
        try {
            const data = generateCustomersToInsert()
            await CustomerModel.insertMany(data)
            successLog(
                `${insertCustomers.name}: inserted ${data.length} records`
            )
        } catch (error) {
            errorLog(`${insertCustomers.name} failed with: ${error}`)
        }
    }

    setInterval(insertCustomers, MS_DELAY_BETWEEN_INSERT)
}
