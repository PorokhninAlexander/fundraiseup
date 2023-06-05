import { successLog, warningLog } from './logs'

export const closeProcessByPid = (pid: number) => {
    try {
        process.kill(pid, 'SIGINT')
        successLog('Previous process finished')
    } catch (error) {
        warningLog(`Process ${pid} not found`)
    }
}
