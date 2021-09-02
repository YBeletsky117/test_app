

/**
 * It's namespace for users from REST Request @ Randomuser
 * 
 * @param Users Array with users from the request [UserInfo]
 * 
 * @param UserInfo Detailed user information
 * 
 * @param REST_Result Details of the result of the request for RandomUser
 * 
 */

declare namespace USER_TYPES {
    export type REST_Users = {
        results: REST_UserInfo[]
    }
    export type Users = {
        results: UserInfo[]
    }
    export type REST_UserInfo = {
        name: {
            first: String,
            last: String,
        },
        location: {
            city: String,
            country: String,
        },
        email: String,
        registered: {
            date: Date,
        },
        phone: String,
        picture: {
            large: String,
        },
    }
    export type UserInfo = {
        firstName: String,
        lastName: String,
        location: {
            country: String,
            city: String
        },
        email: String,
        phone: String,
        registered: string,
        icon: string,
        id: number
    }

    export type REST_Result = {
        info: {
            seed: String,
            results: Number,
            page: Number,
            version: String
        }
    }

    export type State = {
        users?: USER_TYPES.Users['results'],
        isLoaded?: boolean
    }
}

