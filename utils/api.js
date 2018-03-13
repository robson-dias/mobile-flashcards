import { AsyncStorage } from 'react-native'
import uuid from 'uuid'

export const FLASHMOBILE_STORAGE_KEY = 'Robson:flashmobile'

export function fetchBaralhos() {
    //AsyncStorage.clear()

    return AsyncStorage.getItem(FLASHMOBILE_STORAGE_KEY)
        .then((baralhos) => {
            return JSON.parse(baralhos)
        })
}

export function submitBaralho(baralhos) {
    
    return AsyncStorage.setItem(FLASHMOBILE_STORAGE_KEY, JSON.stringify(baralhos))
}

export function removeBaralho(key) {
    return AsyncStorage.getItem(FLASHMOBILE_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(FLASHMOBILE_STORAGE_KEY, JSON.stringify(data))
        })
}

export function updateBaralho(key, dados) {
    return AsyncStorage.getItem(FLASHMOBILE_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)

            data[key] = {
                ...data[key],
                ...dados
            }

            AsyncStorage.setItem(FLASHMOBILE_STORAGE_KEY, JSON.stringify(data))
        })
}

export function addCard(key) {
    return AsyncStorage.getItem(FLASHMOBILE_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)

            data[key].cards = {
                ...data[key].cards,
                [uuid()] : {
                    pergunta: '',
                    resposta: ''
                }
            }

            AsyncStorage.setItem(FLASHMOBILE_STORAGE_KEY, JSON.stringify(data))
        })
}

export function removeCard(baralhoKey, cardKey) {
    return AsyncStorage.getItem(FLASHMOBILE_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)

            data[baralhoKey].cards[cardKey] = undefined
            delete data[baralhoKey].cards[cardKey]

            AsyncStorage.setItem(FLASHMOBILE_STORAGE_KEY, JSON.stringify(data))
        })
}

export function updateCard(baralhoKey, cardKey, dados) {
    return AsyncStorage.getItem(FLASHMOBILE_STORAGE_KEY)
        .then((results) => {
            const data = JSON.parse(results)

            data[baralhoKey].cards[cardKey] = {
                ...data[baralhoKey].cards[cardKey],
                ...dados
            }

            AsyncStorage.setItem(FLASHMOBILE_STORAGE_KEY, JSON.stringify(data))
        })
}


