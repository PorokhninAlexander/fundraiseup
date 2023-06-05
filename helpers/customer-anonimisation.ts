import { ICustomer } from '../interfaces/customer.interface'
import { anonymiseEmail, getAnonymisedString } from './utils'

export default (data: ICustomer) => {
    const { email } = data
    const anonimisedCustomer: ICustomer = JSON.parse(JSON.stringify(data))

    anonimisedCustomer.firstName = getAnonymisedString()
    anonimisedCustomer.lastName = getAnonymisedString()
    anonimisedCustomer.email = anonymiseEmail(email)
    anonimisedCustomer.address.line1 = getAnonymisedString()
    anonimisedCustomer.address.line2 = getAnonymisedString()
    anonimisedCustomer.address.postcode = getAnonymisedString()

    return anonimisedCustomer
}
