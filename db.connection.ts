import mongoose from 'mongoose'
import { errorLog, successLog } from './helpers/logs'

export default async (): Promise<void> => {
    const dbCredentials = process.env.DB_URI || ''
    try {
        await mongoose.connect(dbCredentials, {
            dbName: 'fundraiseup',
        })
        successLog('DB Connected')
    } catch (error) {
        errorLog(`DB connection failed with: ${String(error)}`)
        throw Error('DB_CONNECTION_ERROR')
    }
}
