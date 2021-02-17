```js
const ajax = (store) => (next) => (action) => {
  switch (action.type) {
    case DO_QUESTION:
      const { id_category } = store.getState();
      axios.get('/category/', {
        params: {
          id: id_category,
      }, 
      })
        .then((response) => {
          // action à créer
        })
        .catch((error) => {
          console.error('Error', error);
        });
      break;
    case DO_AVATAR:
      axios.get('/avatars')
        .then((response) => {
          // action à créer
        })
        .catch((error) => {
          console.error('Error', error);
        });
      break;
    case DO_TROPHIES:
      const { id_user } = store.getState();
      axios.get('/trophies/', {
        params: {
          id_user,
        },
      })
        .then((response) => {
          // action à créer
        })
        .catch((error) => {
          console.error('Error', error);
        });
      break;
    case ADD_LEVEL:
      const { id_user } = store.getState();
      axios.patch('/level/', {
        // action à créer
        params: {
          id_user,
        },
      })
        .then((response) => {
          // action à créer
        })
        .catch((error) => {
          console.error('Error', error);
        });
      break;
    case DO_LOGIN:
      const { email, password } = store.getState().user;
      axios.post('/signin', {
          email,
          password,
      })
        .then((response) => {
          // action à créer
          axios.defaults.headers.common.Authorization = `bearer ${response.data.token}`;
        })
        .catch((error) => {
          console.error('Error', error);
        });
      break;
    case DO_LOGOUT:
      axios.post('/signout')
      delete axios.defaults.headers.common.Authorization;
      break;
    case DO_USERINFO:
      const { id_user } = store.getState();
      axios.post('/user/', {
          id_user,
      })
        .then((response) => {
          // action à créer
        })
        .catch((error) => {
          console.error('Error', error);
        });
      break;
    case CHANGE_USERINFO:
      const { id_user } = store.getState();
      axios.update('/update/', {
          id_user,
      })
        .then((response) => {
          // action à créer
        })
        .catch((error) => {
          console.error('Error', error);
        });
      break;
    case DELETE_USER:
      const { id_user, password, email } = store.getState();
      axios.delete('/remove/', {
          id_user,
          password,
          email,
      })
        .then((response) => {
          // action à créer
        })
        .catch((error) => {
          console.error('Error', error);
        });
      break;
    case SUBSCRIBE:
      const { password,password2,nickname, email, id_avatar } = store.getState();
      axios.post('/subscribe', {
          password,
          password2,
          nickname, 
          email, 
          id_avatar,
      })
        .then((response) => {
          // action à créer
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
```