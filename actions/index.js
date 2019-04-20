export const RECEIVE_FLASHCARDS = 'RECEIVE_FLASHCARDS'

export function receiveFlashcards(flashcards) {
  return {
    type: RECEIVE_FLASHCARDS,
    flashcards,
  }
}
