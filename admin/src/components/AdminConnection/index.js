import React from 'react';
import Field from '../../containers/AdminConnection/Field';
import './style.scss';
import Menu from '../../components/Menu';
import PropTypes from 'prop-types';

const AdminConnection = ({login, email, password,changeField, logging}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    login();
  };
  return (
    <>
      <Menu />
      {console.log(logging)}
      {!logging ? (
      <main>
          <form className="form" onSubmit={handleSubmit}>
            <Field 
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={changeField}
            />
            <Field
              type="password"
              placeholder="Mot de passe"
              name="password"
              value={password}
              onChange={changeField}
            />
          <button className="form-connect" type="submit">Connection</button>
        </form>
      </main>
      ):(
        <div>connecte</div>
        
      )}
    </>
 
  );
}
AdminConnection.propTypes = {
  login: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired
};
export default AdminConnection;
