import React from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity } from 'react-native';
import FlipCard from 'react-native-flip-card'
import { FontAwesome } from '@expo/vector-icons'

export default class Flashcards extends React.Component {

    state = {
        flip: false
    }

    onFlip = () => {
        this.setState(function (state, props) {
            return {
                flip: state.flip === true ? false : true
            }
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <FlipCard style={styles.flipCard}
                    friction={6}
                    perspective={1000}
                    flipHorizontal={true}
                    flipVertical={false}
                    flip={this.state.flip}
                    clickable={false}
                >
                    
                    <View style={styles.baralho}>
                        <Text>Flashcards F</Text>
                        <View style={styles.rotateContainerButton}>
                            <TouchableOpacity onPress={this.onFlip} style={styles.rotateButton}>
                                <FontAwesome name='rotate-right' size={30} color={'#3b3b3b'} />
                            </TouchableOpacity>    
                        </View> 
                    </View>
                    <View style={styles.baralho}>
                        <Text>Flashcards B</Text>
                        <View style={styles.rotateContainerButton}>
                            <TouchableOpacity onPress={this.onFlip} style={styles.rotateButton}>
                                <FontAwesome name='rotate-left' size={30} color={'#3b3b3b'} />
                            </TouchableOpacity>   
                        </View> 
                    </View>

                </FlipCard>
                <View style={styles.footer}>
                    <Text>1/8 Cartas</Text>
                   
                    <TouchableOpacity style={styles.botaoAdd} onPress={this.toFlashcards}>
                        <Text>
                            <FontAwesome name='plus' size={15} color='#fff' />
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.botaoAdd} onPress={this.toFlashcards}>
                        <Text>
                            <FontAwesome name='plus' size={15} color='#fff' />
                        </Text>
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
        marginBottom: 160,
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
    footer: {
        height: 100,
        position: 'absolute',
        bottom: 0,
    },
    botaoAdd: {
        backgroundColor: '#ef0404',
        borderRadius: 30,
        paddingTop: 23,
        paddingBottom: 23,
        paddingRight: 25,
        paddingLeft: 25,
        elevation: 2
    }
})

