import FloatingInput from '../FloatingInput';
import styles from './tabInput.module.scss';

const TabInput = (props: any) => {
  const {
    label = '',
    onChange,
    onBlur,
    errorMessage = '',
    fieldName,
    // placeholder = '',
    classname = '',
    value = '',
    inPage = true,
  } = props;

  return (
    <div className={`${styles.wrapper} ${!inPage ? styles.inPageWrapper : ''}`}>
      <FloatingInput
        label={label}
        onChange={(e: { target: { value: string | number } }) => {
          if (parseInt(e?.target?.value?.toString()) > 100000) return;
          e.target.value = Number(e.target.value.toString());
          onChange(e?.target?.value);
        }}
        errorMessage={errorMessage}
        isClear={false}
        onClear={() => onChange('')}
        onBlur={onBlur}
        name={fieldName}
        classname={classname}
        maxLen={6}
        inputType={'number'}
        controlProps={{
          value: value,
        }}
      />
    </div>
  );
};

export default TabInput;
