import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { buttons, forms } from '../../utils/sharedStyles'
import { submitEntry } from '../../utils/api'
import { addFlashcard } from '../../actions'

class DeckForm extends Component {
  state = {
    title: '',
  }

  submit() {
    const title = this.state.title

    if (this.isFormValid()) {
      const id = Math.random()
        .toString(36)
        .substr(2, 9)

      const flashcard = {
        name: title,
        cards: [],
      }

      submitEntry({ key: id, entry: flashcard }).then(() => {
        const { navigation, dispatch } = this.props

        dispatch(addFlashcard({ [id]: flashcard }))
        this.setState({ title: '' })
        navigation.navigate('DeckView', { title: flashcard.name, key: id })
      })
    }
  }

  isFormValid = () => {
    return this.state.title.length > 0
  }

  render() {
    return (
      <View>
        <View style={forms.container}>
          <Text style={forms.label}>What is the title of your new deck?</Text>

          <TextInput
            placeholder="Deck title"
            onChangeText={text => this.setState({ title: text })}
            value={this.state.title}
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

export default connect()(DeckForm)
