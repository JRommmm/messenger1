import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import user from "./user";

// will be addign more reducers later
const reducer = combineReducers({ user });

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
