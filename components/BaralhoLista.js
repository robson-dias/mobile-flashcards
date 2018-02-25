import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons'

export default class BaralhoLista extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.baralho}>
            <Text style={styles.baralhoTitulo}>
                <FontAwesome name='chevron-circle-right' size={18} color='#3b3b3b' />{' '}Baralho 12
            </Text>
            <Text style={styles.baralhoFlashcards}>3 flashcards</Text>
        </View>
        <View style={styles.baralho}>
            <Text style={styles.baralhoTitulo}>
                <FontAwesome name='chevron-circle-right' size={18} color='#3b3b3b' />{' '}Baralho 12
            </Text>
            <Text style={styles.baralhoFlashcards}>3 flashcards</Text>
        </View>
        <View style={styles.baralho}>
            <Text style={styles.baralhoTitulo}>
                <FontAwesome name='chevron-circle-right' size={18} color='#3b3b3b' />{' '}Baralho 12
            </Text>
            <Text style={styles.baralhoFlashcards}>3 flashcards</Text>
        </View>
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
