import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'
import { submitBaralho, fetchBaralhos } from '../utils/api'
import { receiveBaralhos } from '../actions'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Entypo } from '@expo/vector-icons'
import uuid from 'uuid'

class BaralhoAdd extends React.Component {

    state = {
        title : ''
    }

    setTitle = (title) => {
        this.setState(title)        
    }

    saveTitle = () => {

        if (!this.state.title) {
            alert('O campo título é obrigatório.')
        } else {
            const indice = uuid()

            const newBaralhos = Object.assign(this.props.baralhos, {
                [indice]: {
                    title: this.state.title,
                    cards: {}
                }
            })

            this.props.add(newBaralhos, indice, this.props.navigation)
        }

    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.body}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={'Insira um Título'}
                        onChangeText={(title) => this.setTitle({ title })}
                    />
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        onPress={() => this.saveTitle()}
                    >
                        <Entypo name='save' size={60} style={styles.footerButtom} />
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
    body: {
        flex: 5,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#3b3b3b',
        padding: 10,
        width: '100%'
    },
    footerButtom: {
        color: '#ef0404',
        elevation: 2,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 50,
    },
})


function mapStateToProps(baralhos) {

    return {
        baralhos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        add: (baralhos, indice, navigation) => submitBaralho(baralhos).then(() => {

            const { title } = baralhos[indice]
            
            navigation.dispatch(NavigationActions.back({ routeName: 'BaralhoAdd' }))
            navigation.dispatch(NavigationActions.navigate({ routeName: 'Baralho', params: { title: title, key: indice } }))

            fetchBaralhos()
                .then((baralhos) => dispatch(receiveBaralhos(baralhos)))
        })
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BaralhoAdd)

