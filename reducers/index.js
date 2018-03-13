import { ADD_BARALHO, RECEIVE_BARALHOS, DELETE_BARALHO } from '../actions'

function baralhos(state = {}, action) {

    switch (action.type) {
        case RECEIVE_BARALHOS:
           
            return {
                ...state,
                ...action.baralhos,
            }

        case DELETE_BARALHO:

            return action.baralhos

        case ADD_BARALHO:

            return {
                ...state,
                ...action.baralho,
            }

        default:
            return state
    }
}

export default baralhos