import { applyMiddleware, createStore } from 'redux'
import allReducers from './reducers'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

const store = createStore(allReducers, composedEnhancer)

export default store