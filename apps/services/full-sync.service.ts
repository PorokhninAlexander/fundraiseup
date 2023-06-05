import { CustomerModel } from '../../models/customer.model'
import { CustomerAnonymisedModel } from '../../models/customers-anonymised.schema'
import { errorLog } from '../../helpers/logs'
import customerAnonimisation from '../../helpers/customer-anonimisation'

export default async (): Promise<void> => {
    try {
        let skip = 0
        while (true) {
            const [customer] = await CustomerModel.find(
                { createdAt: { $ne: null } },
                null,
                {
                    limit: 1,
                    skip,
                }
            )
            if (!customer) break
            await CustomerAnonymisedModel.updateOne(
                { _id: customer._id },
                customerAnonimisation(customer),
                { upsert: true }
            )
            ++skip
        }
    } catch (error) {
        errorLog(`fullSyncService failed with: ${String(error)}`)
    } finally {
        process.exit(0)
    }
}
