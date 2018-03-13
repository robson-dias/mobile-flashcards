import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { connect } from 'react-redux'
import { receiveBaralhos } from '../actions'
import { fetchBaralhos } from '../utils/api'
import { FontAwesome } from '@expo/vector-icons'
import Cards from './Cards'

class Baralho extends React.Component {

    componentDidMount() {
        this.props.fetch()
    }

    setTitle = (title) => {
        this.setState({ title })
    }

    setPergunta = (props) => {
        const { indice, pergunta } = props

        const cards = this.state.cards.map((card, indiceCard) => indiceCard === indice ? { ...card, pergunta: pergunta } : card)

        this.setState({ cards })
    }

    setResposta = (props) => {
        const { indice, resposta } = props

        const cards = this.state.cards.map((card, indiceCard) => indiceCard === indice ? { ...card, resposta: resposta } : card)

        this.setState({ cards })
    }

    removeCard = (indice) => {
        const { cards } = this.state

        Alert.alert(
            'Atenção!',
            'Deseja remover esse cartão?',
            [
                { text: 'Não' },
                { text: 'Sim', onPress: () => {
                    const newCards = cards.filter((card, indiceCard) => indiceCard !== indice)

                    this.setState({ cards: newCards })
                } },
            ],
            { cancelable: false }
        )

    }

    render() {

        const { key } = this.props.navigation.state.params        
        const { cards } = this.props.baralhos[key] || {}

        return (
            <View style={styles.container}>
                
                <View style={styles.containerFlip} >
                    <ScrollView horizontal={true} pagingEnabled={true} scrollsToTop={false} showsHorizontalScrollIndicator={false}>
                        
                        {cards.length === 0 && <FontAwesome name='play-circle' size={60} style={styles.footerButtom} />}

                        {cards.length > 0 && cards.map((card, indice) => 
                            <Cards
                                key={indice}
                                indice={indice}
                                setTitle={this.setTitle}
                                pergunta={card.pergunta}
                                setPergunta={this.setPergunta}
                                resposta={card.resposta}
                                setResposta={this.setResposta}
                                removeCard={this.removeCard}
                            />  
                        )}
                            

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


function mapStateToProps(baralhos) {

    return {
        baralhos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetch: () => fetchBaralhos().then((baralhos) => dispatch(receiveBaralhos(baralhos)))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Baralho)

