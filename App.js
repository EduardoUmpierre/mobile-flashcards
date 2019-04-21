import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { Constants } from 'expo'
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import reducer from './reducers'
import Quiz from './components/Quiz'
import DeckForm from './components/DeckForm'
import CardForm from './components/CardForm'

const Tabs = TabNavigator(
  {
    Home: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
      },
    },
    DeckForm: {
      screen: DeckForm,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      style: {
        height: 56,
      },
    },
  }
)

const Navigator = StackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    DeckView: {
      screen: DeckView,
    },
    Quiz: {
      screen: Quiz,
    },
    CardForm: {
      screen: CardForm,
    },
  },
  {
    initialRouteName: 'Home',
  }
)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: '#333',
              height: Constants.statusBarHeight,
            }}
          >
            <StatusBar
              translucent
              backgroundColor={'#333'}
              barStyle="light-content"
            />
          </View>
          <Navigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
