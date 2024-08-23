import { CustomIcon } from '@components';
import { IFileInput, IFileInputSelected } from '@interfaces';
import { useRef, useState } from 'react';
import Error from '../Error';
import styles from './fileInput.module.scss';

const FileInput = (props: IFileInput) => {
  const {
    selected,
    setSelected,
    label = '',
    description = '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onBlur = () => {},
    errorMessage = '',
    classname = '',
    // eslint-disable-next-line react-hooks/rules-of-hooks
    inputRef = useRef(null), //NOSONAR
  } = props;

  const [showClear, setShowClear] = useState<boolean>(false);

  const handleFileSelected = (e: {
    target: { files: Iterable<IFileInputSelected> | ArrayLike<IFileInputSelected> };
  }): void => {
    const files: IFileInputSelected[] = Array.from(e?.target?.files);
    setSelected(files[0]);
  };

  const removeSelectedFile = () => {
    if (inputRef?.current) {
      inputRef.current.value = '';
    }
    setSelected(null);
  };

  const handleClick = () => {
    selected && removeSelectedFile();
  };

  return (
    <div className={`${styles.wrapper} ${classname}`}>
      <div className={`${styles.inputWrapper} ${errorMessage ? styles.error : ''}`}>
        <input
          className={'visually-hidden'}
          type="file"
          id="fileInput"
          ref={inputRef}
          onChange={(e: any) => handleFileSelected(e)}
          onBlur={() => {
            onBlur();
            setShowClear(false);
          }}
          onFocus={() => {
            selected && showClear ? setShowClear(true) : setShowClear(false);
          }}
        />
        <div className={styles.labelWrapper}>
          <label htmlFor="fileInput">
            <span className={`${selected ? styles.selected : ''}`}>{label}</span>{' '}
            <span className={selected ? styles.selectedFile : ''}>{selected?.name}</span>
            {(!selected || !showClear) && (
              <span className={styles.attachment}>
                <CustomIcon iconName={'attachment'} />
              </span>
            )}
          </label>
          {selected && showClear && (
            <button onClick={handleClick} className={`${styles.icon} ${styles.crossIcon}`}>
              <CustomIcon iconName={'close'} />
            </button>
          )}
        </div>
      </div>
      {description && <span className={styles.info}>{description}</span>}
      {errorMessage && <Error errorMessage={errorMessage} />}
    </div>
  );
};

export default FileInput;
