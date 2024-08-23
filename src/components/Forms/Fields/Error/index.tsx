import { IError } from '@interfaces';
import styles from './error.module.scss';

const ErrorModule = (props: IError) => {
  const { errorMessage = '' } = props;
  return errorMessage ? <div className={styles.errorMsg}>{errorMessage}</div> : <></>;
};

export default ErrorModule;
