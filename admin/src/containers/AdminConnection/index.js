import { connect } from 'react-redux';
import AdminConnection from '../../components/AdminConnection';
import { doLogin, changeMessage } from '../../actions';

const mapStateToProps = (state) => ({
  email: state.email,
  password: state.password,
  logging: state.logged,
});

const mapDispatchToProps = (dispatch) => ({
  login: () => {
    dispatch(doLogin());
  },
  changeField: (value, name) => {
    dispatch(changeMessage(value, name));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminConnection);
