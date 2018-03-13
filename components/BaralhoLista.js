import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux'
import { addBaralho, receiveBaralhos, deleteBaralho } from '../actions'
import { submitBaralho, fetchBaralhos, removeBaralho } from '../utils/api'
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import uuid from 'uuid'


class BaralhoLista extends React.Component {
    
    componentDidMount() {
        this.props.fetch()
    }

    toFlashcards = (key) => {

        const { baralhos } = this.props
        const { title } = baralhos[key]

        this.props.navigation.dispatch(NavigationActions.navigate({ routeName: 'Baralho', params: { title, key } }))

    }

    toAddFlashcards = () => {

        const key = uuid();

        const newBaralhos = Object.assign(this.props.baralhos, {[key] : {
            title: '',
            cards: [{
                pergunta: '',
                resposta: ''
            }]
        }})

        this.props.add(newBaralhos, indice, this.props.navigation)

    }

    toRemove = (key) => {

        Alert.alert(
            'Atenção!',
            `Deseja remover esse baralho? ${key}`,
            [
                { text: 'Não' },
                {
                    text: 'Sim', onPress: () => {
                        this.props.remove(key)
                    }
                },
            ],
            { cancelable: false }
        )

    }

    render() {

        const { baralhos } = this.props

        return (
            <View style={styles.container} >
                {Object.keys(baralhos).length > 0 ? 
                    <ScrollView style={{ flex: 1}}>
                        {Object.keys(baralhos).map((key) =>
                            <TouchableOpacity key={key} style={styles.baralho} onPress={() => this.toFlashcards(key)}>
                                
                                <TouchableOpacity onPress={() => this.toRemove(key)} style={styles.remove}>
                                    <FontAwesome name='trash' size={30} color={'#3b3b3b'} />
                                </TouchableOpacity>

                                <Text style={styles.baralhoTitulo}>
                                    <FontAwesome name='chevron-circle-right' size={18} color='#3b3b3b' />{` ${baralhos[key].title}`}
                                </Text>
                                <Text style={styles.baralhoFlashcards}>{baralhos[key].cards.length} flashcards</Text>
                            </TouchableOpacity>
                        )}
                        <View style={{ height: 30 }}></View>
                    </ScrollView>
                : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialCommunityIcons name='cards' size={200} color={'#CCC'} />
                        <Text style={{ color: '#CCC' }}>Nenhum baralho Cadastrado.</Text>
                    </View>
                }

                <TouchableOpacity style={styles.botaoAdd} onPress={this.toAddFlashcards}>
                    <Text>
                        <FontAwesome name='plus' size={15} color='#fff' />
                    </Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    baralho: {
        backgroundColor: '#fff37a',
        height: 100,
        borderRadius: 7,
        padding: 10,
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
        elevation: 2,
        justifyContent: 'flex-end',
    },
    baralhoTitulo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#3b3b3b',
    },
    baralhoFlashcards: {
        color: '#5c5c5c',
    },
    botaoAdd : {
        position: 'absolute',
        backgroundColor: '#ef0404',
        borderRadius: 30,
        paddingTop: 23,
        paddingBottom: 23,
        paddingRight: 25,
        paddingLeft: 25,
        bottom : 20,
        right: 25,
        elevation: 2,
    },
    remove : {
        position: 'absolute',
        right : 10,
        top: 10,
        zIndex : 99999,
        width: 40,
        height: 40,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

function mapStateToProps(baralhos) {
    
    return {
        baralhos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetch: () => fetchBaralhos().then((baralhos) => dispatch(receiveBaralhos(baralhos))),
        add: (baralhos, indice, navigation) => submitBaralho(baralhos).then(() => {
          
            const { title } = baralhos[indice]

            navigation.dispatch(NavigationActions.navigate({ routeName: 'Baralho', params: { title: title, key : indice } }))
            
        }),
        remove: (key) => removeBaralho(key).then((baralhos) => fetchBaralhos().then((baralhos) => dispatch(deleteBaralho(baralhos)))),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaralhoLista)