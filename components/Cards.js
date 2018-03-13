import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, TextInput, Keyboard, Dimensions } from 'react-native';
import FlipCard from 'react-native-flip-card'
import { FontAwesome } from '@expo/vector-icons'

const {height, width} = Dimensions.get('window')

export default class Cards extends React.Component {

    state = {
        flip: false,
        edit: true
    }

    componentWillMount() {
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
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

    render() {

        const { indice, pergunta, resposta, removeCard, setResposta, setPergunta } = this.props
        const numberCard = indice + 1

        return (
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
                        <TouchableOpacity onPress={() => removeCard(indice)} style={styles.editButton}>
                            <FontAwesome name='trash' size={30} color={'#3b3b3b'} />
                        </TouchableOpacity>

                        <Text style={styles.titleBaralho}>Front {numberCard}</Text>

                        <TouchableOpacity onPress={this.onEdit} style={styles.editButton}>
                            <TouchableOpacity onPress={this.onEdit} style={styles.editButton}>
                                <FontAwesome name={this.state.edit === true ? 'check' : 'edit'} size={30} color={'#3b3b3b'} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>

                    {this.state.edit === false &&
                        <Text style={styles.text} onPress={this.onEdit}>
                        {pergunta}
                        </Text>
                    }
                    {this.state.edit === true &&
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(pergunta) => setPergunta({indice, pergunta})}
                            value={pergunta}
                            placeholder={'Insira uma Pergunta'}
                            placeholderTextColor={'#967800'}
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
                        <TouchableOpacity onPress={() => removeCard(indice)} style={styles.editButton}>
                            <FontAwesome name='trash' size={30} color={'#3b3b3b'} />
                        </TouchableOpacity>

                        <Text style={styles.titleBaralho}>Back {numberCard}</Text>

                        <TouchableOpacity onPress={this.onEdit} style={styles.editButton}>
                            <TouchableOpacity onPress={this.onEdit} style={styles.editButton}>
                                <FontAwesome name={this.state.edit === true ? 'check' : 'edit'} size={30} color={'#3b3b3b'} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    </View>

                    {this.state.edit === false &&
                        <Text style={styles.text} onPress={this.onEdit}>
                        {resposta}
                        </Text>
                    }
                    {this.state.edit === true &&
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(resposta) => setResposta({indice, resposta})}
                            value={resposta}
                            placeholder={'Insira uma Resposta'}
                            placeholderTextColor={'#967800'}
                        />
                    }

                    <View style={styles.rotateContainerButton}>
                        <TouchableOpacity onPress={this.onFlip} style={styles.rotateButton}>
                            <FontAwesome name='rotate-left' size={30} color={'#3b3b3b'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </FlipCard>
        )
    }
}

const styles = StyleSheet.create({
    flipCard: {
        borderColor: '#fff',
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
    }
})