import { REQUEST_API, GET_CURRENCIES, FAIL_REQUEST, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, isFetching: true };
  case GET_CURRENCIES: {
    const { curr } = action;
    delete curr.USDT;
    return { ...state, currencies: curr, isFetching: false };
  }
  case FAIL_REQUEST:
    return { ...state, error: action.err, isFetching: false };
  case ADD_EXPENSE: {
    const expenses = [...state.expenses, action.expense].map((ex, id) => ({ id, ...ex }));
    return { ...state, expenses };
  }
  default:
    return state;
  }
}
