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
                </View>

                <View style={styles.footer}>

                    <TouchableOpacity onPress={this.onFlip} style={styles.rotateButton}>
                        <FontAwesome name='play-circle' size={60} style={styles.footerButtom} />
                    </TouchableOpacity>   

                    <TouchableOpacity onPress={this.onFlip} style={styles.rotateButton}>
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
        flex: 6,
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
        width: 60,
        height: 60
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
    }
})

