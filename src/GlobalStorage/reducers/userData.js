// import Cookies from "js-cookie"
// let token = Cookies.get("authtoken")
var initialState = null;

const userData = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            return (
                state = action.data
            )
        case "ADD_COINS":
            return {
                ...state,
                coins: action.data.coins
            }
        default: return state
    }
}


export default userData;