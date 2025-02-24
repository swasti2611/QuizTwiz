const storiesState = {}

const storiesReducer = (state = storiesState, action) => {
    switch (action.type) {
        case 'UPDATE_STORIES':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

export default storiesReducer;