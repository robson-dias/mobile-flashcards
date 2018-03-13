import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Dimensions} from 'react-native';
import { connect } from 'react-redux'
import { receiveBaralhos } from '../actions'
import { fetchBaralhos, addCard, removeCard, updateCard } from '../utils/api'
import { FontAwesome, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import Cards from './Cards'

class Baralho extends React.Component {

    state = {
        scrollToEnd : false,
        pagina: 1
    }

    componentDidMount() {
        this.setState({ scrollToEnd : false})
        this.props.fetch()
    }

    setTitle = (title) => {
        this.setState({ title })
    }

    setPergunta = (props) => {
        const { baralhoKey, cardKey, pergunta } = props
        this.props.alterarCartao(baralhoKey, cardKey, { pergunta })
    }

    setResposta = (props) => {
        const { baralhoKey, cardKey, resposta } = props
        this.props.alterarCartao(baralhoKey, cardKey, { resposta })
    }

    removeCard = (baralhoKey, cardKey) => {

        Alert.alert(
            'Atenção!',
            `Deseja remover esse cartão?`,
            [
                { text: 'Não' },
                { text: 'Sim', onPress: () => {
                    this.setState({ scrollToEnd: true })
                    this.props.remove(baralhoKey, cardKey)
                } },
            ],
            { cancelable: false }
        )

    }

    toAddCard = (key) => {
        this.setState({ scrollToEnd: true })
        this.props.add(key)
    }

    handleScroll = (event) =>{
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
                            ref={ref => this.scrollView = ref}
                            onContentSizeChange={(contentWidth, contentHeight) => {
                                this.scrollView.scrollToEnd({ animated: this.state.scrollToEnd });
                            }}
                            onScroll={this.handleScroll}
                            scrollEventThrottle={16}
                        >
        
                            {Object.keys(cards).length > 0 && Object.keys(cards).map((cardKey) => 
                                <Cards
                                    key={cardKey}
                                    baralhoKey={key}
                                    cardKey={cardKey}
                                    setTitle={this.setTitle}
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
                        <FontAwesome name='play-circle' size={60} style={styles.footerButtom}/>
                    </TouchableOpacity>   

                    <Text style={styles.numeroCartas}>
                        <Text>
                            {this.state.pagina}/{Object.keys(cards).length}{"\n"}
                            Flashcards
                        </Text>
                    </Text>

                    <TouchableOpacity onPress={() => this.toAddCard(key)}>
                        <Ionicons name='ios-add-circle' size={60} style={styles.footerButtom}/>
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
        fetch: () => fetchBaralhos().then((baralhos) => dispatch(receiveBaralhos(baralhos))),
        add: (key) => addCard(key).then((baralhos) => fetchBaralhos().then((baralhos) => dispatch(receiveBaralhos(baralhos)))),
        remove: (baralhoKey, cardKey) => removeCard(baralhoKey, cardKey).then((baralhos) => fetchBaralhos().then((baralhos) => dispatch(receiveBaralhos(baralhos)))),
        alterarCartao: (baralhoKey, cardKey, data) => updateCard(baralhoKey, cardKey, data).then((baralhos) => fetchBaralhos().then((baralhos) => dispatch(receiveBaralhos(baralhos)))),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Baralho)

