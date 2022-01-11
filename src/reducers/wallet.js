import {
  REQUEST_API,
  GET_CURRENCIES,
  FAIL_REQUEST,
  ADD_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editing: false,
  editingExpense: {},
  isFetching: false,
  error: '',
};

export default function user(state = INITIAL_STATE,
  action) {
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
  case REMOVE_EXPENSE: {
    const expenses = state.expenses
      .filter(({ id }) => id !== action.id)
      .map((ex, id) => ({ id, ...ex }));
    return { ...state, expenses };
  }
  case EDIT_EXPENSE:
    return {
      ...state,
      editing: true,
      editingExpense: state.expenses.filter(({ id }) => id === action.id)[0],
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      editing: false,
      editingExpense: {},
      expenses: state.expenses.map((ex) => (ex.id === action.id ? action.expense : ex)),
    };
  default:
    return state;
  }
}
