import axios from 'axios';
import { DO_LOGIN, saveUser } from '../actions';

const ajax = (store) => (next) => (action) => {
  switch (action.type) {
    case DO_LOGIN: {
      //console.log(store.getState())
      const { email, password } = store.getState();
      axios.post('/admin', {
        email,
        password,
      }, {
        baseURL: 'https://mapquizbackend.herokuapp.com/',
      })
        .then((response) => {
          /* console.log(response) */
          // je veux memoriser le pseudo de l'utilsateur connecté
          store.dispatch(saveUser(response.data.pseudo, response.data.token));
          axios.defaults.headers.common.Authorization = `bearer ${response.data.token}`;
          alert(response.data.message)
        })
        .catch((error) => {
          console.error('Error', error);
        });
      break;
    }
    default:
      next(action);
  }
};

export default ajax;
