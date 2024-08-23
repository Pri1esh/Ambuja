import { IButton } from '@interfaces';
import { useEffect, useState } from 'react';
import { Button as BSButton } from 'react-bootstrap';
import styles from './button.module.scss';

const Button = (props: IButton) => {
  const {
    children,
    className = '',
    variant = 'primary',
    type = 'button',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onClick = () => {},
    loading = false,
    disabled = false,
    id = '',
    ariaLabel = '',
    isActive = 'true',
  } = props;
  const [loader, setLoader] = useState(loading);
  useEffect(() => {
    setLoader(loading);
  }, [loading]);

  return (
    <BSButton
      id={id}
      type={type}
      variant={variant}
      className={`${className} ${styles.button} ${loader ? styles.loading : ''} ${styles.ripple} ${
        isActive === 'false' ? styles.notActive : ''
      } `}
      onClick={onClick}
      disabled={loading || disabled}
      aria-label={ariaLabel}
    >
      {!loader ? (
        children
      ) : (
        <>
          <span></span>
          <span></span>
          <span></span>
        </>
      )}
    </BSButton>
  );
};

export default Button;
