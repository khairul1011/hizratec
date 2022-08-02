const initialState = {
    isLogin: false,
    user: [],
    // level: '',
    // status: '',
    // token: ''
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLogin: true,
                user: action.payload,
                // level: action.level,
                // status: action.status,
                // token: action.token
            }
        case "LOGOUT":
            return {
                ...state,
                isLogin: false,
                user: [],
                // level: '',
                // status: '',
                // token: ''
            }
        default:
            return state
    }
}

export default userReducer