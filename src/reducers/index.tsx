import {combineReducers} from 'redux';
import accountReducer from './accountReducer'
import AppReducer from './AppReducer'

export const rootReducer =  combineReducers({
    accountReducer,
    AppReducer

}); 

export type AppState = ReturnType<typeof rootReducer >