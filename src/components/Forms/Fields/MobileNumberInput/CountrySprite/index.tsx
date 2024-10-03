import { ICountrySprite } from '@interfaces';
import styles from './countrySprite.module.scss';

const CountrySpriteImage = (props: ICountrySprite) => {
  const { code = '' } = props;

  return (
    <>
      {code.length ? (
        <canvas
          className={`${styles.countrySprite} ${styles['flag-' + code.toLowerCase()]} ${styles.smFlag} `}
        ></canvas>
      ) : (
        ''
      )}
    </>
  );
};

export default CountrySpriteImage;
