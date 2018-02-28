import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'

const baralhos = [
    {
        titulo: 'Baralho 1',
        flashcards: 1
    },
    {
        titulo: 'Baralho 2',
        flashcards: 2
    },
    {
        titulo: 'Baralho 3',
        flashcards: 3
    },
    {
        titulo: 'Baralho 4',
        flashcards: 4
    },
    {
        titulo: 'Baralho 5',
        flashcards: 5
    },
    {
        titulo: 'Baralho 6',
        flashcards: 6
    },
    {
        titulo: 'Baralho 7',
        flashcards: 7
    },
    {
        titulo: 'Baralho 8',
        flashcards: 8
    },
    {
        titulo: 'Baralho 9',
        flashcards: 9
    },
    {
        titulo: 'Baralho 10',
        flashcards: 10
    }
]


export default class BaralhoLista extends React.Component {
    state = {
        baralhos: baralhos
    }
    
    toFlashcards = () => {
        this.props.navigation.dispatch(NavigationActions.navigate({routeName : 'Flashcards'}))
    }

    render() {

        const { baralhos } = this.state

        return (
            <View style={styles.container} >
                <ScrollView style={{ flex: 1}}>
                    {baralhos.map((baralho, key) =>
                        <TouchableOpacity key={key} style={styles.baralho} onPress={this.toFlashcards}>
                            <Text style={styles.baralhoTitulo}>
                                <FontAwesome name='chevron-circle-right' size={18} color='#3b3b3b' />{` ${baralho.titulo}`}
                            </Text>
                            <Text style={styles.baralhoFlashcards}>{baralho.flashcards} flashcards</Text>
                        </TouchableOpacity>
                    )}
                    <View style={{ height: 30 }}></View>
                </ScrollView>

                <TouchableOpacity style={styles.botaoAdd} onPress={this.toFlashcards}>
                    <Text>
                        <FontAwesome name='plus' size={15} color='#fff' />
                    </Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    baralho: {
        backgroundColor: '#fff37a',
        height: 100,
        borderRadius: 7,
        padding: 10,
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
        elevation: 2,
        justifyContent: 'flex-end',
    },
    baralhoTitulo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#3b3b3b',
    },
    baralhoFlashcards: {
        color: '#5c5c5c',
    },
    botaoAdd : {
        position: 'absolute',
        backgroundColor: '#ef0404',
        borderRadius: 30,
        paddingTop: 23,
        paddingBottom: 23,
        paddingRight: 25,
        paddingLeft: 25,
        bottom : 20,
        right: 25,
        elevation: 2,
    }
});

