import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import FlipCard from 'react-native-flip-card'
import { FontAwesome } from '@expo/vector-icons'

export default class Flashcards extends React.Component {

    state = {
        flip: false,
        title: 'Titulo FlashCards',
        pergunta: 'Sera? ',
        resposta: 'Sim!',
        edit: false
    }

    componentWillMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {        
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide = () => {
        this.setState({edit: false})
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

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.containerFlip}>
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
                                <TouchableOpacity onPress={this.onEdit} style={styles.editButton}>
                                    <FontAwesome name='remove' size={30} color={'#3b3b3b'} />
                                </TouchableOpacity>

                                <Text style={styles.titleBaralho}>Front</Text>

                                <TouchableOpacity onPress={this.onEdit} style={styles.editButton}>
                                    <FontAwesome name='edit' size={30} color={'#3b3b3b'} />
                                </TouchableOpacity>
                            </View> 

                            {this.state.edit === false &&
                                <Text style={styles.text} onPress={this.onEdit}>
                                    {this.state.pergunta}
                                </Text>
                            }
                            {this.state.edit === true &&
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(pergunta) => this.setState({ pergunta })}
                                    value={this.state.pergunta}
                                />
                            }

                            <View style={styles.rotateContainerButton}>
                                <TouchableOpacity onPress={this.onFlip} style={styles.rotateButton}>
                                    <FontAwesome name='rotate-right' size={30} color={'#3b3b3b'} />
                                </TouchableOpacity>    
                            </View> 
                        </View>
                        <View style={styles.baralho}>
                            <View style={styles.editContainerButton}>
                                <TouchableOpacity onPress={this.onEdit} style={styles.editButton}>
                                    <FontAwesome name='remove' size={30} color={'#3b3b3b'} />
                                </TouchableOpacity>

                                <Text style={styles.titleBaralho}>Back</Text>

                                <TouchableOpacity onPress={this.onEdit} style={styles.editButton}>
                                    <FontAwesome name='edit' size={30} color={'#3b3b3b'} />
                                </TouchableOpacity>
                            </View> 

                            {this.state.edit === false &&
                                <Text style={styles.text} onPress={this.onEdit}>
                                    {this.state.resposta}
                                </Text>
                            }
                            {this.state.edit === true &&
                                <TextInput
                                    style={styles.textInput}
                                    onChangeText={(resposta) => this.setState({ resposta })}
                                    value={this.state.resposta}
                                />
                            }

                            <View style={styles.rotateContainerButton}>
                                <TouchableOpacity onPress={this.onFlip} style={styles.rotateButton}>
                                    <FontAwesome name='rotate-left' size={30} color={'#3b3b3b'} />
                                </TouchableOpacity>
                            </View> 
                        </View>

                    </FlipCard>
                </View>

                <View style={styles.footer}>

                    <TouchableOpacity onPress={this.onFlip}>
                        <FontAwesome name='play-circle' size={60} style={styles.footerButtom} />
                    </TouchableOpacity>   

                    <Text style={styles.numeroCartas}>
                        <Text>
                            1/6{"\n"}
                            Flashcards
                        </Text>
                    </Text>

                    <TouchableOpacity onPress={this.onFlip}>
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
        alignItems: 'center',
    },
    flipCard: {
        borderColor: '#fff',
    },
    baralho: {
        flex: 1,
        width: 250,
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

