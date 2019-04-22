import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { buttons, containers } from '../../utils/sharedStyles'
import {
  clearLocalNotification,
  setLocalNotification,
  shuffle,
} from '../../utils/helpers'

class Quiz extends Component {
  static navigationOptions = () => ({ title: 'Quiz' })

  state = {
    question: 0,
    score: 0,
    showAnswer: false,
  }

  setAnswer = answer => {
    this.setState(
      prevState => ({
        score: answer ? prevState.score + 1 : prevState.score,
        question: prevState.question + 1,
        showAnswer: false,
      }),
      () => {
        const { question } = this.state
        const { cards } = this.props

        if (question === cards.length) {
          clearLocalNotification().then(setLocalNotification)
        }
      }
    )
  }

  toggleAnswer = () => {
    this.setState(prevState => ({ showAnswer: !prevState.showAnswer }))
  }

  restartQuiz = () => {
    this.setState({
      question: 0,
      score: 0,
      showAnswer: false,
    })
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
              <Text style={styles.score}>
                {((score / totalCards) * 100).toFixed(0)}%
              </Text>
            </View>

            <TouchableOpacity
              style={[
                buttons.buttonContainer,
                {
                  marginTop: 20,
                },
              ]}
              onPress={() => this.restartQuiz()}
            >
              <Text style={buttons.button}>Restart Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                buttons.buttonContainer,
                {
                  marginBottom: 20,
                },
              ]}
              onPress={() => navigation.pop()}
            >
              <Text style={[buttons.button, buttons.primary]}>
                Back to Deck
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
  const key = navigation.state.params.key
  const flashcard = flashcards[key]

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
