import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import Baralho from './Baralho'

export default class Flashcards extends React.Component {

    state = {
        title: 'Titulo FlashCards',
        pergunta: 'Sera? ',
        resposta: 'Sim!',
    }

    setPergunta = (pergunta) => this.setState({ pergunta })
    setResposta = (resposta) => this.setState({ resposta })

    render() {

        return (
            <View style={styles.container}>
                
                <View style={styles.containerFlip} >
                    <ScrollView horizontal={true} pagingEnabled={true} scrollsToTop={false} showsHorizontalScrollIndicator={false}>
                            <Baralho 
                                pergunta={this.state.pergunta} 
                                setPergunta={this.setPergunta} 
                                resposta={this.state.resposta}
                                setResposta={this.setResposta} 
                                />

                                <Baralho 
                                pergunta={this.state.pergunta} 
                                setPergunta={this.setPergunta} 
                                resposta={this.state.resposta}
                                setResposta={this.setResposta} 
                                />

                                <Baralho 
                                pergunta={this.state.pergunta} 
                                setPergunta={this.setPergunta} 
                                resposta={this.state.resposta}
                                setResposta={this.setResposta} 
                                />

                    </ScrollView>
                </View>

                <View style={styles.footer}>

                    <TouchableOpacity>
                        <FontAwesome name='play-circle' size={60} style={styles.footerButtom} />
                    </TouchableOpacity>   

                    <Text style={styles.numeroCartas}>
                        <Text>
                            1/6{"\n"}
                            Flashcards
                        </Text>
                    </Text>

                    <TouchableOpacity>
                        <FontAwesome name='plus-circle' size={60} style={styles.footerButtom} />
                    </TouchableOpacity>   

                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerFlip: {
        flex: 5,
        backgroundColor: '#fff',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
    },
    footerButtom: {
        color: '#ef0404',
        elevation: 2,
    },
    numeroCartas: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#3b3b3b',
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
    }
})

