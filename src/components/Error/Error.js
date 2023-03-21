import PropTypes from 'prop-types';
import { FcRemoveImage } from 'react-icons/fc';
import css from './Error.module.css';

export const Error = ({ inputValue }) => (
  <div className={css.alert}>
    <FcRemoveImage size="15em" className={css.alertSvg} />
    <p className={css.alertMessage}>
      Sorry, there are no images matching your search "{inputValue}".
      <br /> Please try again.
    </p>
  </div>
);

Error.propType = {
  inputValue: PropTypes.string.isRequired,
};
