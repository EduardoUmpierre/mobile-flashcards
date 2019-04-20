import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import DeckSummary from '../DeckSummary'
import { buttons, containers } from '../../utils/sharedStyles'

class DeckView extends React.Component {
  render() {
    const { flashcard, navigation } = this.props

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
            onPress={() => navigation.navigate('Quiz', { id: flashcard.id })}
          >
            <Text style={[buttons.button, buttons.primary]}>Start Quiz</Text>
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
  const id = navigation.state.params.id
  const flashcard = flashcards.find(flashcard => flashcard.id === id)

  return {
    flashcard,
  }
}

export default connect(mapStateToProps)(DeckView)
