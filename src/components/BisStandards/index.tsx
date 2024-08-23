import { IBisStandard, IBisStandardItem } from '@interfaces';
import styles from './bisStandards.module.scss';

const BisStandards = (props: IBisStandard) => {
  const { compData } = props;
  return (
    <div className={styles.wrapper}>
      <ul>
        {compData.map((rule: IBisStandardItem) => {
          return (
            <li key={rule.name}>
              <span className={styles.standardName}>{rule.name}</span>
              <span className={styles.standard}>{rule.standard}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default BisStandards;
