import {CHANGE_MESSAGE, SAVE_USER} from '../actions'

const initialState = {
  email: '',
  password: '',
  logged: false,
  pseudo: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_MESSAGE:
      return {
        ...state,
        [action.key]: action.newValue,
      };
    case SAVE_USER:
      return {
        ...state,
        logged: true,
        pseudo: action.pseudo,
        email: '',
        password: '',
      };
    default:
      return state;
  }
};

export default reducer;
