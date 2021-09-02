import { applyMiddleware, createStore, combineReducers } from "redux";
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { usersReducer } from "./users/users.reducer";



const rootReducer = combineReducers({
  users: usersReducer,
})

export type RootState = ReturnType<typeof rootReducer>

const middlewares = [logger, thunkMiddleware],
      middlewareEnhancer = applyMiddleware(...middlewares),
      composedEnhancers = composeWithDevTools(middlewareEnhancer)

export const store = createStore(rootReducer, composedEnhancers)

