import { CountrySpriteImage } from '@components';
import { ICountryFlag, ICountryFlagDropdown } from '@interfaces';
import { useDeviceType } from '@utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import styles from './countryFlagDropdown.module.scss';

const CountryFlagDropdown = (props: ICountryFlagDropdown) => {
  const { selectedCountry, selectCountry, options, countryLabel, setCountryDropDown } = props;

  const [showDropdown, setShowDropdown] = useState<boolean>(true);
  const [filteredCountries, setFilteredCountries] = useState<ICountryFlag[]>(options);
  const [searchValue, setSearchValue] = useState('');
  const clearRef = useRef<HTMLAnchorElement>(null);
  const countryDropDownRef = useRef<HTMLDivElement>(null);
  const { deviceType } = useDeviceType();

  useEffect(() => {
    setFilteredCountries(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryDropDownRef, clearRef]);

  const handleClickOutside = (event: any) => {
    if (
      countryDropDownRef.current &&
      !countryDropDownRef.current.contains(event.target) &&
      countryLabel.current &&
      !countryLabel.current.contains(event.target)
    ) {
      setCountryDropDown(false);
      resetSearch(event);
    }
  };

  const resetSearch = (event: any) => {
    event.preventDefault();
    setSearchValue('');
    setFilteredCountries(options);
  };

  const filterCountry = (e: any) => {
    const { value } = e.target;
    if (value && value != '') {
      const filteredOptions: ICountryFlag[] = options?.filter(
        (item: ICountryFlag) =>
          item?.dialCode?.includes(value) || item?.countryName?.toLowerCase()?.startsWith(value?.toLowerCase()),
      );
      setFilteredCountries(filteredOptions);
    } else {
      setFilteredCountries(options);
    }
  };

  const FlagDropdown = useMemo(() => {
    return (
      <div className={styles.countryCodeLayer} id="countryid" ref={countryDropDownRef}>
        <div className={styles.searchBoxParent}>
          <div className={styles.searchBox}>
            <input
              placeholder="Select Country"
              autoComplete="off"
              type="text"
              value={searchValue}
              onChange={(e) => {
                filterCountry(e);
                setSearchValue(e.target.value);
              }}
              className={styles.searchField}
            />
            {searchValue !== '' ? (
              <a href="#" ref={clearRef} className={styles.clearIcon} onClick={(event) => resetSearch(event)}>
                <span>x</span>
              </a>
            ) : (
              ''
            )}
          </div>
        </div>
        {filteredCountries?.map((item: ICountryFlag) => (
          <button
            className={styles.countryList}
            onClick={(event) => {
              selectCountry(item);
              resetSearch(event);
            }}
            key={item?.countryName}
          >
            <li
              className={
                item?.dialCode?.replace('+', '') == selectedCountry?.dialCode?.replace('+', '')
                  ? styles.activeCountry
                  : ''
              }
            >
              <CountrySpriteImage code={item?.isO2} />
              <p>{item?.countryName}</p>
              <span>{item?.dialCode}</span>
            </li>
          </button>
        ))}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return deviceType === 'mobile' ? (
    <Offcanvas
      show={showDropdown}
      className={styles.offcanvas}
      onHide={() => setShowDropdown(false)}
      placement={'bottom'}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <h3 className={styles.offcanvasHeading}>Country Code</h3>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className={styles.offcanvasBody}>{FlagDropdown}</Offcanvas.Body>
    </Offcanvas>
  ) : (
    FlagDropdown
  );
};

export default CountryFlagDropdown;
