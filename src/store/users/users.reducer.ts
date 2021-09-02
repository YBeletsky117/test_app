import ACTION_TYPES from './users.constants';
import { initialState } from './users.initialState';


const handleReducers = {
    [ACTION_TYPES.STATE_LOAD]:
        (state: USER_TYPES.State, stateLoading: boolean): USER_TYPES.State => ({
                ...state,
                    isLoaded: stateLoading
            }),
    [ACTION_TYPES.WRITE_TO_STORE_USERS]:
        (state: USER_TYPES.State,
            users: USER_TYPES.Users['results']): USER_TYPES.State => ({
                ...state,
                users
        }),
    [ACTION_TYPES.ADD_USERS]: (state: USER_TYPES.State, UserInfo: USER_TYPES.UserInfo) => ({
        ...state,
        users: state.users?.push(UserInfo)
    }),
    [ACTION_TYPES.DELETE_USER]: (state: USER_TYPES.State, id: number) => ({
        ...state,
        users: state.users?.filter((user) => user.id !== id)
    }),
    DEF: (state: USER_TYPES.State): USER_TYPES.State => state,
    },
    usersReducer = (
        state: USER_TYPES.State = initialState,
        action: any,
    ): USER_TYPES.State => {
        return (handleReducers[action.type] || handleReducers.DEF)(state, action.data)
    }   

export { usersReducer }
