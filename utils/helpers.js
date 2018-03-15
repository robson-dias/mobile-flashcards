import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'Flashcards:notifications'

function createNotification(quiz) {
    return {
        title: 'Olá!',
        body: `Não esqueça de completar o Quiz de ${quiz}.`,
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}


export function setLocalNotification(quiz) {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let now = new Date().getTime()

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(quiz),
                                {
                                    time: now + (60000 / 4),
                                    repeat: 'day',
                                }
                            )


                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}