import { RECEIVE_FLASHCARDS, ADD_FLASHCARD, ADD_CARD } from '../actions'

export const initialState = {
  flashcards: {},
}

function flashcards(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_FLASHCARDS:
      return {
        ...state,
        flashcards: { ...state.flashcards, ...action.flashcards },
      }
    case ADD_FLASHCARD:
      return {
        ...state,
        flashcards: { ...state.flashcards, ...action.flashcard },
      }
    case ADD_CARD:
      return {
        ...state,
        flashcards: {
          ...state.flashcards,
          [action.key]: {
            ...state.flashcards[action.key],
            cards: [...state.flashcards[action.key].cards, action.card],
          },
        },
      }
    default:
      return state
  }
}

export default flashcards
