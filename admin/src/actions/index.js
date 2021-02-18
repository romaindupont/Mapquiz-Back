export const DO_LOGIN = 'DO_LOGIN';
export const doLogin = () => ({
  type: DO_LOGIN,
});

export const SAVE_USER = 'SAVE_USER';
export const saveUser = (pseudo) => ({
  type: SAVE_USER,
  pseudo,
});

export const CHANGE_MESSAGE = 'CHANGE_MESSAGE';
export const changeMessage = (newValue, key) => ({
  type: CHANGE_MESSAGE,
  newValue,
  key,
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT,
});