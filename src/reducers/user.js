import { SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
