import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import FlipCard from 'react-native-flip-card'

export default class Flashcards extends React.Component {

    render() {

        return (
            <View style={styles.container}>
                <FlipCard style={styles.flipCard}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={false}
                >
                    <View style={styles.baralho}><Text>Flashcards F</Text></View>
                    <View style={styles.baralho}><Text>Flashcards B</Text></View>
                </FlipCard>
                <View style={styles.footer}>
                    <Text>Rodape</Text>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    flipCard: {
        borderColor: '#fff',
    },
    baralho: {
        flex: 1,
        width: 250,
        backgroundColor: '#fff37a',
        borderRadius: 7,
        padding: 10,
        margin: 60,
        marginBottom: 160,
        elevation: 2
    },
    footer: {
        height: 100,
        position: 'absolute',
        bottom: 0
    }
});

