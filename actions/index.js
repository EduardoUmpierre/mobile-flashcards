export const RECEIVE_FLASHCARDS = 'RECEIVE_FLASHCARDS'
export const ADD_FLASHCARD = 'ADD_FLASHCARD'

export function receiveFlashcards(flashcards) {
  return {
    type: RECEIVE_FLASHCARDS,
    flashcards,
  }
}

export function addFlashcard(flashcard) {
  return {
    type: ADD_FLASHCARD,
    flashcard,
  }
}
