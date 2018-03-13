import { AsyncStorage } from 'react-native'

export const FLASHMOBILE_STORAGE_KEY = 'Robson:flashmobile'

export function fetchBaralhos() {
    AsyncStorage.clear()

    return AsyncStorage.getItem(FLASHMOBILE_STORAGE_KEY)
        .then((baralhos) => {
            return JSON.parse(baralhos)
        })
}

export function submitBaralho(baralhos) {
    
    return AsyncStorage.setItem(FLASHMOBILE_STORAGE_KEY, JSON.stringify(baralhos))
}

