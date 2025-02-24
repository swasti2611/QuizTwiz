const addUser = (data) => {
    return {
        type: "ADD_USER",
        data: data
    }
}

const addCoins = (data) => {
    return {
        type: "ADD_COINS",
        data: data
    }
}


export { addUser , addCoins };