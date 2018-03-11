import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import { receiveBaralhos } from '../actions'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'

const baralhosData = [
    {
        title: 'Titulo FlashCards',
        cards: [{
            pergunta: 'Pergunta 1',
            resposta: 'Resposta 1'
        },
        {
            pergunta: 'Pergunta 2',
            resposta: 'Resposta 2'
        },
        {
            pergunta: 'Pergunta 3',
            resposta: 'Resposta 3'
        }]
    },
    {
        title: 'Titulo FlashCards 2',
        cards: [{
            pergunta: 'Pergunta 1',
            resposta: 'Resposta 1'
        },
        {
            pergunta: 'Pergunta 2',
            resposta: 'Resposta 2'
        },
        {
            pergunta: 'Pergunta 3',
            resposta: 'Resposta 3'
        }]
    }
]


class BaralhoLista extends React.Component {
    
    componentDidMount() {
        const { dispatch } = this.props

        dispatch(receiveBaralhos(baralhosData))
    }

    toFlashcards = (baralho) => {
        
        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Baralho', params: { title: baralho.title }}))
    }

    render() {

        const { baralhos } = this.props


        return (
            <View style={styles.container} >
                {baralhos.length > 0 ? 
                    <ScrollView style={{ flex: 1}}>
                        {baralhos.map((baralho, key) =>
                            <TouchableOpacity key={key} style={styles.baralho} onPress={() => this.toFlashcards(baralho)}>
                                <Text style={styles.baralhoTitulo}>
                                    <FontAwesome name='chevron-circle-right' size={18} color='#3b3b3b' />{` ${baralho.title}`}
                                </Text>
                                <Text style={styles.baralhoFlashcards}>{baralho.cards.length} flashcards</Text>
                            </TouchableOpacity>
                        )}
                        <View style={{ height: 30 }}></View>
                    </ScrollView>
                : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='cards' size={200} color={'#CCC'} />
                        <Text style={{ color: '#CCC' }}>Nenhum baralho Cadastrado.</Text>
                    </View>
                }

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

function mapStateToProps(baralhos) {
    return {
        baralhos
    }
}

export default connect(
    mapStateToProps,
)(BaralhoLista)