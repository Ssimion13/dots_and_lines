import axios from "axios"

export function signup(userInfo) {
    return dispatch => {
        axios.post("/auth/signup", userInfo).then(response => {
            const {token, user} = response.data
            localStorage.token = token
            localStorage.user = JSON.stringify(user)
            dispatch(authenticate(user))
            })
            .catch(err => {
                console.error(err);
                dispatch(signupError("signup", err.response.status))
            })
    }
}
export function login(credentials) {
    return dispatch => {
        axios.post("/auth/login", credentials).then(response => {
            const {token, user} = response.data
            localStorage.token = token
            localStorage.user = JSON.stringify(user)
            dispatch(authenticate(user))
            })
            .catch(err => {
                console.error(err);
            })
    }
}

export function verify(user){
    return dispatch => {
        axios.post("/auth/verify", user).then((response) => {
            let user = response.data
            dispatch(authenticate(user))
        })
        .catch((err) => {
            console.error(err)
        })
    }
}

export function logout(){
    delete localStorage.token
    delete localStorage.user
    return{
        type: "LOGOUT"
    }
}

export function authenticate(user){
    return {
        type: "AUTHENTICATE",
        user
    }
}

const initialState = {
    games:[],
    user: {
        username: "",
        isAdmin: false,
        _id: ""
    },
    authErrCode:{
        signup: "",
        signin: ""
    },
    isAuthenticated: false
}

export default function reducer(state = initialState, action){
    switch (action.type){
        case "SIGNUP_ERROR":
            return {
                ...state,
                authErrCode:{
                    ...state.authErrCode,
                    [action.key]: action.errCode
                }
            }
        case "AUTHENTICATE":
            return{
                ...state,
                ...action.user,
                isAuthenticated: true,
                authErrCode:{
                    signup: "",
                    signin: ""
                }
        }
        case "LOGOUT":
            return initialState
        default:
            return state
    }
}

export function signupError(key, errCode){
    return{
        type: "SIGNUP_ERROR",
        key,
        errCode
    }
}
