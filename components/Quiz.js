import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, Dimensions} from 'react-native';
import { connect } from 'react-redux'
import { receiveBaralhos } from '../actions'
import { fetchBaralhos } from '../utils/api'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import Cards from './QuizCards'
import QuizResult from './QuizResult'

class Quiz extends React.Component {

    state = {
        pagina: 1,
        totalPerguntas: 0,
        totalRespostasCorretas: 0

    }

    componentDidMount() {

        this.props.fetch().then(() => {
            const { key } = this.props.navigation.state.params  
            const { cards } = this.props.baralhos[key] || {}

            const totalPerguntas = Object.keys(cards).length

            this.setState({ totalPerguntas })
        })
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

    toNext = (isCorrect) => {
        const window = Dimensions.get('window')
        const scrollToPage = this.state.pagina * window.width        
        this.scrollView.scrollTo({ x: scrollToPage, y: 0, animated: true });

        if (isCorrect) {
            this.setState((state) => {
                return { totalRespostasCorretas: state.totalRespostasCorretas + 1 }
            })
        }
    }

    render() {

        const { key } = this.props.navigation.state.params        
        const { cards } = this.props.baralhos[key] || {}
        const { scrollToPage, pagina, totalPerguntas, totalRespostasCorretas } = this.state

        return (
            <View style={styles.container}>
                
                <View style={styles.containerFlip} >
                    {Object.keys(cards).length > 0 ? 
                        <ScrollView 
                            scrollEnabled={false}
                            horizontal={true} 
                            pagingEnabled={true} 
                            scrollsToTop={false} 
                            showsHorizontalScrollIndicator={false} 
                            onScroll={this.handleScroll}
                            scrollEventThrottle={16}
                            ref={ref => this.scrollView = ref}
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
                                    pagina={pagina}
                                    cardsTotal={totalPerguntas}
                                    toNext={this.toNext}
                                />  
                            )}
                                
                            <QuizResult 
                                totalPerguntas={totalPerguntas}
                                totalRespostasCorretas={totalRespostasCorretas}
                                navigation={this.props.navigation}
                            />

                        </ScrollView>
                    : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <MaterialCommunityIcons name='cards' size={200} color={'#CCC'} />
                            <Text style={{ color: '#CCC' }}>Nenhuma Carta Cadastrada.</Text>
                        </View>
                    }
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

