import React from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Easing, Animated, TextInput } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { DrawerNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import BaralhoLista from './components/BaralhoLista'
import BaralhoAdd from './components/BaralhoAdd'
import Baralho from './components/Baralho'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'


const MainNavigator = StackNavigator({
  Home: {
    screen: BaralhoLista,
    navigationOptions: ({ navigation }) => ({
      title: "Lista de Baralhos",
      headerLeft: (<MaterialCommunityIcons name='cards' size={30} />),
      headerStyle: { paddingRight: 15, paddingLeft: 15 }
    })
  },
  BaralhoAdd: {
    screen: BaralhoAdd,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Novo Baralho'
    })
  },
  Baralho: {
    screen: Baralho,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.title
    })
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: ({ navigation }) => ({
      headerTitle: `Quiz de ${navigation.state.params.title}`,
      headerStyle: { backgroundColor: '#000'},
      headerTintColor: '#fff',
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
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
