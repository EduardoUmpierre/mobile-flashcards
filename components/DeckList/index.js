import React from 'react'
import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import DeckSummary from '../DeckSummary'
import { fetchFlashcardResults } from '../../utils/api'
import { receiveFlashcards } from '../../actions'

class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetchFlashcardResults().then(flashcards =>
      dispatch(receiveFlashcards(flashcards))
    )
  }

  render() {
    const { flashcards, navigation } = this.props

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {Object.keys(flashcards).map(key => {
          const flashcard = flashcards[key]

          return (
            <TouchableOpacity
              key={key}
              onPress={() =>
                navigation.navigate('DeckView', { title: flashcard.name, key })
              }
              style={styles.deck}
            >
              <DeckSummary name={flashcard.name} cards={flashcard.cards} />
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  deck: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#e5e5e5',
  },
})

const mapStateToProps = ({ flashcards }) => ({ flashcards })

export default connect(mapStateToProps)(DeckList)
