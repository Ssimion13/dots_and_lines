import axios from 'axios'

let gameAxios = axios.create()

gameAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export const getGames = (daGames) => {
    return dispatch => {
        gameAxios.get('/api/games', daGames).then(response => {
            dispatch({
                type: "GET_GAMES",
                data: response.data
            })
        })
    }
}
export const getGame = (id) => {
    return dispatch => {
        gameAxios.get(`/api/games/${id}`).then(response => {
            dispatch({
                type: "LOAD_Game",
                data: response.data
            })
        })
    }
}

export const addGame = (newGame) => {
    return dispatch => {
        gameAxios.post('/api/games', newGame).then(response =>{
            dispatch({
                type: "NEW_GAME",
                data: response.data
            })
        })
    }
}

export const deleteGame = (id) => {
    return dispatch => {
        gameAxios.delete(`/api/games/${id}`).then(response => {
            dispatch({
                type: "DELETE_GAME",
                data: response.data
            })
        })
    }
}
export const getMoves = (daMoves) => {
    return dispatch => {
        gameAxios.get('/moves', daMoves).then(response => {
            dispatch({
                type: "GET_MOVES",
                data: response.data
            })
        })
    }
}

export const addMove = (gameId, newMove) => {
    return dispatch => {
        console.log(gameId, newMove);
        gameAxios.post(`/api/games/${gameId}/moves`, newMove).then(response =>{
            dispatch({
                type: "ADD_MOVE",
                data: response.data,
                gameId
            })
        })
    }
}

export default(state = [], action) => {
    switch(action.type){
        case "GET_GAMES":
            return action.data
        case "GET_GAME":
            return action.data
        case "NEW_GAME":
            return [...state, action.data]
        case "DELETE_GAME":
            return state.filter(item => item._id !== action.data._id)
        case "GET_MOVES":
            return action.data
        case "ADD_MOVE":
            const issCop = state.find(item => {
                return item._id === action.gameId
            })
            issCop.moves = action.data.moves
            const newStateChange = [...state]
            return newStateChange
        default: return state
    }
}
