import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const DeckSummary = ({ name, cards, big }) => (
  <View style={styles.container}>
    <Text style={{ fontSize: big ? 40 : 30, color: '#000' }}>{name}</Text>
    <Text style={{ fontSize: big ? 25 : 20, color: '#666' }}>
      {cards.length} cards
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 40,
  },
})

DeckSummary.defaultProps = {
  name: '',
  cards: [],
  big: false,
}

export default DeckSummary
