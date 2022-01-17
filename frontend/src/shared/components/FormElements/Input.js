import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';
import classes from './Input.module.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
      case 'TOUCHED':
        return {
          ...state,
          isTouched: true
        }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialIsValid || false,
    isTouched: false
  });

  const {value, isValid} = inputState;
  const {id, onInput} = props;
  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput])

  const inputChangeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const onBlurHandler = () => {
    dispatch({ type: 'TOUCHED' });
  };

  const element =
    props.element === 'input' ? (
      <input
        onChange={inputChangeHandler}
        onBlur={onBlurHandler}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={inputState.value}
      />
    ) : (
      <textarea
        onChange={inputChangeHandler}
        onBlur={onBlurHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`${classes['form-control']} ${
        !inputState.isValid && inputState.isTouched && classes['form-control--invalid']
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
