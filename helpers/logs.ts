export const successLog = (logData: any): void => {
    console.log(`\x1b[32m${String(logData)}\x1b[0m`)
}

export const warningLog = (logData: any): void => {
    console.log(`\x1b[33m${String(logData)}\x1b[0m`)
}

export const errorLog = (logData: any): void => {
    console.log(`\x1b[31m${String(logData)}\x1b[0m`)
}
