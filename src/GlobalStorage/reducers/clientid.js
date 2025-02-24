var initialState = null;

const clientId = (state = initialState, action) => {
    switch (action.type) {
        case "Client_ID":
            return (
                state = action.data
            )
       
        default: return state
    }
}


export default clientId;