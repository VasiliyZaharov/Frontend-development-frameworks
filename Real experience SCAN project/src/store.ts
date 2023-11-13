import { createStore, applyMiddleware } from 'redux';
import authReducer from './reducers/reduser'
import searchDataReducer from './reducers/searchReducer'
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {RootState} from "./types";


const rootReducer = combineReducers<RootState>({
    auth: authReducer,
    searchData: searchDataReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk));
export default store;

export type RootReducerType = ReturnType<typeof rootReducer>;