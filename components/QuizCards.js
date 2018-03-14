import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, TextInput, Keyboard, Dimensions } from 'react-native';
import FlipCard from 'react-native-flip-card'
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons'

const {height, width} = Dimensions.get('window')

export default class QuizCards extends React.Component {

    state = {
        flip: false,
        edit: false,
        pergunta: '',
        resposta: ''
    }

    componentWillMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

        const { pergunta, resposta } = this.props

        let edit = false

        if (!pergunta) {
            let edit = true
        }

        this.setState({ 
            edit,
            pergunta,
            resposta
        })
    }

    componentWillUnmount() {
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide = () => {
        this.setState({ edit: false })
    }

    onFlip = () => {
        this.setState(function (state, props) {
            return {
                flip: state.flip === true ? false : true
            }
        });
    }

    onEdit = () => {
        this.setState(function (state, props) {
            return {
                edit: state.edit === true ? false : true
            }
        });
    }

    setPergunta = (props) => {
        const { baralhoKey, cardKey, pergunta } = props

        this.setState({ pergunta })

        this.props.toSetPergunta({baralhoKey, cardKey, pergunta})
    }

    setResposta = (props) => {

        const { baralhoKey, cardKey, resposta } = props

        this.setState({ resposta })

        this.props.toSetResposta({baralhoKey, cardKey, resposta})
    }

    render() {

        const { baralhoKey, cardKey, removeCard, pagina, cardsTotal, toNext } = this.props
        const { pergunta, resposta } = this.state

        return (
            <View>
                <FlipCard style={styles.flipCard}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={this.state.flip}
                    clickable={false}
                >

                    <View style={styles.baralho}>
                        <View style={styles.editContainerButton}>
                            <Text style={styles.titleBaralho}>Front</Text>
                        </View>

                    
                        <Text style={styles.text}>
                            {pergunta || <Text style={{ color: '#967800'}}>{'Nenhuma pergunta inserida'}</Text> }
                        </Text>
                        

                        <View style={styles.rotateContainerButton}>
                            <TouchableOpacity onPress={this.onFlip} style={styles.rotateButton}>
                                <FontAwesome name='rotate-right' size={30} color={'#3b3b3b'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.baralho}>
                        <View style={styles.editContainerButton}>
                            <Text style={styles.titleBaralho}>Back</Text>
                        </View>

                        <Text style={styles.text}>
                            {resposta || <Text style={{ color: '#967800' }}>{'Nenhuma resposta inserida'}</Text>}
                        </Text>

                        <View style={styles.rotateContainerButton}>
                            <TouchableOpacity onPress={this.onFlip} style={styles.rotateButton}>
                                <FontAwesome name='rotate-left' size={30} color={'#3b3b3b'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                </FlipCard>

                <View style={styles.footer}>

                    <TouchableOpacity onPress={() => toNext()}>
                        <MaterialIcons name='cancel' size={60} color={'#ef0404'} />
                    </TouchableOpacity>

                    <Text style={styles.numeroCartas}>
                        <Text>
                            {pagina}/{cardsTotal}{"\n"}
                            Cards
                            </Text>
                    </Text>

                    <TouchableOpacity onPress={() => toNext()}>
                        <Ionicons name='ios-checkmark-circle' size={60} color={'green'} />
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
    numeroCartas: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#fff',
    },
})