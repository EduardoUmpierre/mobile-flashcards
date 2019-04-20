import { RECEIVE_FLASHCARDS } from '../actions'

export const initialState = {
  flashcards: [
    {
      id: 'AB123',
      name: 'React',
      cards: [
        {
          question: 'Enim et voluptate pariatur nulla',
          answer: 'Elit ipsum minim esse aute et mollit ex.',
        },
        {
          question: 'Incididunt fugiat id excepteur ea esse ad',
          answer: 'Aute sunt do voluptate aliqua esse qui.',
        },
      ],
    },
    {
      id: 'AC123',
      name: 'English',
      cards: [
        {
          question: 'Duis elit qui eu nulla irure nostrud sunt culpa officia anim ex eiusmod ipsum minim.',
          answer: 'Est ex cillum aliqua magna est Lorem ea elit ut excepteur.',
        },
      ],
    },
  ],
}

function flashcards(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_FLASHCARDS:
      return {
        ...state,
        flashcards: [...action.flashcards],
      }
    default:
      return state
  }
}

export default flashcards
