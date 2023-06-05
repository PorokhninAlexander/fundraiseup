import syncService from './services/sync.service'
import fullSyncService from './services/full-sync.service'

export default async (data: {
    fullSync?: boolean
    openedPid?: number
}): Promise<void> => {
    const { fullSync, openedPid } = data
    if (!fullSync) {
        await syncService(openedPid)
    } else {
        await fullSyncService()
    }
}
