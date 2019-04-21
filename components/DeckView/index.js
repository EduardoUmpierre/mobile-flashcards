import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import DeckSummary from '../DeckSummary'
import { buttons, containers } from '../../utils/sharedStyles'

class DeckView extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  })

  render() {
    const { flashcard, navigation } = this.props
    const isQuizButtonDisabled = flashcard.cards.length === 0

    return (
      <View style={styles.container}>
        <View style={containers.centeredContainer}>
          <DeckSummary big name={flashcard.name} cards={flashcard.cards} />
        </View>

        <View>
          <TouchableOpacity style={buttons.buttonContainer}>
            <Text style={buttons.button}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[buttons.buttonContainer, { marginBottom: 20 }]}
            onPress={() =>
              navigation.navigate('Quiz', { key: navigation.state.params.key })
            }
            disabled={isQuizButtonDisabled}
          >
            <Text
              style={[
                buttons.button,
                buttons.primary,
                isQuizButtonDisabled && buttons.disabled,
              ]}
            >
              Start Quiz
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
})

const mapStateToProps = ({ flashcards }, { navigation }) => {
  const key = navigation.state.params.key
  const flashcard = flashcards[key]

  return {
    key,
    flashcard,
  }
}

export default connect(mapStateToProps)(DeckView)
