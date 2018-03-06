import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Easing, Animated, TextInput } from 'react-native';
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import BaralhoLista from './components/BaralhoLista'
import Flashcards from './components/Flashcards'

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
    screen: Flashcards,
    navigationOptions: ({ navigation }) => ({
      headerTitle: <TextInput style={{ width: 250, padding: 10, fontSize: 16, }} />
    })
  }
},
{
  transitionConfig: () => ({
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateX = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateX }] };
    },
  }),
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MainNavigator />
      </View>
    );
  }
}
