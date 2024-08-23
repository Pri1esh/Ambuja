import { Button } from '@components';
import { IOtpFields } from '@interfaces';
import { GTMHelper, getIconByName } from '@utils';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import styles from './OtpInput.module.scss';

const OTPFields = ({ compData }: IOtpFields) => {
  const {
    getIntouchOtpData,
    submit,
    onHide,
    mobileNumber,
    resend,
    otpErr,
    disableForm = false,
    isModalOpen = false,
    setShow,
    loading,
    productType,
  } = compData;
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState<number>(getIntouchOtpData?.timer || 30);

  useEffect(() => {
    firstInputRef?.current?.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const [buttonState, setButtonState] = useState('disabled');

  const [inputValues, setInputValues] = useState({
    otp1: '',
    otp2: '',
    otp3: '',
    otp4: '',
    otp5: '',
    otp6: '',
  });
  const [inputOtp, setInputOtp] = useState('');

  useEffect(() => {
    const inputArray = Object.values(inputValues);
    const checkinput = (value: string) => {
      return value == '';
    };
    const inputstatus = inputArray.some(checkinput);
    if (!inputstatus) {
      setButtonState('');
    } else {
      setButtonState('disabled');
    }
  }, [inputValues]);

  useEffect(() => {
    setInputOtp(
      inputValues?.otp1 +
        inputValues?.otp2 +
        inputValues?.otp3 +
        inputValues?.otp4 +
        inputValues?.otp5 +
        inputValues?.otp6,
    );
  }, [inputValues]);

  const handleChange = (
    value: 'otp1' | 'otp2' | 'otp3' | 'otp4' | 'otp5' | 'otp6',
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    event.target.value = event.target.value.replace(inputValues[value], '');
    setInputValues((prevState) => ({
      ...prevState,
      [value]: event.target.value,
    }));
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasteOTP = e?.clipboardData?.getData('Text')?.trim()?.slice(0, 6);
    for (let i = 0; i < pasteOTP.length; i++) {
      const keyName: any = `otp${i + 1}`;
      handleChange(keyName, { target: { value: pasteOTP[i] } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const inputfocus = (elmnt: any) => {
    if (elmnt.key === 'Delete' || elmnt.key === 'Backspace') {
      const prev = elmnt.target.tabIndex - 2;
      if (prev >= 0) {
        elmnt.target.previousSibling.focus();
      }
    } else if (elmnt.target.value === '') {
      return;
    } else {
      elmnt.target.nextSibling.focus();
    }
  };

  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') return;
    e.target.select();
  };
  return (
    <div className={`${styles.otpInput} ${styles.otpModal} ${isModalOpen ? styles.formModal : ''}`}>
      <Form onSubmit={(e) => submit(e, inputOtp, setInputValues)}>
        <div className={styles.backIcon}>
          <button
            type="button"
            onClick={() => {
              if (setShow) setShow(false);
              GTMHelper({ ...getIntouchOtpData?.gtmData, product_type: productType });
            }}
          >
            {getIconByName('up')}
          </button>
        </div>
        {getIntouchOtpData?.heading && <h3>{getIntouchOtpData?.heading}</h3>}
        <p>
          {getIntouchOtpData?.wehavesentviaSMStoLabel} {mobileNumber?.countryCode} {mobileNumber?.phoneNumber}{' '}
          <button
            type="button"
            title={getIntouchOtpData?.editMobileNOTitle}
            onClick={() => {
              onHide();
              GTMHelper({ ...getIntouchOtpData?.editButton?.gtmData, product_type: productType });
            }}
          >
            {getIntouchOtpData?.editButtonLabel}
          </button>
        </p>
        <div className={styles.wrapper}>
          <div className={`${styles.otpContainer} ${otpErr ? styles.invalidOTP : ''}`}>
            <input
              ref={firstInputRef}
              name="otp1"
              type="tel"
              autoComplete="off"
              className="otpInput"
              value={inputValues.otp1}
              onChange={(e) => handleChange('otp1', e)}
              tabIndex={1}
              onKeyUp={(e) => inputfocus(e)}
              autoFocus
              disabled={disableForm}
              onFocus={(e) => handleFocus(e)}
              maxLength={1}
              onPaste={handlePaste}
            />
            <input
              name="otp2"
              type="tel"
              autoComplete="off"
              className="otpInput"
              value={inputValues.otp2}
              onChange={(e) => handleChange('otp2', e)}
              tabIndex={2}
              onKeyUp={(e) => inputfocus(e)}
              disabled={disableForm}
              onFocus={(e) => handleFocus(e)}
              maxLength={1}
              onPaste={handlePaste}
            />
            <input
              name="otp3"
              type="tel"
              autoComplete="off"
              className="otpInput"
              value={inputValues.otp3}
              onChange={(e) => handleChange('otp3', e)}
              tabIndex={3}
              onKeyUp={(e) => inputfocus(e)}
              disabled={disableForm}
              onFocus={(e) => handleFocus(e)}
              maxLength={1}
              onPaste={handlePaste}
            />
            <input
              name="otp4"
              type="tel"
              autoComplete="off"
              className="otpInput"
              value={inputValues.otp4}
              onChange={(e) => handleChange('otp4', e)}
              tabIndex={4}
              onKeyUp={(e) => inputfocus(e)}
              disabled={disableForm}
              onFocus={(e) => handleFocus(e)}
              maxLength={1}
              onPaste={handlePaste}
            />

            <input
              name="otp5"
              type="tel"
              autoComplete="off"
              className="otpInput"
              value={inputValues.otp5}
              onChange={(e) => handleChange('otp5', e)}
              tabIndex={5}
              onKeyUp={(e) => inputfocus(e)}
              disabled={disableForm}
              onFocus={(e) => handleFocus(e)}
              maxLength={1}
              onPaste={handlePaste}
            />
            <input
              name="otp6"
              type="tel"
              autoComplete="off"
              className="otpInput"
              value={inputValues.otp6}
              onChange={(e) => handleChange('otp6', e)}
              tabIndex={6}
              onKeyUp={(e) => inputfocus(e)}
              disabled={disableForm}
              onFocus={(e) => handleFocus(e)}
              maxLength={1}
              onPaste={handlePaste}
            />
          </div>
          {otpErr && <div className={disableForm ? styles.otpError : styles.error}>{otpErr}</div>}
        </div>
        <div className={styles.otpBtnContainer}>
          <Button
            className={styles.submitBtn}
            loading={loading}
            disabled={(buttonState || disableForm) as any}
            type="submit"
          >
            {getIntouchOtpData?.submitButtonText}
          </Button>
        </div>
        {!disableForm &&
          (timer == 0 ? (
            <p className={styles.timer}>
              {getIntouchOtpData?.notReceivedOtpLabel}
              <button
                title={getIntouchOtpData?.resendOtpTitle}
                className={styles.resendButton}
                onClick={() => {
                  resend();
                  GTMHelper({ ...getIntouchOtpData?.resendButton?.gtmData, product_type: productType });
                }}
                type="button"
              >
                {getIntouchOtpData?.resendButtonLabel.trim()}
              </button>
            </p>
          ) : (
            <p className={styles.timer}>
              {getIntouchOtpData?.youWillReceiveOtpLabel}{' '}
              <strong>
                {timer} {getIntouchOtpData?.secondLabel}.
              </strong>
            </p>
          ))}
      </Form>
    </div>
  );
};

export default OTPFields;
