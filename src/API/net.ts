import { URLs } from './urls';
import axios, {AxiosResponse} from "axios"

/**
 * Request to get users from the Randomosier service
 * @param amount This is the parameter for the number of users you want to get
 * @returns Returns Promise
 */

export const getUsers = async ():
    Promise<Pick<AxiosResponse, 'status' | 'statusText'> &
    { data: { results: USER_TYPES.REST_Users['results'], info: USER_TYPES.REST_Result } }> => {
    
    const { data, status, statusText } = await axios.get(URLs.GET_USERS, {
        headers: {"Access-Control-Allow-Origin": "*"},
        params: {
            results: 15,
        }
    })
    return {
        data,
        status,
        statusText
    }
}