let initialState = false

const refreshUser = (state = initialState, action) => {
    switch (action.type) {
        case "REFRESH":
            return (
                state = !state
            )

        default: return state
    }
}


export default refreshUser;