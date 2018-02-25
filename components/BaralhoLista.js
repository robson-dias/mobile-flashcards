import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'

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
    }
]

export default class BaralhoLista extends React.Component {
    state = {
        baralhos: baralhos
    }
    
  render() {

    const { baralhos } = this.state

    return (
      <View style={styles.container}>
        
        {baralhos.map((baralho, key) => 
            <View key={key} style={styles.baralho}>
                <Text style={styles.baralhoTitulo}>
                        <FontAwesome name='chevron-circle-right' size={18} color='#3b3b3b' />{` ${baralho.titulo}`}
                </Text>
                <Text style={styles.baralhoFlashcards}>{baralho.flashcards} flashcards</Text>
            </View>
        )}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    baralho: {
        backgroundColor: '#ffff80',
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
    }
});
