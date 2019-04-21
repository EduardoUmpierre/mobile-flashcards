import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { buttons, forms } from '../../utils/sharedStyles'
import { submitEntry } from '../../utils/api'
import { addCard } from '../../actions'

class CardForm extends Component {
  static navigationOptions = () => ({ title: 'Add a new card' })

  state = {
    question: '',
    answer: '',
  }

  submit() {
    if (this.isFormValid()) {
      const { id, flashcard, navigation, dispatch } = this.props
      const card = { ...this.state }
      const updatedFlashcard = {
        ...flashcard,
        cards: [...flashcard.cards, card],
      }

      submitEntry({ key: id, entry: updatedFlashcard })
      dispatch(addCard(id, card))
      navigation.pop()
    }
  }

  isFormValid = () => {
    return this.state.question.length > 0 && this.state.answer.length > 0
  }

  render() {
    return (
      <View>
        <View style={forms.container}>
          <Text style={forms.label}>What is the question of your card?</Text>

          <TextInput
            placeholder="Card question"
            onChangeText={text => this.setState({ question: text })}
            value={this.state.question}
            style={forms.input}
          />
        </View>

        <View style={forms.container}>
          <Text style={forms.label}>What is the answer of your card?</Text>

          <TextInput
            placeholder="Card answer"
            onChangeText={text => this.setState({ answer: text })}
            value={this.state.answer}
            onSubmitEditing={() => this.submit()}
            style={forms.input}
          />
        </View>

        <TouchableOpacity
          style={[buttons.buttonContainer, { marginBottom: 20 }]}
          onPress={() => this.submit()}
          disabled={!this.isFormValid()}
        >
          <Text
            style={[
              buttons.button,
              buttons.primary,
              !this.isFormValid() && buttons.disabled,
            ]}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = ({ flashcards }, { navigation }) => {
  const id = navigation.state.params.key
  const flashcard = flashcards[id]

  return {
    id,
    flashcard,
  }
}

export default connect(mapStateToProps)(CardForm)
