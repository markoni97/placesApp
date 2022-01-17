import React from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';
import Backdrop from './Backdrop';
import { CSSTransition } from 'react-transition-group';

const ModalOverlay = (props) => {
  const content = (
    <div
      className={`${classes['modal']} ${classes[props.className]}`}
      style={props.style}
    >
      <header
        className={`${classes['modal__header']} ${classes[props.headerClass]}`}
      >
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div
          className={`${classes['modal__content']} ${
            classes[props.contentClass]
          }`}
        >
          {props.children}
        </div>
        <footer
          className={`${classes['modal__footer']} ${
            classes[props.footerClass]
          }`}
        >
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        classNames="modal"
        timeout={200}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
