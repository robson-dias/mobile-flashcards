import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import BaralhoLista from './components/BaralhoLista'
import Flashcards from './components/Flashcards'

function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Drawer = DrawerNavigator({
  BaralhoLista: {
    screen: BaralhoLista,
    navigationOptions:({navigation}) => ({
        title: "Lista de Baralhos",
        headerLeft:(
          <TouchableOpacity onPress={() => navigation.navigate("DrawerOpen")}>
            <Ionicons name='md-menu' size={30} />
          </TouchableOpacity>
        ),
        headerStyle: { paddingRight: 10, paddingLeft: 10 }
    })
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Drawer,
  },
  Flashcards: {
    screen: Flashcards
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppStatusBar backgroundColor='#363636' barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}
