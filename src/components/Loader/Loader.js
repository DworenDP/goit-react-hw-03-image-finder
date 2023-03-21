import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.loaderContainer}>
    <ColorRing
      visible={true}
      height="120"
      width="120"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#ffe100', '#001aff', '#ffe100', '#001aff', '#ffe100']}
    />
  </div>
);
