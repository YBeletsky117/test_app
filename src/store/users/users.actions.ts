import ACTION_TYPES from "./users.constants";
import { getUsers } from "../../API";

export const ACTIONS = {
    writeUsersToStore: (users) => ({
        type: ACTION_TYPES.WRITE_TO_STORE_USERS,
        data: users
    }),
    stateLoadingUsers: (state) => ({
        type: ACTION_TYPES.STATE_LOAD,
        data: state
    }),
    getUsersAction: () => async (dispatch) => {
        dispatch(ACTIONS.stateLoadingUsers(false))
        try {
            const response = await getUsers(),
                users = response.data.results.map(({
                    name,
                    picture,
                    location,
                    email,
                    phone,
                    registered
                }, index) => ({
                    firstName: name.first,
                    lastName: name.last,
                    location: {
                        country: location.country,
                        city: location.city
                    },
                    email,
                    phone,
                    registered: new Date(registered.date).toLocaleDateString(),
                    icon: picture.large,
                    id: +Date.now().toString() + index
                }))
            dispatch(ACTIONS.writeUsersToStore(users))
            dispatch(ACTIONS.stateLoadingUsers(true))
        }
        catch ({errorMessage}) {
            dispatch(ACTIONS.stateLoadingUsers(true))
            return console.error(errorMessage);
        }
    },
    deleteUser: (id) => ({
        type: ACTION_TYPES.DELETE_USER,
        data: id
    }),
    addUser: (userInfo) => ({
            type: ACTION_TYPES.ADD_USER,
            data: userInfo
    })
}