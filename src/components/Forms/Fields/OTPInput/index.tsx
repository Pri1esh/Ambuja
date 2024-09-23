import { CustomIcon, OTPTimer } from '@components';
import { IOTPInput } from '@interfaces';
import { useDeviceType } from '@utils';
import { useRef, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Error from '../Error';
import styles from './OTPInput.module.scss';

const OTPInput = (props: IOTPInput) => {
  const {
    key,
    type,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    inputRef = useRef(null), //NOSONAR
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
    placeholder = 'name',
    label = '',
    disabled = false,
    controlProps,
    name,
    errorMessage = '',
    classname = '',
    isClear = true,
    borderOnFocus = true,
    onClear,
    inputType = '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBlur = () => {},
    maxLen,
    defaultValue = '',
    isVerified = false,
    alignValueToRight = false,
    onFocus = () => {},
    disableBorder = false,
    readOnly = false,
    startTimer,
    resetTimer,
    handleTimerComplete,
    enableSubmit,
    OTPerror='',
    submitOTP,
    disableInfo

  } = props;
  const { deviceType } = useDeviceType();

  const [showClear, setShowClear] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(defaultValue);

  const handleOnChange = (e: any, inFocus = false) => {
    let newValue;
    if (inputType === 'number' || inputType === 'tel') {
      newValue = e?.target?.value?.replace(/\D/g, '');
    } else if (inputType === 'text') {
      newValue = e?.target?.value?.replace(/[^a-zA-Z]+/g, '');
    } else if (inputType === 'percentage') {
      if (inFocus) {
        newValue = e?.target?.value?.replace(/\D/g, '');
      } else {
        newValue = e?.target?.value?.replace(/\D/g, '') + '%';
      }
    } else {
      newValue = e?.target?.value;
    }
    if (inputValue === newValue) return;
    onChange(e);
    setInputValue(newValue);
  };

  const clearInput = () => {
    setInputValue('');
    isClear && onClear && onClear();
    setShowClear(false);
    if (onChange) onChange('');
  };

  const onChangeClear = (e: any) => {
    if (inputType === 'number' || inputType === 'tel') {
      if (e.target.value.replace(/\D/g, '') === '') {
        setShowClear(false);
      } else {
        setShowClear(true);
      }
    } else if (e.target.value === '') {
      setShowClear(false);
    } else {
      setShowClear(true);
    }
  };

  const onFocusClear = (e: any) => {
    if (e.target.value === '') {
      setShowClear(false);
    } else {
      setShowClear(true);
    }
  };

  return (
    <div className={`${styles.wrapper} ${classname}`}>
      <FloatingLabel
        className={`${styles.wrapper} ${classname} ${errorMessage ? styles.error : ''} ${classname}`}
        label={label}
        controlId={name}
      >
        <Form.Control
          type={deviceType === 'mobile' ? inputType : ''}
          as={type}
          ref={inputRef}
          key={key}
          id={name}
          autoComplete="off"
          maxLength={maxLen}
          onChange={(e) => {
            handleOnChange(e, true);
            isClear && onChangeClear(e);
          }}
          onFocus={(e) => {
            onFocusClear(e);
            if (onFocus) {
              onFocus(e);
              handleOnChange(e, true);
            }
          }}
          placeholder={placeholder}
          disabled={disableInfo}
          name={name}
          onBlur={(e) => {
            onBlur(e);
            handleOnChange(e);
            setTimeout(() => setShowClear(false), 200);
          }}
          className={`${styles.floatingInput} ${disableBorder ? styles.noBorder : ''} ${
            borderOnFocus ? styles.border : ''
          } ${alignValueToRight ? styles.alignRight : ''}`}
          value={inputValue}
          readOnly={readOnly}
          {...controlProps}
        />
        {isVerified ? (
          <div className={styles.clearIcon}>
            <CustomIcon iconName="tick" />
          </div>
        ) : (
          isClear &&
          showClear && (
            <button
              tabIndex={-1}
              className={styles.clearIcon}
              onMouseDown={() => {
                clearInput();
              }}
              onClick={clearInput}
            >
              <CustomIcon iconName={'close'} />
            </button>
          )
        )}
      <button type="submit" className={`${styles.SubmitOTP} ${enableSubmit? '' : styles.disabled}`} disabled={!enableSubmit} onClick={submitOTP} >Submit OTP</button>
      </FloatingLabel>
      {<OTPTimer startTimer={startTimer} resetTimer={resetTimer} onComplete={handleTimerComplete} />}
      {errorMessage && <Error errorMessage={errorMessage} />}
      {OTPerror && <Error errorMessage={OTPerror} />}
    </div>
  );
};

export default OTPInput;
