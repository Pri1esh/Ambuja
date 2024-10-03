'use client';

import { CustomImage } from '@components';
import { IErrorPage } from '@interfaces';
import Head from 'next/head';
import { Container } from 'react-bootstrap';
import { Button } from '../Forms/Fields';
import styles from './error.module.scss';

const ErrorFallback = (props: IErrorPage) => {
  const {
    buttonTitle = 'Try Again',
    title = '',
    imageAlt,
    description,
    error = 'Error',
    showButton = true,
    heading = 'Server Error',
    backToHome = false,
    errorMessage = '',
  } = props;

  return (
    <Container>
      <Head>
        <title>{`Ambuja Help : ${error}`}</title>
      </Head>
      <div className={styles.wrapper}>
        <div className={styles.mainWrapper}>
          {heading && <div className={styles.heading}>{heading}</div>}
          {heading === 'Server Error' ? (
            <CustomImage
              src={{ defaultSource: '/assets/images/internal_server.png' }}
              alt={imageAlt}
              loader={'false'}
            />
          ) : (
            <CustomImage src={{ defaultSource: '/assets/images/404.png' }} alt={imageAlt} loader={'false'} />
          )}
          <div className={styles.contentWrapper}>
            <div className={styles.textWrapper}>
              {title && <h6>{title}</h6>}
              {description && <p>{description}</p>}
              {showButton && (
                <Button
                  onClick={() => {
                    backToHome
                      ? window.location.replace('/')
                      : typeof window !== 'undefined' && window.location.reload();
                  }}
                >
                  {buttonTitle}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="d-none">{errorMessage}</div>
    </Container>
  );
};

export default ErrorFallback;
