import { CustomIcon } from '@components';
import { ICustomToast } from '@interfaces';
import { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import styles from './customToast.module.scss';

const CustomToast = (props: ICustomToast) => {
  const {
    setShow,
    show = '',
    message,
    icon = '',
    classname = '',
    onClose = null,
    autohide = true,
    isIconShow = false,
  } = props;
  const [iconName, setIconName] = useState<string>(icon);

  const showIcon = (show: string) => {
    switch (show) {
      case 'progress':
        setIconName('error');
        break;
      case 'error':
        setIconName('close');
        break;
      case 'success':
        setIconName('tick');
        break;
      default:
        setIconName('');
    }
  };

  const getStyles = (show: string) => {
    switch (show) {
      case 'success':
        return styles.success;
      case 'progress':
        return styles.progress;
      case 'error':
        return styles.error;
      default:
        return '';
    }
  };
  useEffect(() => {
    showIcon(show);
  }, [show]);

  return (
    <div className={`${styles.wrapper} ${classname ?? ''} ${getStyles(show)}`}>
      <Toast
        onClose={() => {
          setShow('');
          if (onClose) onClose();
        }}
        show={show !== ''}
        delay={5000}
        autohide={autohide}
      >
        <div className={`${styles.toastWrapper}`}>
          {iconName && isIconShow && (
            <Toast.Header>
              <div className={styles.toastHeading}>
                <h2>
                  <CustomIcon iconName={iconName} />
                </h2>
              </div>
            </Toast.Header>
          )}
          <Toast.Body>
            <div className={styles.toastbody}>
              <p>{message}</p>
            </div>
          </Toast.Body>
        </div>
      </Toast>
    </div>
  );
};

export default CustomToast;
