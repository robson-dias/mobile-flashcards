import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Dimensions} from 'react-native';
import { connect } from 'react-redux'
import { receiveBaralhos } from '../actions'
import { fetchBaralhos, addCard, removeCard, updateCard, updateBaralho } from '../utils/api'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import Cards from './QuizCards'

class Quiz extends React.Component {

    state = {
        pagina: 1
    }

    componentDidMount() {
        this.props.fetch()
    }

    handleScroll = (event) => {
        const { x } = event.nativeEvent.contentOffset
        const window = Dimensions.get('window')

        let pagina = 1;

        if (x > 0) {
            pagina = Math.round(x / window.width) + 1
        }

        this.setState({ pagina })
    }

    render() {

        const { key } = this.props.navigation.state.params        
        const { cards } = this.props.baralhos[key] || {}

        return (
            <View style={styles.container}>
                
                <View style={styles.containerFlip} >
                    {Object.keys(cards).length > 0 ? 
                        <ScrollView 
                            horizontal={true} 
                            pagingEnabled={true} 
                            scrollsToTop={false} 
                            showsHorizontalScrollIndicator={false} 
                            onScroll={this.handleScroll}
                            scrollEventThrottle={16}
                        >
        
                            {Object.keys(cards).length > 0 && Object.keys(cards).map((cardKey) => 
                                <Cards
                                    key={cardKey}
                                    baralhoKey={key}
                                    cardKey={cardKey}
                                    pergunta={cards[cardKey].pergunta}
                                    resposta={cards[cardKey].resposta}
                                    toSetPergunta={this.setPergunta}
                                    toSetResposta={this.setResposta}
                                    removeCard={this.removeCard}
                                />  
                            )}
                                

                        </ScrollView>
                    : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='cards' size={200} color={'#CCC'} />
                            <Text style={{ color: '#CCC' }}>Nenhuma Carta Cadastrada.</Text>
                        </View>
                    }
                </View>

                <View style={styles.footer}>

                    <TouchableOpacity>
                        <MaterialIcons name='cancel' size={60} color={'#ef0404'}/>
                    </TouchableOpacity>   

                    <Text style={styles.numeroCartas}>
                        <Text>
                            {this.state.pagina}/{Object.keys(cards).length}{"\n"}
                            Cards
                        </Text>
                    </Text>

                    <TouchableOpacity>
                        <Ionicons name='ios-checkmark-circle' size={60} color={'green'}/>
                    </TouchableOpacity>   

                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    containerFlip: {
        flex: 5,
        backgroundColor: '#000',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
    },
    numeroCartas: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#fff',
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
        fetch: () => fetchBaralhos().then((baralhos) => dispatch(receiveBaralhos(baralhos))),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Quiz)

