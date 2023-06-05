import { CustomerAnonymisedModel } from '../../models/customers-anonymised.schema'
import { CustomerModel } from '../../models/customer.model'
import { closeProcessByPid } from '../../helpers/process'
import { errorLog, successLog } from '../../helpers/logs'
import { IUpdateCustomer } from '../../interfaces/update-customer.interface'
import customerAnonimisation from '../../helpers/customer-anonimisation'

export default async (openedPid?: number): Promise<void> => {
    let updatesArray: IUpdateCustomer[] = []

    const insertAnonymisedCustomers = async (): Promise<void> => {
        let updatesArrayCopy = [...updatesArray]
        try {
            updatesArray = []
            await CustomerAnonymisedModel.bulkWrite([...updatesArrayCopy])
            updatesArrayCopy = []
        } catch (error) {
            updatesArray = [...updatesArray, ...updatesArrayCopy]
            errorLog(`${insertAnonymisedCustomers.name} failed with: ${error}`)
            console.log('updatesArray: ', updatesArray)
        }
    }

    let interval = setInterval(() => insertAnonymisedCustomers(), 1000)

    CustomerModel.watch(
        [{ $match: { operationType: { $in: ['insert', 'update'] } } }],
        { fullDocument: 'updateLookup' }
    ).on('change', async (data) => {
        if (data.operationType === 'update') {
            console.log('-----------------------------------------')
            console.log(data)
            return
        }
        updatesArray.push({
            updateOne: {
                filter: {
                    _id: data.documentKey._id,
                },
                update: customerAnonimisation(data.fullDocument),
                upsert: true,
            },
        })
        if (updatesArray.length === 1000) {
            clearInterval(interval)
            insertAnonymisedCustomers()
            interval = setInterval(insertAnonymisedCustomers, 1000)
        }
    })

    openedPid && closeProcessByPid(openedPid)
    successLog('Sync application running!')

    process.on('SIGINT', () => {
        clearInterval(interval)
        insertAnonymisedCustomers()
        process.kill(process.pid)
    })
}
