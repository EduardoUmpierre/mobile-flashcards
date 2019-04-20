import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { connect } from 'react-redux'
import DeckSummary from '../DeckSummary'
import { fetchFlashcardResults } from '../../utils/api'
import { receiveFlashcards } from '../../actions'
import { initialState } from '../../reducers'

class DeckList extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props

    fetchFlashcardResults().then(flashcards =>
      dispatch(receiveFlashcards(flashcards || initialState.flashcards))
    )
  }

  render() {
    const { flashcards, navigation } = this.props

    return (
      <View style={styles.container}>
        {flashcards.map(flashcard => (
          <TouchableOpacity
            key={flashcard.id}
            onPress={() =>
              navigation.navigate('DeckView', { id: flashcard.id })
            }
            style={styles.deck}
          >
            <DeckSummary name={flashcard.name} cards={flashcard.cards} />
          </TouchableOpacity>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  deck: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: '#e5e5e5',
  },
})

const mapStateToProps = ({ flashcards }) => ({ flashcards })

export default connect(mapStateToProps)(DeckList)
