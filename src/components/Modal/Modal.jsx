import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.getElementById('modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imgUrl, tags } = this.props;
    return createPortal(
      <div className={css.modalBackdrop} onClick={this.handleBackdropClick}>
        <div className={css.modalContainer}>
          <img src={imgUrl} alt={tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  imgUrl: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

// підкажи, чому під час роботи програми може не працювати портал модального вікна?
