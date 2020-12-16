import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunkMiddleware from "redux-thunk";

import user from "./user";
import conversations from "./conversations";

const reducer = combineReducers({ user, conversations });

export default createStore(reducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
