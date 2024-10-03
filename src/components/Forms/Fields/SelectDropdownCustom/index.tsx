import { CustomIcon, FloatingInput } from '@components';
import { ISelectDropdownCustom, ISelectDropdownOption } from '@interfaces';
import { useDeviceType } from '@utils';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import Error from '../Error';
import styles from './selectDropdownCustom.module.scss';

const SelectDropdownCustom = (props: ISelectDropdownCustom) => {
  const {
    options = [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelected = () => {},
    placeholder = 'Select Input',
    errorMessage = '',
    selected = null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBlur = () => {},
    classname = '',
    // eslint-disable-next-line react-hooks/rules-of-hooks
    showSelectedTick = false,
    loading = false,
    isClose = true,
    handleOnClear = () => {},
    disabled = false,
    dataFallback = 'No Data Found!',
  } = props;

  const selectedRef = useRef<HTMLDivElement>(null);
  const clearRef = useRef<HTMLSpanElement>(null);
  const dropdownInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<ISelectDropdownOption | null>(selected);
  const [hasFocus, setHasFocus] = useState<boolean>(false);
  const [hasChanged, setHasChanged] = useState<number>(0);
  const [dropdownOptions, setDropdownOptions] = useState(options);
  const { deviceType } = useDeviceType();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deviceType]);

  useEffect(() => {
    setSelectedValue(selected);
    setHasChanged(Math.random());
  }, [selected]);

  useEffect(() => {
    setDropdownOptions(options);
  }, [options]);

  const handleClickOutside = (e: any) => {
    if (
      selectedRef?.current &&
      clearRef?.current &&
      !selectedRef?.current?.contains(e.target) &&
      !clearRef?.current?.contains(e.target) &&
      deviceType !== 'mobile'
    ) {
      setOpen(false);
      setHasChanged(Math.random());
    }
  };

  const removeSelected = () => {
    setOpen(false);
    handleOnClear();
    if (setSelected) setSelected(null);
    setSelectedValue(null);
    setHasChanged(Math.random());
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>, item: ISelectDropdownOption) => {
    if (setSelected) setSelected(item);
    setSelectedValue(item);
    e.stopPropagation();
    setOpen(false);
    setHasFocus(false);
    setDropdownOptions(options);
    setHasChanged(Math.random());
  };

  const filterDropdownOptions = (value: string) => {
    const filteredOptions = options?.filter((i) => i?.label?.toLowerCase()?.includes(value?.toLowerCase()));
    setDropdownOptions(filteredOptions);
  };

  const dropdownList = () => {
    return dropdownOptions?.length > 0 ? (
      <ul>
        {dropdownOptions.map((item: ISelectDropdownOption, index: number) => (
          <li key={`${item?.id + index}`} className={`${selectedValue?.id === item?.id ? styles.selected : ''}`}>
            <Button
              onClick={(e) => {
                handleClick(e, item);
              }}
              type="button"
            >
              {item?.label}
            </Button>
            {showSelectedTick && selectedValue?.id === item?.id && <CustomIcon iconName="tick" />}
          </li>
        ))}
      </ul>
    ) : (
      <div className={styles.noData}>{dataFallback}</div>
    );
  };
  const dropdownListing = () => {
    if (deviceType === 'mobile') {
      return (
        <Offcanvas
          show={open}
          className={styles.offcanvas}
          onHide={() => {
            setOpen(false);
            setTimeout(() => {
              setHasFocus(false);
            }, 350);
          }}
          placement={'bottom'}
          backdropClassName={styles.backdrop}
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body className={styles.offcanvasBody}>
            <h3>{placeholder}</h3>
            <div className={styles.searchBoxParent}>
              <div className={styles.searchBox}>
                <input
                  placeholder={placeholder}
                  autoComplete="off"
                  type="text"
                  onChange={(e) => {
                    filterDropdownOptions(e?.target?.value);
                  }}
                  className={styles.mobileInput}
                />
              </div>
            </div>
            <div className={styles.dropDownoffCanvas} key={dropdownOptions?.toString()}>
              {dropdownList()}
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      );
    } else {
      return <div className={`${styles.dropdownbox} ${open ? styles.selectOpen : ''}`}>{dropdownList()}</div>;
    }
  };

  const dropdownContainer = () => {
    return (
      <span
        ref={clearRef}
        className={`${styles.selectarrow} 
        ${open && styles.selectClose} 
        ${deviceType === 'desktop' && selectedValue?.label && isClose ? styles.crossIcon : ''}`}
      >
        {deviceType !== 'mobile' && selectedValue?.label && open && isClose ? (
          <button onClick={removeSelected} type="button">
            <CustomIcon iconName="close" classname={styles.close} />
          </button>
        ) : (
          <button
            type="button"
            aria-label="arrow"
            onClick={() => {
              if (!open) {
                setDropdownOptions(options);
              }
              setOpen(!open);
            }}
          >
            <CustomIcon iconName="up" classname={styles.angleUp} />
          </button>
        )}
      </span>
    );
  };

  return (
    <div className={`${styles.wrapper} ${classname}`} key={selected?.toString()}>
      <div className={`${styles.selectdropdown} ${errorMessage ? styles.error : ''}`} ref={selectedRef} onBlur={onBlur}>
        {loading ? (
          <div className={`${styles.loader} bgLoader`}></div>
        ) : (
          <>
            <div //NOSONAR
              onFocus={() => {
                if (deviceType === 'mobile' && hasFocus) {
                  setHasFocus(false);
                  dropdownInputRef?.current?.blur();
                  return;
                }
                if (!open) {
                  setDropdownOptions(options);
                }
                setHasFocus(true);
                setOpen(true);
              }}
            >
              <FloatingInput
                key={hasChanged?.toString()}
                inputRef={dropdownInputRef}
                label={placeholder}
                onChange={(e) => {
                  if (e?.target?.value) {
                    deviceType !== 'mobile' && filterDropdownOptions(e?.target?.value);
                  }
                }}
                disabled={disabled}
                defaultValue={selectedValue?.label}
                borderOnFocus={false}
                isClear={false}
                disableBorder={true}
                onBlur={(e: any) => {
                  if (deviceType !== 'mobile') {
                    setHasFocus(false);
                  }
                  if (dropdownOptions !== options && !e?.target?.value) {
                    if (setSelected) setSelected(null);
                    setSelectedValue(null);
                    setHasChanged(Math.random());
                  }
                }}
                readOnly={deviceType === 'mobile'}
              />
            </div>
            {dropdownListing()}
            {dropdownContainer()}
          </>
        )}
      </div>
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  );
};
export default SelectDropdownCustom;
