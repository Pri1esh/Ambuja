/* eslint-disable */

import { ENDPOINT, getAPI, postAPI } from '@api-manager';
import { Button, CustomLoader, CustomToast, FloatingInput, MobileNumberInput, SelectDropdown } from '@components';
import { CAREER_FORM_STAGE } from '@enum';
import { IDDOption, IFieldData, IMobileNumberData } from '@interfaces';
import { formValidator, formPlaceValidator } from '@logic/CareerForm';
import { GTMHelper, getIconByName, setFallBack, useDeviceType } from '@utils';
import { apiDataFilter } from '@utils/server';
import { useEffect, useState } from 'react';
import { Form, Offcanvas } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, OTPInput, SelectDropdownCustom } from '../Fields';
import OtpInput from '../OtpInput';
import styles from './getInTouchForm.module.scss';
import { usePathname, useSearchParams } from 'next/navigation';

const GetInTouchForm = (props: any) => {
  const { show, setShow, isPopup = false, productType } = props;
  const [districtOptions, setDistrictOptions] = useState<IDDOption[]>([]);
  const [areaOptions, setAreaOptions] = useState<IDDOption[]>([]);
  const [queryOptions, setQueryOptions] = useState<IDDOption[]>([]);
  const [mobileNumber, setMobileNumber] = useState<IMobileNumberData | null>(null);
  const [showOtp, setShowOtp] = useState<boolean>(false);
  const [otpErr, setOtpErr] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [resetOnOptionChange, setResetOnOptionChange] = useState(false);
  const { deviceType } = useDeviceType();
  const [formState, setFormState] = useState<string>('');
  const [toastData, setToastData] = useState<string>('');
  const [formData, setFormData] = useState<any>({});
  const [payloadData, setPayloadData] = useState<any>(null);
  const [formLoader, setFormLoader] = useState(false);

  const [showPlace, setShowPlace] = useState(false);
  const [enableSend, setEnableSend] = useState(false);
  const [sendTxt, setSendTxt] = useState<string>('Send OTP');
  const [startTimer, setstartTimer] = useState<boolean>(false);
  const [resetTimer, setResetTimer] = useState<boolean>(false);
  const [validateOTP, setValidateOTP] = useState<boolean>(false);
  const [enableSubmit, setEnableSubmit] = useState<boolean>(false);
  const [disableInfo, setDisableInfo] = useState<boolean>(false);
  const [otherQuery, setOtherQuery] = useState<boolean>(false);
  const [OTPerror, setOTPerror] = useState<any>();
  const [mobileError, setMobileError] = useState<string>('');

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const enq_query = searchParams.get('query')?.replace(/-/g,' ');
  const [requestQuery, setRequestQuery] = useState<any>('');

  // First form
  const {
    control: controlDetail,
    handleSubmit: handleDetail,
    getValues: getValuesDetail,
    setValue: setValueDetail,
    reset: resetDetail,
    trigger: triggerDetail,
    watch,
    formState: { errors: errorsDetail },
  } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  // Second form
  const {
    control: controlPlace,
    handleSubmit: handlePlace,
    getValues: getValuesPlace,
    setValue: setValuePlace,
    reset: resetPlace,
    formState: { errors: errorsPlace },
  } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const watchQuery = watch('lookingFor');

  const addCaptcha = () => {
    if (!document.getElementById('recaptcha')) {
      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_APP_SITE_KEY}`;
      script.id = 'recaptcha';
      document.body.appendChild(script);
      document.querySelector('.grecaptcha-badge')?.classList?.remove('d-none');
    }
  };

  const removeCaptcha = () => {
    if (typeof window !== 'undefined' && sessionStorage?.getItem('getInTouchPage') !== 'true') {
      document.getElementById('recaptcha')?.remove();
      document.querySelector('.grecaptcha-badge')?.classList?.add('d-none');
    }
  };

  const RequestedQuery = (options:any) =>{
    if(pathname.includes('get-in-touch') && enq_query){
      const defaultQuery:any  = options?.find((item:any)=>(item.label === enq_query));
      setRequestQuery(defaultQuery);
    }
  }

  useEffect(() => {
    if (show || !isPopup) {
      __RECAPTCHA__ && addCaptcha();
    }

    return () => {
      if (show || !isPopup) {
        removeCaptcha();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    typeof window !== 'undefined' && (show || !isPopup)
      ? sessionStorage?.setItem('getInTouchPage', 'true')
      : sessionStorage?.removeItem('getInTouchPage');

    setFormLoader(true);
    getFormAPIData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const otherQuey = watchQuery?.label?.toLowerCase().includes('i need other products');
    otherQuey ? setOtherQuery(true) : setOtherQuery(false);
  }, [watchQuery]);

  const getFormAPIData = async () => {
    const res = await getAPI(ENDPOINT.CLIENT.getInTouchForm, false);
    const data = apiDataFilter(res);
    setFormData(data?.main?.GetInTouchForm?.fields);
    setFormLoader(false);
  };

  const executeRecaptcha = async () => {
    const token = await new Promise((resolve) => {
      /*NOSONAR*/ grecaptcha.ready(async () => {
        const token = await grecaptcha.execute(process.env.NEXT_PUBLIC_APP_SITE_KEY ?? '', { action: 'submit' });
        resolve(token);
      });
    });

    return token;
  };

  const onFinalSubmit = async (data: any) => {
    const isDetailValid = await triggerDetail();

    console.log('inside', 44, isDetailValid);

    if (isDetailValid) {
      GTMHelper({
        ...getInTouchForm?.submitButton?.gtmData,
        event: 'form_otp_send',
        product_type: productType,
      });
      setLoading(true);
      const detailData = getValuesDetail();
      const placeData = getValuesPlace();
      const postData = {
        firstName: detailData?.firstName,
        lastName: detailData?.lastName,
        email: detailData?.email,
        phoneNo: detailData?.phoneNo ? detailData?.phoneNo?.phoneNumber : '',
        lookingFor: detailData?.lookingFor?.label,
        queryType: detailData?.queryType?.label ? detailData?.queryType?.label : detailData?.lookingFor?.label,
        state: placeData?.state?.label,
        district: placeData?.district?.label,
        area: placeData?.area?.label,
        termsAndConditions: placeData?.termsAndConditions,
      };

      try {
        // call Api here to send OTP
        const res = await postAPI(ENDPOINT.CLIENT.enquirySubmitApi, postData);
        setToastData(`${res?.Result ? res?.Result : ''} ${res?.TicketId ? res?.TicketId : ''}`);
        setFormState(CAREER_FORM_STAGE?.SUCESS);
        setLoading(false);
      } catch (error) {
        setMobileNumber(null);
        setLoading(false);
        setToastData(errorMessage);
        setFormState('true');
        GTMHelper({
          ...getInTouchForm?.submitButton?.gtmData,
          event: 'form_submit_fail',
          product_type: productType,
          error_text: errorMessage,
          query_type: `${data?.lookingFor?.label} | ${data?.queryType?.label}`,
        });
      }
    }
  };

  // const onSubmit = async (data: any) => {

  //   GTMHelper({
  //     ...getInTouchForm?.submitButton?.gtmData,
  //     event: 'form_otp_send',
  //     product_type: productType,
  //   });
  //   setLoading(true);
  //   const captchaResponse = __RECAPTCHA__ ? await executeRecaptcha() : '';
  //   const postData = {
  //     firstName: data?.firstName,
  //     lastName: data?.lastName,
  //     email: data?.email,
  //     phoneNo: data?.phoneNo ? data?.phoneNo?.phoneNumber : '',
  //     lookingFor: data?.lookingFor?.label,
  //     queryType: data?.queryType?.label,
  //     state: data?.state?.label,
  //     district: data?.district?.label,
  //     area: data?.area?.label,
  //     termsAndConditions: data?.termsAndConditions,
  //   };
  //   __RECAPTCHA__ ? setPayloadData({ ...postData, reResponse: captchaResponse }) : setPayloadData(postData);

  //     console.log("iiiii")
  //     try {
  //       // call Api here to send OTP
  //       const res = await postAPI(ENDPOINT.CLIENT.enquirySubmitApi, postData);
  //       setToastData(`${res?.Result ? res?.Result : ''} ${res?.TicketId ? res?.TicketId : ''}`);
  //       setFormState(CAREER_FORM_STAGE?.SUCESS);
  //       setLoading(false);
  //       //to be enabled after OTP
  //       setShowOtp(true);
  //       setMobileNumber({ countryCode: data?.phoneNo?.countryCode, phoneNumber: data?.phoneNo?.phoneNumber });
  //     } catch (error) {
  //       setMobileNumber(null);
  //       setShowOtp(false);
  //       setLoading(false);
  //       setToastData(errorMessage);
  //       setFormState('true');
  //       GTMHelper({
  //         ...getInTouchForm?.submitButton?.gtmData,
  //         event: 'form_submit_fail',
  //         product_type: productType,
  //         error_text: errorMessage,
  //         query_type: `${data?.lookingFor?.label} | ${data?.queryType?.label}`,
  //       });
  //     }

  // };

  const onSubmitOtp = async (e: any, inputOtp: string, setInputValues?: any) => {
    e.preventDefault();
    // *inputOtp: string* --- get it from argument
    setLoading(true);
    try {
      const res = await postAPI(ENDPOINT.CLIENT.otpSubmitApi, { PhoneNo: mobileNumber?.phoneNumber, Otp: inputOtp });

      if (res?.Status === 1) {
        setFormState(CAREER_FORM_STAGE?.SUCESS);
        setShowOtp(false);
        isPopup && setShow(false);
        setMobileNumber(null);
        // reset();
        GTMHelper({
          ...getIntouchOtp?.submitButton?.gtmData,
          product_type: productType,
          ticket_id: res?.TicketId,
          query_type: `${payloadData?.lookingFor} | ${payloadData?.queryType}`,
        });
        GTMHelper({ ...getIntouchOtp?.otpSuccess?.gtmData, product_type: productType, ticket_id: res?.TicketId });
      } else {
        setFormState('true');
        setInputValues({
          otp1: '',
          otp2: '',
          otp3: '',
          otp4: '',
          otp5: '',
          otp6: '',
        });
        GTMHelper({
          ...getIntouchOtp?.otpFail?.gtmData,
          product_type: productType,
          error_text: res?.Result,
        });
      }

      setToastData(`${res?.Result ? res?.Result : ''} ${res?.TicketId ? res?.TicketId : ''}`);
      setLoading(false);
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }, 1000);
    } catch (error) {
      setToastData(errorMessage);
      setFormState('true');
      setOtpErr('something went wrong');
      setLoading(false);
      GTMHelper({
        ...getIntouchOtp?.otpFail?.gtmData,
        product_type: productType,
        error_text: errorMessage,
      });
    }
  };

  const sendOTP = async () => {
    const phoneNo = { phoneNo: getValuesDetail('phoneNo')?.phoneNumber };
    console.log('OTpppsenttttt');

    try {
      setResetTimer(false);
      setstartTimer(true);
      setEnableSend(false);

      setValidateOTP(false);
      const res = await postAPI(ENDPOINT.CLIENT.generateOTP, phoneNo);
      if (res.Status == 1) {
        setEnableSubmit(true);
      } else {
        setMobileError(res.Result);
        setResetTimer(true);
      }
    } catch (error) {
      setResetTimer(true);
      setToastData(errorMessage);
    }
  };

  const timerComplete = () => {
    setResetTimer(true);
    setstartTimer(false);
    setSendTxt('Resend OTP');
    setEnableSend(true);
  };

  const submitOTP = async () => {
    setValidateOTP(true);
    const validOTp = await OTPValidation(getValuesDetail('OTP'));
    if (validOTp) {
      setShowPlace(true);
      setDisableInfo(true);
      setEnableSend(false);
      setEnableSubmit(false);
    } else {
      GTMHelper({
        ...getIntouchOtp?.otpFail?.gtmData,
        product_type: productType,
        error_text: errorMessage,
      });
      setShowPlace(false);
    }
  };

  const onHideOTP = () => {
    setShowOtp(!showOtp);
    setResetOnOptionChange(false);
  };

  const OTPValidation = async (otp: number) => {
    setstartTimer(false);
    const payLoad = {
      phoneNo: getValuesDetail('phoneNo')?.phoneNumber,
      OTP: otp,
    };

    try {
      const res = await postAPI(ENDPOINT.CLIENT.validateOTP, payLoad);
      if (res.Status == 1) {
        return true;
      } else {
        getValuesDetail()?.OTP ? setOTPerror(res?.Result) : setOTPerror('');
        return false;
      }
    } catch (error) {
      setToastData(errorMessage);
      return true;
    }
  };

  const resendOtp = async () => {
    setLoading(true);

    try {
      // call Api here to resend OTP
      const res = await postAPI(ENDPOINT.CLIENT.enquirySubmitApi, payloadData);
      setToastData(`${res?.Result ? res?.Result : ''} ${res?.TicketId ? res?.TicketId : ''}`);
      setFormState(CAREER_FORM_STAGE?.SUCESS);
      setTimeout(() => setLoading(false), 1000);
      setShowOtp(true);
    } catch (error) {
      setOtpErr('something went wrong');
      setToastData(errorMessage);
      setFormState('true');
      setLoading(false);
    }
  };
  const getDropDownStyle = (formField: IFieldData) => {
    if (formField?.fieldName?.toLowerCase()?.includes('querytype') && queryOptions && queryOptions.length < 1) {
      return styles.disabled;
    } else if (
      formField?.fieldName?.toLowerCase()?.includes('district') &&
      districtOptions &&
      districtOptions.length < 1
    ) {
      return styles.disabled;
    } else if (formField?.fieldName?.toLowerCase()?.includes('area') && areaOptions && areaOptions.length < 1) {
      return styles.disabled;
    } else {
      return '';
    }
  };

  const getDropDownOptions = (formField: IFieldData) => {
    if (formField?.fieldName?.toLowerCase()?.includes('querytype')) {
      return queryOptions;
    } else if (formField?.fieldName?.toLowerCase()?.includes('district')) {
      return districtOptions;
    } else if (formField?.fieldName?.toLowerCase()?.includes('area')) {
      return areaOptions;
    } else {
      return formField?.fieldOptions;
    }
  };

  const getDropDown = (formField: IFieldData, onChange: any, onBlur: any, value: any, ref: any) => {
    
    if(formField?.fieldName?.toLowerCase()?.includes('lookingfor')){
      RequestedQuery(getDropDownOptions(formField))
    }

    return formField?.fieldName?.toLowerCase()?.includes('state') ||
      formField?.fieldName?.toLowerCase()?.includes('district') ||
      formField?.fieldName?.toLowerCase()?.includes('area') ? (
      <SelectDropdownCustom
        setSelected={(e: any): void => {
          onChange(e);
          if (formField?.fieldName?.toLowerCase()?.includes('lookingfor')) {
            setQueryOptions(setFallBack(e?.subOptions, []));
            setResetOnOptionChange(true);
            setValuePlace('queryType', '');
          } else if (formField?.fieldName?.toLowerCase()?.includes('state')) {
            setDistrictOptions(e?.subOptions || []);
            setResetOnOptionChange(true);
            setValuePlace('district', '');
            setValuePlace('area', '');
            setAreaOptions([]);
          } else if (formField?.fieldName?.toLowerCase()?.includes('district')) {
            setAreaOptions(e?.areaOptions || []);
            setResetOnOptionChange(true);
            setValuePlace('area', '');
          }
        }}
        selected={value}
        errorMessage={errorsPlace?.[formField?.fieldName ?? '']?.message as string}
        placeholder={formField?.placeholder}
        onBlur={onBlur}
        options={getDropDownOptions(formField)}
        showSelectedTick={true}
        isClose={true}
      />
    ) : (
      <SelectDropdown
        setSelected={(e: any): void => {
          onChange(e);
          if (formField?.fieldName?.toLowerCase()?.includes('lookingfor')) {
            setQueryOptions(e?.subOptions || []);
            setResetOnOptionChange(true);
            setValuePlace('queryType', '');
          } else if (formField?.fieldName?.toLowerCase()?.includes('state')) {
            setDistrictOptions(e?.subOptions || []);
            setResetOnOptionChange(true);
            setValuePlace('district', '');
          }
        }}
        selected={
          formField?.fieldName?.toLowerCase()?.includes('lookingfor') && !value ? requestQuery : value
        }
        errorMessage={errorsDetail?.[formField?.fieldName ?? '']?.message as string}
        placeholder={formField?.placeholder}
        onBlur={onBlur}
        options={getDropDownOptions(formField)}
        inputRef={ref}
        resetOnOptionChange={resetOnOptionChange}
        showSelectedTick={true}
        isClose={true}
      />
    );
  };

  const getInputField = (formField: IFieldData, onChange: any, onBlur: any, value: any, ref: any) => {
    switch (formField?.fieldType) {
      case 'text':
        return (
          <FloatingInput
            label={formField?.placeholder}
            onChange={(e: { target: { value: string } }) => onChange(e?.target?.value)}
            errorMessage={errorsDetail?.[formField?.fieldName || '']?.message as string}
            isClear={formField?.isClear}
            onClear={() => onChange('')}
            onBlur={onBlur}
            name={formField?.fieldName || ''}
            maxLen={formField?.maxAllowedLength}
            inputRef={ref}
            controlProps={{
              value: getValuesDetail(formField?.fieldName) || '',
            }}
          />
        );
      case 'phone':
        return (
          <MobileNumberInput
            label={formField?.placeholder}
            onChangeMobileNumber={(e: IMobileNumberData) => {
              onChange(e);
              setResetTimer(true);
              setstartTimer(false);
              setSendTxt('Send OTP');
            }}
            onBlur={onBlur}
            errorMessage={errorsDetail?.[formField?.fieldName || '']?.message as string}
            name={formField?.fieldName}
            inputRef={ref}
            value={getValuesDetail(formField?.fieldName)?.phoneNumber || ''}
            contactNoLen={10}
            enableSend={enableSend}
            sendTxt={sendTxt}
            sendOTP={sendOTP}
            setEnableSend={setEnableSend}
            disableInfo={disableInfo}
            mobileError={mobileError}
            setMobileError={setMobileError}
          />
        );
      case 'OTP':
        return (
          <OTPInput
            label={formField?.placeholder}
            onChange={(e: { target: { value: string } }) => {
              onChange(e?.target?.value);
              setOTPerror('');
            }}
            errorMessage={errorsDetail?.[formField?.fieldName || '']?.message as string}
            isClear={formField?.isClear}
            onClear={() => onChange('')}
            onBlur={onBlur}
            name={formField?.fieldName || ''}
            maxLen={formField?.maxAllowedLength}
            inputRef={ref}
            controlProps={{
              value: getValuesDetail(formField?.fieldName) || '',
            }}
            startTimer={startTimer}
            resetTimer={resetTimer}
            handleTimerComplete={timerComplete}
            enableSubmit={enableSubmit}
            submitOTP={submitOTP}
            OTPerror={OTPerror}
            disableInfo={disableInfo}
          />
        );

      case 'dropdown':
        return (
          <div className={getDropDownStyle(formField)}>{getDropDown(formField, onChange, onBlur, value, ref)}</div>
        );
      default:
        return <></>;
    }
  };

  const getPlaceInputField = (formField: IFieldData, onChange: any, onBlur: any, value: any, ref: any) => {
    switch (formField?.fieldType) {
      case 'placedropdown':
        return (
          <div className={getDropDownStyle(formField)}>{getDropDown(formField, onChange, onBlur, value, ref)}</div>
        );
      default:
        return <></>;
    }
  };

  const resetForm = () => {
    resetDetail();
    resetPlace();
    setEnableSend(false);
    setSendTxt('Send OTP');
    setEnableSubmit(false);
    setDisableInfo(false);
    setResetTimer(false);
    setShowPlace(false);
    setValueDetail('lookingFor', null);
    setValueDetail('queryType', null);
    setValueDetail('phoneNo', null);
    setValueDetail('firstName', '');
    setValueDetail('lastName', '');
    setValueDetail('OTP', '');
  };

  const formFileds = () => {
    return (
      <>
        <Form onSubmit={handleDetail(submitOTP)}>
          <fieldset disabled={loading}>
            <div className={!isPopup && deviceType === 'desktop' ? styles.fieldsWrapper : ''}>
              {getInTouchForm?.formFields?.map((item: any, index: number) => (
                <>
                  {item?.fieldType !== 'placedropdown' && (
                    <>
                      {item?.fieldName.toLowerCase().includes('querytype') ? (
                        otherQuery && (
                          <div
                            key={`formField__${item?.fieldName + index}`}
                            className={`${styles.field} ${
                              item?.fieldType === 'placedropdown' ? styles.emptyfield : ''
                            }`}
                          >
                            <Controller
                              key={`formField__${item?.fieldName + index}`}
                              control={controlDetail}
                              name={item?.fieldName || ''}
                              rules={{
                                required:
                                  item?.fieldType !== 'OTP'
                                    ? item?.errorMessages?.requiredFieldErrorMessage
                                    : validateOTP
                                      ? item?.errorMessages?.requiredFieldErrorMessage
                                      : '',
                                validate: () => formValidator(item, getValuesDetail(item?.fieldName)),
                              }}
                              render={({ field: { onChange, onBlur, value, ref } }) =>
                                getInputField(item, onChange, onBlur, value, ref)
                              }
                            />
                          </div>
                        )
                      ) : (
                        <div
                          key={`formField__${item?.fieldName + index}`}
                          className={`${styles.field} ${item?.fieldType === 'placedropdown' ? styles.emptyfield : ''}`}
                        >
                          <Controller
                            key={`formField__${item?.fieldName + index}`}
                            control={controlDetail}
                            name={item?.fieldName || ''}
                            rules={{
                              required:
                                item?.fieldType !== 'OTP'
                                  ? item?.errorMessages?.requiredFieldErrorMessage
                                  : validateOTP
                                    ? item?.errorMessages?.requiredFieldErrorMessage
                                    : '',
                              validate: () => formValidator(item, getValuesDetail(item?.fieldName)),
                            }}
                            render={({ field: { onChange, onBlur, value, ref } }) =>
                              getInputField(item, onChange, onBlur, value, ref)
                            }
                          />
                        </div>
                      )}
                    </>
                  )}
                </>
              ))}
            </div>
          </fieldset>
        </Form>

        <Form onSubmit={handlePlace(onFinalSubmit)}>
          <fieldset disabled={loading}>
            {showPlace && (
              <div className={!isPopup && deviceType === 'desktop' ? styles.fieldsWrapper : ''}>
                {getInTouchForm?.formFields?.map((item: any, index: number) => (
                  <>
                    {item?.fieldType === 'placedropdown' && (
                      <div
                        key={`formField__${item?.fieldName + index}`}
                        className={`${styles.field} ${item?.fieldType === 'placedropdown' ? '' : styles.emptyfield}`}
                      >
                        <Controller
                          key={`formField__${item?.fieldName + index}`}
                          control={controlPlace}
                          name={item?.fieldName || ''}
                          rules={{
                            required: item?.errorMessages?.requiredFieldErrorMessage,
                            validate: () => formPlaceValidator(item, getValuesPlace(item?.fieldName)),
                          }}
                          render={({ field: { onChange, onBlur, value, ref } }) =>
                            getPlaceInputField(item, onChange, onBlur, value, ref)
                          }
                        />
                      </div>
                    )}
                  </>
                ))}
              </div>
            )}

            <div className={styles.buttonGroup}>
              {deviceType !== 'desktop' && isPopup && (
                <Button
                  className={styles.cencelBtn}
                  variant="outline-light"
                  onClick={() => {
                    setShow(false);
                    resetForm();
                    GTMHelper({ ...getInTouchForm?.cancelButton?.gtmData });
                  }}
                >
                  {getInTouchForm?.cancelButtonText}
                </Button>
              )}
              {getInTouchForm?.submitButtonText && (
                <Button
                  type="submit"
                  loading={loading}
                  className={`${styles.btn} ${showPlace ? '' : styles.disabled}`}
                  disabled={!showPlace}
                >
                  {getInTouchForm?.submitButtonText}
                </Button>
              )}
            </div>

            {getInTouchForm?.checkboxField && (
              <Checkbox
                control={controlPlace}
                errors={errorsPlace}
                setValue={setValuePlace}
                compData={getInTouchForm?.checkboxField}
              />
            )}
          </fieldset>
        </Form>
      </>
    );
  };

  const { getInTouchForm, getIntouchOtp, errorMessage } = formData;

  return (
    <>
      {formState && (
        <CustomToast
          show={formState}
          classname={styles.toast}
          setShow={setFormState}
          message={toastData}
          autohide={true}
          isIconShow={false}
        />
      )}
      {isPopup ? (
        <Offcanvas className={styles.offCanvas} placement={'end'} show={show} onHide={() => setShow(false)}>
          {!showOtp && (
            <Offcanvas.Header
              closeButton
              onClick={() => {
                GTMHelper({ ...getInTouchForm.gtmData });
                resetForm();
              }}
            ></Offcanvas.Header>
          )}
          <Offcanvas.Body>
            {formLoader ? (
              <div className="pageLoader">
                <CustomLoader />
              </div>
            ) : (
              <div className={styles.form}>
                {!showOtp && (
                  <>
                    <div className={styles.formHeading}>
                      <div className={styles.backIcon}>
                        <button
                          onClick={() => {
                            if (setShow) setShow(false);
                            resetDetail();
                            GTMHelper({ ...getInTouchForm.gtmData });
                          }}
                        >
                          {getIconByName('up')}
                        </button>
                      </div>
                      <h3>{getInTouchForm?.heading}</h3>
                    </div>
                    <p className={styles.desc}>{getInTouchForm?.description}</p>
                  </>
                )}
                {
                  // showOtp ? (
                  //   <OtpInput
                  //     onHide={onHideOTP}
                  //     submit={onSubmitOtp}
                  //     getIntouchOtpData={getIntouchOtp}
                  //     mobileNumber={mobileNumber}
                  //     resend={resendOtp}
                  //     otpErr={otpErr}
                  //     setShow={setShowOtp}
                  //     loading={loading}
                  //     productType={productType}
                  //   />
                  // ) :
                  formFileds()
                }
              </div>
            )}
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        <>
          {formLoader ? (
            <div className="pageLoader">
              <CustomLoader />
            </div>
          ) : (
            <>
              {formFileds()}
              {/* {showOtp && (
                <OtpInput
                  onHide={onHideOTP}
                  submit={onSubmitOtp}
                  getIntouchOtpData={getIntouchOtp}
                  mobileNumber={mobileNumber}
                  resend={resendOtp}
                  otpErr={otpErr}
                  isModalOpen={true}
                  show={showOtp}
                  setShow={setShowOtp}
                  productType={productType}
                />
              )} */}
            </>
          )}
        </>
      )}
    </>
  );
};

export default GetInTouchForm;
