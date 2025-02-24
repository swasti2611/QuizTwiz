import storiesReducer from "./stories";
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    stories: storiesReducer
})

export default allReducers;