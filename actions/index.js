export const ADD_BARALHO = 'ADD_BARALHO'
export const RECEIVE_BARALHOS = 'RECEIVE_BARALHOS'

export function receiveBaralhos(baralhos) {
    return {
        type: RECEIVE_BARALHOS,
        baralhos
    }
}

export function addBaralho(baralho) {
    return {
        type: ADD_BARALHO,
        baralho
    }
}