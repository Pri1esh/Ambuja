import { CustomImage } from '@components';
import { ICheckbox } from '@interfaces';
import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import Error from '../Error';
import styles from './checkbox.module.scss';

const Checkbox = (props: ICheckbox) => {
  const { control, errors, classname = '', compData, setValue = null } = props;
  const {
    fieldName,
    fieldID,
    placeholder,
    errorMessages,
    selected = false,
    whatsAppLabel = '',
    imageSource,
    imageAlt,
  } = compData;

  useEffect(() => {
    if (setValue) setValue(fieldName, selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.checkData} ${classname}`}>
        <div className={styles.inputWrapper}>
          <Controller
            control={control}
            name={fieldName}
            rules={{
              required: errorMessages?.requiredFieldErrorMessage,
            }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <input
                type="checkbox"
                className="form-check-input"
                id={fieldID}
                checked={value || false}
                onBlur={onBlur}
                onChange={onChange}
                ref={ref}
              />
            )}
          />
          <label className="form-check-label" htmlFor={fieldID}>
            {fieldName?.toLowerCase() === 'getupdatewhatsapp' ? (
              <>
                {placeholder}
                <span>
                  {whatsAppLabel}{' '}
                  {imageSource && (
                    <CustomImage
                      src={{
                        defaultSource: imageSource,
                      }}
                      alt={imageAlt}
                    />
                  )}
                </span>
              </>
            ) : (
              <div className={`${styles.agreeTxt}`} dangerouslySetInnerHTML={{ __html: placeholder }}></div>
            )}
          </label>
        </div>
        {errors[fieldName] && (
          <div className={styles.error}>
            <Error errorMessage={errorMessages?.requiredFieldErrorMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkbox;
