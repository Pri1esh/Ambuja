import { IRecaptcha } from '@interfaces';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller } from 'react-hook-form';
import Error from '../Error';
import styles from './reCaptcha.module.scss';

const ReCaptcha = (props: IRecaptcha) => {
  const { control, controlName, errors, errorMessage = '', reCaptchaRef } = props;
  return (
    <div className={styles.reCaptcha}>
      <div>
        <Controller
          control={control}
          name={controlName}
          rules={{
            required: errorMessage,
          }}
          render={({ field: { onChange, ref } }) => (
            <>
              <ReCAPTCHA
                ref={reCaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_APP_SITE_KEY ? process.env.NEXT_PUBLIC_APP_SITE_KEY : ''}
                onChange={(e) => onChange(e)}
              />
              <input ref={ref} className={'visually-hidden'} />
            </>
          )}
        />
      </div>
      {errors[controlName] && <Error errorMessage={errorMessage} />}
    </div>
  );
};

export default ReCaptcha;
