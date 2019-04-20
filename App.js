import React from 'react'
import { StyleSheet, View } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { StackNavigator } from 'react-navigation'
import DeckList from './components/DeckList'
import DeckView from './components/DeckView'
import reducer from './reducers'
import Quiz from './components/Quiz'

const Navigator = StackNavigator(
  {
    Home: {
      screen: DeckList,
    },
    DeckView: {
      screen: DeckView,
    },
    Quiz: {
      screen: Quiz,
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
