import { ENDPOINT, getAPI, postAPI } from '@api-manager';
import { Button, CustomLoader, CustomToast, FloatingInput, MobileNumberInput, SelectDropdown } from '@components';
import { CAREER_FORM_STAGE } from '@enum';
import { IDDOption, IFieldData, IMobileNumberData } from '@interfaces';
import { formValidator } from '@logic/CareerForm';
import { GTMHelper, getIconByName, setFallBack, useDeviceType } from '@utils';
import { apiDataFilter } from '@utils/server';
import { useEffect, useState } from 'react';
import { Form, Offcanvas } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { Checkbox, SelectDropdownCustom } from '../Fields';
import OtpInput from '../OtpInput';
import styles from './getInTouchForm.module.scss';

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

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

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

  const onSubmit = async (data: any) => {
    GTMHelper({
      ...getInTouchForm?.submitButton?.gtmData,
      event: 'form_otp_send',
      product_type: productType,
    });
    setLoading(true);
    const captchaResponse = __RECAPTCHA__ ? await executeRecaptcha() : '';
    const postData = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      phoneNo: data?.phoneNo ? data?.phoneNo?.phoneNumber : '',
      lookingFor: data?.lookingFor?.label,
      queryType: data?.queryType?.label,
      state: data?.state?.label,
      district: data?.district?.label,
      area: data?.area?.label,
      termsAndConditions: data?.termsAndConditions,
    };
    __RECAPTCHA__ ? setPayloadData({ ...postData, reResponse: captchaResponse }) : setPayloadData(postData);

    try {
      // call Api here to send OTP
      const res = await postAPI(ENDPOINT.CLIENT.enquirySubmitApi, postData);
      setToastData(`${res?.Result ? res?.Result : ''} ${res?.TicketId ? res?.TicketId : ''}`);
      setFormState(CAREER_FORM_STAGE?.SUCESS);
      setLoading(false);
      //to be enabled after OTP
      setShowOtp(true);
      setMobileNumber({ countryCode: data?.phoneNo?.countryCode, phoneNumber: data?.phoneNo?.phoneNumber });
    } catch (error) {
      setMobileNumber(null);
      setShowOtp(false);
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
  };

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
        reset();
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

  const onHideOTP = () => {
    setShowOtp(!showOtp);
    setResetOnOptionChange(false);
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
    return formField?.fieldName?.toLowerCase()?.includes('state') ||
      formField?.fieldName?.toLowerCase()?.includes('district') ||
      formField?.fieldName?.toLowerCase()?.includes('area') ? (
      <SelectDropdownCustom
        setSelected={(e: any): void => {
          onChange(e);
          if (formField?.fieldName?.toLowerCase()?.includes('lookingfor')) {
            setQueryOptions(setFallBack(e?.subOptions, []));
            setResetOnOptionChange(true);
            setValue('queryType', '');
          } else if (formField?.fieldName?.toLowerCase()?.includes('state')) {
            setDistrictOptions(e?.subOptions || []);
            setResetOnOptionChange(true);
            setValue('district', '');
            setValue('area', '');
            setAreaOptions([]);
          } else if (formField?.fieldName?.toLowerCase()?.includes('district')) {
            setAreaOptions(e?.areaOptions || []);
            setResetOnOptionChange(true);
            setValue('area', '');
          }
        }}
        selected={value}
        errorMessage={errors?.[formField?.fieldName ?? '']?.message as string}
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
            setValue('queryType', '');
          } else if (formField?.fieldName?.toLowerCase()?.includes('state')) {
            setDistrictOptions(e?.subOptions || []);
            setResetOnOptionChange(true);
            setValue('district', '');
          }
        }}
        selected={value}
        errorMessage={errors?.[formField?.fieldName ?? '']?.message as string}
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
            errorMessage={errors?.[formField?.fieldName || '']?.message as string}
            isClear={formField?.isClear}
            onClear={() => onChange('')}
            onBlur={onBlur}
            name={formField?.fieldName || ''}
            maxLen={formField?.maxAllowedLength}
            inputRef={ref}
            controlProps={{
              value: getValues(formField?.fieldName) || '',
            }}
          />
        );
      case 'phone':
        return (
          <MobileNumberInput
            label={formField?.placeholder}
            onChangeMobileNumber={(e: IMobileNumberData) => onChange(e)}
            onBlur={onBlur}
            errorMessage={errors?.[formField?.fieldName || '']?.message as string}
            name={formField?.fieldName}
            inputRef={ref}
            value={getValues(formField?.fieldName)?.phoneNumber || ''}
            contactNoLen={10}
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

  const formFileds = () => {
    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={loading}>
          <div className={!isPopup && deviceType === 'desktop' ? styles.fieldsWrapper : ''}>
            {getInTouchForm?.formFields?.map((item: any, index: number) => (
              <div key={`formField__${item?.fieldName + index}`} className={styles.field}>
                <Controller
                  key={`formField__${item?.fieldName + index}`}
                  control={control}
                  name={item?.fieldName || ''}
                  rules={{
                    required: item?.errorMessages?.requiredFieldErrorMessage,
                    validate: () => formValidator(item, getValues(item?.fieldName)),
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) =>
                    getInputField(item, onChange, onBlur, value, ref)
                  }
                />
              </div>
            ))}
          </div>

          <div className={styles.buttonGroup}>
            {deviceType !== 'desktop' && isPopup && (
              <Button
                className={styles.cencelBtn}
                variant="outline-light"
                onClick={() => {
                  setShow(false);
                  reset();
                  GTMHelper({ ...getInTouchForm?.cancelButton?.gtmData });
                }}
              >
                {getInTouchForm?.cancelButtonText}
              </Button>
            )}
            {getInTouchForm?.submitButtonText && (
              <Button type="submit" loading={loading} className={styles.btn}>
                {getInTouchForm?.submitButtonText}
              </Button>
            )}
          </div>

          {getInTouchForm?.checkboxField && (
            <Checkbox control={control} errors={errors} setValue={setValue} compData={getInTouchForm?.checkboxField} />
          )}
        </fieldset>
      </Form>
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
                            reset();
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
                {showOtp ? (
                  <OtpInput
                    onHide={onHideOTP}
                    submit={onSubmitOtp}
                    getIntouchOtpData={getIntouchOtp}
                    mobileNumber={mobileNumber}
                    resend={resendOtp}
                    otpErr={otpErr}
                    setShow={setShowOtp}
                    loading={loading}
                    productType={productType}
                  />
                ) : (
                  formFileds()
                )}
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
              {showOtp && (
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
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default GetInTouchForm;
