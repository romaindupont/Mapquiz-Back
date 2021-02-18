import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';


const Field = ({
  currentValue,
  type,
  placeholder,
  name,
  onChange
}) => {
  const [clic, setClic] = useState(false);
  const handleChange = (evt) => {
    onChange(evt.target.value, name);
  };
  return (
          <div className={`"form-${name}"`}>
            <label className={classNames("label-input", {'label-animated':clic})} >Your email</label>
            <input 
              className="input"
              onFocus={e => setClic(!clic)}
              onBlur={e => setClic(!clic)}
              type={type}
              placeholder={placeholder}
              name={name}
              value={currentValue}
              onChange={handleChange}
            />
          </div> 
  );
}
Field.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  currentValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

Field.defaultProps = {
  type: 'text',
  placeholder: '',
  currentValue: '',
};

export default Field ;
