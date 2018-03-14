import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, TextInput, Keyboard, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

const {height, width} = Dimensions.get('window')

export default class QuizResults extends React.Component {

    render() {

        const { totalPerguntas, totalRespostasCorretas } = this.props

        const result = Math.round((totalRespostasCorretas / totalPerguntas) * 100)


        return (
            <View>
                <View style={styles.flipCard}>
                    <Text style={styles.textResultDesc}>VOCÊ ACERTOU</Text>
                    <Text style={styles.textResult}>{result}%</Text>
                </View>

                <View style={styles.footer}>

                    <TouchableOpacity style={styles.restartButton}>
                        <MaterialCommunityIcons name='restart' size={60} color={'#fff85a'} />
                        <Text style={styles.textRestart}>Restart Quiz</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flipCard: {
        flex: 5,
        borderColor: '#000',
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    restartButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    baralho: {
        flex: 1,
        backgroundColor: '#fff37a',
        borderRadius: 7,
        padding: 10,
        margin: 60,
        marginBottom: 30,
        elevation: 2
    },
    rotateContainerButton: {
        flex: 1,
        flexDirection: 'column-reverse',
        alignItems: 'flex-end',
    },
    rotateButton: {
        width: 30,
        height: 30
    },
    editContainerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editButton: {
        width: 30,
        height: 30
    },
    textInput: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#3b3b3b',
        padding: 10
    },
    text: {
        flex: 6,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        color: '#3b3b3b',
        padding: 10,
    },
    titleBaralho: {
        padding: 10,
        color: '#878787',
        fontWeight: 'bold',
        color: '#967800'
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
    },
    textResultDesc: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
    textResult: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 100
    },
    textRestart: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    }
})