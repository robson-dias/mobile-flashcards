import { ADD_BARALHO, RECEIVE_BARALHOS } from '../actions'

function baralhos(state = {}, action) {

    switch (action.type) {
        case RECEIVE_BARALHOS:
            return [
                ...state,
                ...action.baralhos,
            ]
        case ADD_BARALHO:
            return {
                ...state,
                ...action.baralho
            }
        default:
            return state
    }
}

export default baralhos