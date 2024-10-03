import { CustomIcon } from '@components';
import { ISelectDropdown, ISelectDropdownOption } from '@interfaces';
import { useDeviceType } from '@utils';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import Error from '../Error';
import styles from './selectDropdown.module.scss';

const SelectDropdown = (props: ISelectDropdown) => {
  const {
    options = [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelected = () => {},
    placeholder = '',
    errorMessage = '',
    selected = null,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBlur = () => {},
    classname = '',
    // eslint-disable-next-line react-hooks/rules-of-hooks
    inputRef = useRef(null), //NOSONAR
    // resetOnOptionChange = true,
    showSelectedTick = false,
    loading = false,
    isClose = true,
    handleOnClear = () => {},
  } = props;

  const selectedRef = useRef<HTMLDivElement>(null);
  const clearRef = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<ISelectDropdownOption | null>(selected);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { deviceType } = useDeviceType();

  useEffect(() => {
    setSelectedValue(selected);
  }, [selected]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    if (
      selectedRef?.current &&
      clearRef?.current &&
      !selectedRef?.current?.contains(e.target) &&
      !clearRef?.current?.contains(e.target)
    ) {
      setOpen(false);
    }
  };

  const removeSelected = () => {
    setOpen(false);
    setShowDropdown(false);
    handleOnClear();
    if (setSelected) setSelected(null);
    setSelectedValue(null);
  };

  const handleClick = (e: MouseEvent<HTMLLIElement>, item: ISelectDropdownOption) => {
    if (setSelected) setSelected(item);
    setSelectedValue(item);
    e.stopPropagation();
    setOpen(false);
    setShowDropdown(false);
  };

  const DropdownList = (
    <ul>
      {options.map((item: ISelectDropdownOption, index: number) => (
        <li key={`${item?.id + index}`} className={`${selectedValue?.id === item?.id ? styles.selected : ''}`}>
          <Button
            type="button"
            onClick={(e: any) => {
              handleClick(e, item);
            }}
          >
            {item?.label}
          </Button>
          {showSelectedTick && selectedValue?.id === item?.id && <CustomIcon iconName="tick" />}
        </li>
      ))}
    </ul>
  );

  const dropdownListing = () => {
    if (deviceType === 'mobile') {
      return (
        <Offcanvas
          show={showDropdown}
          className={styles.offcanvas}
          onHide={() => setShowDropdown(false)}
          placement={'bottom'}
          backdropClassName={styles.backdrop}
        >
          <Offcanvas.Header closeButton></Offcanvas.Header>
          <Offcanvas.Body className={styles.offcanvasBody}>
            <h3 className={styles.offcanvasHeading}>{placeholder}</h3>
            <div className={styles.dropDownoffCanvas}>{DropdownList}</div>
          </Offcanvas.Body>
        </Offcanvas>
      );
    } else {
      return <div className={`${styles.dropdownbox} ${open ? styles.selectOpen : ''}`}>{DropdownList}</div>;
    }
  };

  const dropdownContainer = () => {
    return (
      <>
        <span
          ref={clearRef}
          className={`${styles.selectarrow} 
        ${deviceType == 'desktop' ? open && styles.selectClose : showDropdown && styles.selectClose} 
        ${deviceType == 'desktop' && selectedValue && isClose ? styles.crossIcon : ''}`}
        >
          {deviceType !== 'mobile' && selectedValue && open && isClose ? (
            <button onClick={removeSelected} type="button">
              <CustomIcon iconName="close" classname={styles.close} />
            </button>
          ) : (
            <CustomIcon iconName="up" classname={styles.angleUp} />
          )}
        </span>
        {placeholder && (
          <label
            className={selectedValue?.label?.length ? styles.selectfloatinglabel : ''}
            htmlFor={`testId${placeholder?.replace(/ /gi, '')}`}
          >
            {placeholder}
          </label>
        )}
        <div className={styles.selectvalue}>
          <span className={styles.selectvalueLabel}>{selectedValue?.label}</span>
        </div>
      </>
    );
  };
  return (
    <div className={`${styles.wrapper} ${classname}`} key={selected?.toString()}>
      <input className={'visually-hidden'} ref={inputRef} id={`testId${placeholder?.replace(/ /gi, '')}`} />
      <div //NOSONAR
        className={`${styles.selectdropdown} ${errorMessage ? styles.error : ''}`}
        onClick={() => {
          setOpen(!open);
          setShowDropdown(!showDropdown);
        }}
        ref={selectedRef}
        onBlur={() => {
          onBlur();
          setOpen(false);
        }}
      >
        {dropdownListing()}
        {loading ? <div className={`${styles.loader} bgLoader`}></div> : dropdownContainer()}
      </div>
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  );
};
export default SelectDropdown;
