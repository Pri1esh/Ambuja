import { IFormDatePicker } from '@interfaces';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './FormDatePicker.module.scss';

const FormDatePicker = (props: IFormDatePicker) => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { classname, label = '', startDate = Date.now(), onChange = () => {}, placeholder = '' } = props;

  const [selected, setSelected] = useState<Date | null>(startDate);

  const handleChange = (e: Date | null) => {
    setSelected(e);
    if (onChange) onChange(e);
  };

  return (
    <div className={`${styles.datePickerWrapper} ${classname}`}>
      <label>{label || placeholder}</label>
      <DatePicker className={styles.datePicker} selected={selected} onChange={(e) => handleChange(e)} />
      <div className={styles.iconWrapper}></div>
    </div>
  );
};

export default FormDatePicker;
