import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    inputValue: '',
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.inputValue.trim() === '') {
      toast.error('Please write something!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    this.props.onSubmitInput(this.state.inputValue);
    this.setState({ inputValue: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <ImSearch size="1.6em" />
          </button>

          <input
            className={css.input}
            type="text"
            name="inputValue"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmitInput: PropTypes.func.isRequired,
};
