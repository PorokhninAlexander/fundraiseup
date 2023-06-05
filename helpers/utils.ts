import { generate } from 'randomstring'

export const getAnonymisedString = (): string => {
    return generate({
        length: 8,
        charset: 'alphabetic',
    })
}

export const anonymiseEmail = (email: string): string => {
    return `${getAnonymisedString()}@${email.split('@')[1]}`
}
