import { Button, SelectDropdownCustom } from '@components';
import { IDealerDropdownOptions, IDealerLocatorWidget } from '@interfaces';
import { formValidator, setSelected, updateDropdownOptions } from '@logic/dealerLocator';
import { scrollHelper, setFallBack, useDeviceType } from '@utils';
import { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import useGTM from 'src/lib/utils/useGTM';
import styles from './dealerLocatorFilter.module.scss';

const DealerLocatorFilter = (props: IDealerLocatorWidget) => {
  const {
    compData,
    filterDealers,
    selected,
    isOverlay = false,
    inPage = false,
    loading = false,
    disabled = false,
    setDisabled,
    setShowToast,
    setToastMessage,
  } = props;

  const {
    // redirectUrl,
    options,
    placeholders,
  } = compData;
  const [dropdownOptions, setDropdownOptions] = useState<IDealerDropdownOptions>({ cityOptions: [], areaOptions: [] });
  const [dropdownLoading, setDropdownLoading] = useState<boolean>(true);
  const searchRef = useRef<any>(null);

  const { sendEvent } = useGTM();

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<any>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const { deviceType } = useDeviceType();

  useEffect(() => {
    if (selected) {
      updateDropdownOptions(selected, options, setDropdownOptions);
      setValue(placeholders?.fieldName || 'dealerLocator', {
        selectedState: selected?.selectedState,
        selectedCity: selected?.selectedCity,
        selectedArea: selected?.selectedArea,
      });
      setDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    setTimeout(() => setDropdownLoading(false), 500);
  }, []);

  const onSubmit = (data: any) => {
    filterDealers({
      stateId: data?.[placeholders?.fieldName || 'dealerLocator']?.selectedState?.id,
      cityId: data?.[placeholders?.fieldName || 'dealerLocator']?.selectedCity?.id,
      areaId: data?.[placeholders?.fieldName || 'dealerLocator']?.selectedArea?.id,
    });
    setDisabled(true);
    sendEvent(compData?.gtmData);
  };

  const handleDropdownSelect = (selectedVal: any, onChange: (...event: any[]) => void, type: string) => {
    setSelected(
      selectedVal,
      onChange,
      getValues,
      dropdownOptions,
      setDropdownOptions,
      type,
      placeholders?.fieldName || 'dealerLocator',
    );
    setDisabled(false);
  };

  const handleOnDropdownClear = (dropdownType = '') => {
    if (dropdownType === 'state') {
      setValue(placeholders?.fieldName || 'dealerLocator', {
        selectedState: null,
        selectedCity: null,
        selectedArea: null,
      });
      setDropdownOptions({ ...dropdownOptions, cityOptions: [], areaOptions: [] });
    } else {
      setValue(placeholders?.fieldName || 'dealerLocator', {
        ...getValues(placeholders?.fieldName || 'dealerLocator'),
        selectedCity: null,
        selectedArea: null,
      });
      setDropdownOptions({ ...dropdownOptions, areaOptions: [] });
    }
  };

  function getClass() {
    let className;
    if (isOverlay || deviceType === 'tabletVertical' || deviceType === 'mobile') {
      className = styles.offcanvasFilterWrapper + ' filter';
    } else if (inPage) {
      className = styles.inPageWrapper;
    } else {
      className = styles.wrapper;
    }
    return className;
  }

  const scrollInView = async () => {
    scrollHelper(searchRef?.current, 150);
  };

  const searchDropDownCustom = (onChange: any, onBlur: any, value: any) => {
    return (
      <>
        <SelectDropdownCustom
          classname={`${styles.filterDropdown} ${loading ? styles.disabled : ''}`}
          options={options}
          setSelected={(item: any) => {
            handleDropdownSelect(item, onChange, 'state');
          }}
          placeholder={placeholders?.statePlaceholder}
          selected={value?.selectedState}
          onBlur={onBlur}
          loading={!isOverlay ? dropdownLoading : false}
          showSelectedTick={true}
          isClose={true}
          handleOnClear={() => handleOnDropdownClear('state')}
          dataFallback={placeholders?.noDataFound}
          disabled={loading}
        />
        <SelectDropdownCustom
          classname={`${styles.filterDropdown} ${
            dropdownOptions?.cityOptions?.length <= 0 || loading ? styles.disabled : ''
          }`}
          options={dropdownOptions?.cityOptions}
          setSelected={(item: any) => {
            handleDropdownSelect(item, onChange, 'city');
          }}
          placeholder={placeholders?.cityPlaceholder}
          selected={value?.selectedCity}
          onBlur={onBlur}
          loading={!isOverlay ? dropdownLoading : false}
          showSelectedTick={true}
          isClose={true}
          handleOnClear={() => handleOnDropdownClear('city')}
          dataFallback={placeholders?.noDataFound}
          disabled={dropdownOptions?.cityOptions?.length <= 0 || loading}
        />

        <SelectDropdownCustom
          classname={`${styles.filterDropdown} ${
            dropdownOptions?.areaOptions?.length <= 0 || loading ? styles.disabled : ''
          }`}
          options={dropdownOptions?.areaOptions}
          setSelected={(item: any) => {
            handleDropdownSelect(item, onChange, 'area');
          }}
          placeholder={placeholders?.areaPlaceholder}
          selected={value?.selectedArea}
          onBlur={onBlur}
          loading={!isOverlay ? dropdownLoading : false}
          showSelectedTick={true}
          isClose={true}
          dataFallback={placeholders?.noDataFound}
          disabled={dropdownOptions?.areaOptions?.length <= 0 || loading}
        />
      </>
    );
  };
  const buttonLabel = () => {
    if (inPage) {
      if (selected) {
        return placeholders?.buttonLabel;
      } else {
        return setFallBack(placeholders?.searchLabel, 'Search');
      }
    } else {
      return setFallBack(placeholders?.searchLabel, 'Search');
    }
  };

  return (
    <div className={getClass()}>
      <p className={`${styles.filterHeading} ${isOverlay ? '' : styles.overlayHeading}`}>{placeholders?.heading}</p>
      <p className={`${styles.filterDescription} ${isOverlay ? '' : styles.overlayDescription}`}>
        {placeholders?.description}
      </p>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className={`${styles.filter} ${isOverlay ? styles.filterOverlay : ''}`}
        ref={searchRef}
        onClick={() => {
          if ((deviceType === 'desktop' || deviceType === 'tablet') && !isOverlay) {
            return scrollInView();
          }
        }}
      >
        <Controller
          control={control}
          name={placeholders?.fieldName || 'dealerLocator'}
          rules={{
            validate: () => formValidator(getValues(placeholders?.fieldName || 'dealerLocator')),
          }}
          render={({ field: { onChange, onBlur, value } }) => searchDropDownCustom(onChange, onBlur, value)}
        />

        <div className={isOverlay ? styles.overlayBtnWrapper : styles.btnWrapper}>
          <Button
            className={`${styles.submitBtn} ${(disabled && !loading) || dropdownLoading ? styles.disabledBtn : ''} ${
              isOverlay ? styles.overlayBtn : ''
            }`}
            id="classicBtn"
            type="submit"
            onClick={() => {
              if (
                errors?.[placeholders?.fieldName || 'dealerLocator'] ||
                !formValidator(getValues(placeholders?.fieldName || 'dealerLocator'))
              ) {
                setShowToast('true');
                setToastMessage(placeholders?.errorMessage ?? '');
                window.scrollTo(0, 0);
              }
            }}
            loading={loading}
            disabled={(disabled && !loading) || dropdownLoading}
          >
            {buttonLabel()}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default DealerLocatorFilter;
