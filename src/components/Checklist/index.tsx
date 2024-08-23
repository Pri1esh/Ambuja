import { IChecklist } from '@interfaces';
import { getIconByName } from '@utils';
import styles from './checklist.module.scss';

const Checklist = (props: IChecklist) => {
  const { compData } = props;
  return (
    <div className={styles.wrapper}>
      <span className={styles.icon}>{getIconByName(compData?.iconname)}</span>
      <p className={styles.desc}>{compData?.description}</p>
    </div>
  );
};

export default Checklist;
