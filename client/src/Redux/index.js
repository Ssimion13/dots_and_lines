import thunk from 'redux-thunk'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import games from './games'
import user from './auth'

const rootReducer = combineReducers({
    games,
    user
})

export default createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
