import db from './db.connection'
import * as dotenv from 'dotenv'
import app from './apps/app'
import { errorLog, warningLog } from './helpers/logs'
import { AppTypeEnum } from './enums/app-type.enum'
import sync from './apps/sync'
import * as fs from 'fs'
;(async () => {
    const appType = process.argv[2]
    if (!Object.values(AppTypeEnum).includes(appType as AppTypeEnum)) {
        errorLog('Invalid running command!')
        process.exit()
    }
    dotenv.config()

    await db()
    if (appType === 'app') {
        warningLog('Starting APP in process ...')
        await app()
    } else if (process.argv[3] === '--full-reindex') {
        warningLog('Staring FULL SYNC in process ...')
        await sync({ fullSync: true })
    } else {
        warningLog('Starting SYNC in process ...')

        const pidFromList = fs.readFileSync('pid.txt')
        const openedPid = pidFromList ? Number(pidFromList) : undefined
        fs.writeFileSync('pid.txt', String(process.pid))
        await sync({ openedPid })
    }
})()
