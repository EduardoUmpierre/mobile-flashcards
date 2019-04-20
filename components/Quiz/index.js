import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { buttons, containers } from '../../utils/sharedStyles'

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

class Quiz extends Component {
  state = {
    question: 0,
    score: 0,
    showAnswer: false,
  }

  setAnswer = answer => {
    this.setState(prevState => ({
      score: answer ? prevState.score + 1 : prevState.score,
      question: prevState.question + 1,
    }))
  }

  toggleAnswer = () => {
    this.setState(prevState => ({ showAnswer: !prevState.showAnswer }))
  }

  render() {
    const { cards, navigation } = this.props
    const { question, score, showAnswer } = this.state

    const totalCards = cards.length
    const card = cards[question] || null

    return (
      <View style={styles.container}>
        {question === totalCards ? (
          <View style={styles.container}>
            <View style={[containers.centeredContainer, { marginTop: 20 }]}>
              <Text style={styles.title}>Your Score</Text>
              <Text style={styles.score}>{(score / totalCards) * 100}%</Text>
            </View>

            <TouchableOpacity
              style={[
                buttons.buttonContainer,
                {
                  marginTop: 20,
                  marginBottom: 20,
                },
              ]}
              onPress={() => navigation.pop()}
            >
              <Text style={[buttons.button, buttons.primary]}>
                Back to Flashcard
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.container}>
            <Text style={{ margin: 20 }}>
              {question + 1}/{totalCards}
            </Text>

            <TouchableOpacity
              style={[containers.centeredContainer, styles.answerContainer]}
              onPress={() => this.toggleAnswer()}
            >
              <Text style={styles.question}>
                {showAnswer ? card.answer : card.question}
              </Text>
              <Text style={{ fontSize: 20, textAlign: 'center' }}>
                Show {showAnswer ? 'Question' : 'Answer'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={buttons.buttonContainer}
              onPress={() => this.setAnswer(true)}
            >
              <Text
                style={[
                  buttons.button,
                  {
                    backgroundColor: 'green',
                    color: '#FFF',
                  },
                ]}
              >
                Correct
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[buttons.buttonContainer, { marginBottom: 20 }]}
              onPress={() => this.setAnswer(false)}
            >
              <Text
                style={[
                  buttons.button,
                  {
                    backgroundColor: 'red',
                    color: '#FFF',
                  },
                ]}
              >
                Incorrect
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    )
  }
}

const mapStateToProps = ({ flashcards }, { navigation }) => {
  const id = navigation.state.params.id
  const flashcard = flashcards.find(flashcard => flashcard.id === id)

  return {
    cards: shuffle(flashcard.cards),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  answerContainer: {
    padding: 20,
  },
  question: {
    color: '#333',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  score: {
    color: '#333',
    fontSize: 60,
    fontWeight: '700',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    fontSize: 20,
    textAlign: 'center',
  },
})

export default connect(mapStateToProps)(Quiz)
