import { Button } from '@components';
import {
  IConstructionDetails,
  IConstructionTabInputTab,
  IConstructionTabRadioOption,
  ISelectDropdownOption,
  IDDOption
} from '@interfaces';
import { goToCostCalculatorPage, validateConstructionTabInputs, validateConstructionSelect } from '@logic/costCalculator';
import { GTMHelper, mobileNumberValidatorRegex, setFallBack } from '@utils';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { SelectDropdown, CostCalcTabInput } from 'src/components/Forms/Fields';
import styles from './constructionDetails.module.scss';
import { Checkbox, CostCalcDropdown } from '../../Forms/Fields';

const ConstructionDetails = (props: IConstructionDetails) => {
  const { compData, handleFormSubmit, inPage = true, selectedValues = null, apiData = null } = props;
  const { submitButton, buttonTabs, labels, inputTabs } = compData;
  const [selectedRadioOption, setSelectedRadioOption] = useState<IConstructionTabRadioOption | null>(null);
  const [districtOptions, setDistrictOptions] = useState<IDDOption[]>([]);
  const [areaOptions, setAreaOptions] = useState<IDDOption[]>([]);
  const [queryOptions, setQueryOptions] = useState<IDDOption[]>([]);
  const [resetOnOptionChange, setResetOnOptionChange] = useState(false);



  const {
    control,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (selectedValues) {
      const selectedOption: IConstructionTabRadioOption | null =
        buttonTabs?.find((tab) => tab?.label === selectedValues?.structureType) ?? null;

      const selectedDropdownOption = inputTabs
        ?.find((inputTab) => inputTab?.type === 'dropdown')
        ?.options?.find((option) => option.label === selectedValues?.dropdown);

      setSelectedRadioOption(selectedOption);
      setValue('tab', { dropdown: selectedDropdownOption, area: parseInt(selectedValues?.area?.toString()) });

      if (selectedDropdownOption?.label && selectedOption?.label && parseInt(selectedValues?.area?.toString())) {
        apiData === null &&
          handleFormSubmit &&
          handleFormSubmit(
            {
              dropdown: selectedDropdownOption?.label,
              structureType: selectedOption?.label,
              area: parseInt(selectedValues?.area?.toString()),
            },
            selectedOption?.id || buttonTabs?.[0]?.id,
            submitButton,
          );
      }
    } else {
      const selectedDropdownOption = inputTabs?.find((inputTab) => inputTab?.type === 'dropdown')?.options?.[0];
      handleRadioClick(buttonTabs?.[0]);
      setValue('tab', { dropdown: selectedDropdownOption });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // To get dropdown style
  const getDropDownStyle = (formField: any) => {
    if (
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

  // To get the data in dropdowns
  const getDropDownOptions = (inputTab: any) => {
   if (inputTab?.type?.toLowerCase()?.includes('district')) {
      return districtOptions;
    } else if (inputTab?.type?.toLowerCase()?.includes('area')) {
      return areaOptions;
    } else { 
      return inputTab?.options;
    }
  };


  // To get state area dristict in form
  const getDropDown = (inputTab: any, onChange: any, onBlur: any, value: any) => {
    return (
      <CostCalcDropdown
        classname={inputTab.fieldName+"-control"}
        setSelected={(e: any): void => {
          onChange(e);
          if (inputTab?.placeholder.toLowerCase()?.includes('state')) {
            setDistrictOptions(e?.subOptions || []);
            setResetOnOptionChange(true);
            setValue('district', '');
            setValue('area', '');
            setAreaOptions([]);
            console.warn(errors?.['state'])
          } else if (inputTab?.placeholder.toLowerCase()?.includes('district')) {
            setAreaOptions(e?.areaOptions || []);
            setResetOnOptionChange(true);
            setValue('area', '');
          }
        }}
        inpValue={value?.label}
        selected={value?.dropdown}
        errorMessage={errors?.[inputTab?.fieldName] && !value ? inputTab?.errorMessage : ''}
        placeholder={inputTab?.placeholder}
        onBlur={onBlur}
        options={getDropDownOptions(inputTab)}
        showSelectedTick={true}
        isClose={true}
      />
    );
  }

  const onSubmit = (data: any) => {
    if (typeof window !== 'undefined' && submitButton?.type === 'link' && submitButton?.link) {
      goToCostCalculatorPage(
        {
          structuretype: selectedRadioOption?.label,
          constructionstage: data?.tab?.dropdown?.label,
          area: data?.tab?.area,
          stateName: data?.state?.label, districtName: data?.district?.label, areaName: data?.area?.label
        },
        submitButton,
      );
    } else if (handleFormSubmit) {
      handleFormSubmit(
        { dropdown: data?.tab?.dropdown?.label, structureType: selectedRadioOption?.label, area: data?.tab?.area,
          stateName: data?.state?.label, districtName: data?.district?.label, areaName: data?.area?.label
         },
        setFallBack(selectedRadioOption?.id, buttonTabs?.[0]?.id),
        submitButton,
      );
    }
  };

  const handleRadioClick = (val: IConstructionTabRadioOption) => {
    setSelectedRadioOption(val);
  };

  return (
    <div className={`${styles.wrapper} ${!inPage ? styles.inPageWrapper : ''}`}>
      <div className={styles.tabs}>
        {buttonTabs?.map((buttonTab: IConstructionTabRadioOption, index: number) => (
          <Form.Check.Label key={`${buttonTab?.id + index}`}>
            <span className={`${buttonTab?.id === selectedRadioOption?.id ? styles.selected : ''} ${styles.tabOption}`}>
              <Form.Check.Input
                id={buttonTab?.id}
                type={'radio'}
                checked={buttonTab?.id === selectedRadioOption?.id}
                onChange={() => {
                  handleRadioClick(buttonTab);
                }}
                value={buttonTab?.label}
                className={styles.radioStyle}
              />
              {buttonTab?.label}
            </span>
          </Form.Check.Label>
        ))}
      </div>
      <Form className={styles.constructionForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.formInputs}>
      {inputTabs?.map((inputTab: IConstructionTabInputTab) => {
                if (inputTab?.type === 'dropdown') {
                  return (
                    <Controller
                      control={control}
                      name={'tab'}
                      render={({ field: { onChange, onBlur, value } }) => (
                      <SelectDropdown
                        key={inputTab?.type}
                        classname={styles.dropdown}
                        options={inputTab?.options}
                        placeholder={inputTab?.placeholder}
                        onBlur={onBlur}
                        setSelected={(val: ISelectDropdownOption | null) => {
                          onChange({ ...getValues('tab'), dropdown: val });
                        }}
                        selected={value?.dropdown || inputTab?.options?.[0]}
                        isClose={false}
                        showSelectedTick={true}
                      />
                      )}
                    />
                  )
                }

                else if (inputTab?.type === 'statedropdown' || inputTab?.type === 'districtdropdown' || inputTab?.type === 'areadropdown'){
                  return (
                    <Controller
                      control={control}
                      name={inputTab?.fieldName || ''}
                      rules={{
                        validate: () => validateConstructionSelect({...getValues(inputTab?.fieldName || '')},inputTab?.type),
                      }}

                      render={({ field: { onChange, onBlur, value } }) => (
                        <div className={getDropDownStyle(inputTab)+" "+styles.dropdown}>{getDropDown(inputTab, onChange, onBlur, value)}</div>
                      )}
                    />
                  )
                }

                else{
                  return (
                    <Controller
                      control={control}
                      name={'tab'}
                      rules={{
                        validate: () => validateConstructionTabInputs(getValues('tab')),
                      }}

                      render={({ field: { onChange, onBlur, value } }) => (
                        <CostCalcTabInput
                        key={inputTab?.type}
                        className={styles.tabInput}
                        placeholder={inputTab?.placeholder}
                        label={inputTab?.placeholder}
                        onChange={(e: string) => {
                          if (e?.toString() === '') {
                            onChange({ ...getValues('tab'), area: '' });
                            return;
                          }
                          if (!mobileNumberValidatorRegex?.test(e?.toString())) {
                            return;
                          }
                          onChange({ ...getValues('tab'), area: parseInt(e?.toString()) });
                        }}
                        onBlur={onBlur}
                        errorMessage={errors?.['tab'] && !value?.area ? inputTab?.errorMessage : ''}
                        fieldName={inputTab?.fieldName}
                        value={value?.area}
                        inPage={inPage}
                      />
                      )}
                    />
                  )
                }
        })
      }
      
      </div>
        


        {/* <Controller
          control={control}
          name={'tab'}
          rules={{
            validate: () => validateConstructionTabInputs(getValues('tab')),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <div className={styles.formInputs}>
              {inputTabs?.map((inputTab: IConstructionTabInputTab) => {
                if (inputTab?.type === 'dropdown') {
                  return (
                    <SelectDropdown
                      key={inputTab?.type}
                      classname={styles.dropdown}
                      options={inputTab?.options}
                      placeholder={inputTab?.placeholder}
                      onBlur={onBlur}
                      setSelected={(val: ISelectDropdownOption | null) => {
                        onChange({ ...getValues('tab'), dropdown: val });
                      }}
                      selected={value?.dropdown || inputTab?.options?.[0]}
                      isClose={false}
                      showSelectedTick={true}
                    />
                  );
                }

                else if (inputTab?.type === 'statedropdown' || inputTab?.type === 'districtdropdown' || inputTab?.type === 'areadropdown') {
                 
                  return  (<div className={getDropDownStyle(inputTab)}>{getDropDown(inputTab, onChange, onBlur, value)}</div>)
                } 
                
                else {
                  return (
                    <TabInput
                      key={inputTab?.type}
                      className={styles.tabInput}
                      placeholder={inputTab?.placeholder}
                      label={inputTab?.placeholder}
                      onChange={(e: string) => {
                        if (e?.toString() === '') {
                          onChange({ ...getValues('tab'), area: '' });
                          return;
                        }
                        if (!mobileNumberValidatorRegex?.test(e?.toString())) {
                          return;
                        }
                        onChange({ ...getValues('tab'), area: parseInt(e?.toString()) });
                      }}
                      onBlur={onBlur}
                      errorMessage={errors?.['tab'] && !value?.area ? inputTab?.errorMessage : ''}
                      fieldName={inputTab?.fieldName}
                      value={value?.area}
                      inPage={inPage}
                    />
                  );
                }
              })}
            </div>
          )} */}
        

        <Button
          className={styles.submitButton}
          type={'submit'}
          onClick={() => {
            GTMHelper({
              ...labels?.gtmData,
              construction_type: selectedRadioOption?.id,
              construction_stage: getValues('tab')?.dropdown?.label,
              construction_area: getValues('tab')?.area,
            });
          }}
        >
          {labels?.submitButtonLabel}
        </Button>
      </Form>
    </div>
  );
};

export default ConstructionDetails;
