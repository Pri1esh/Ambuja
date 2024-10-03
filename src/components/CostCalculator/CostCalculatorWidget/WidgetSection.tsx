import { ICostCalculator } from '@interfaces';
import { useDeviceType } from '@utils';
import CostCalculator from '..';
import styles from './costCalculatorWidget.module.scss';

const WidgetSection = (props: ICostCalculator) => {
  const { compData, inPage } = props;

  const { deviceType } = useDeviceType();

  return (
    <div className={styles.section}>
      <div className={styles.widgetWrapper}>
        {deviceType !== 'mobile' && compData?.labels?.headingLabel && (
          <p className={styles.widgetHeader}>{compData?.labels?.headingLabel}</p>
        )}
        <CostCalculator compData={{ ...compData, labels: { ...compData?.labels, headingLabel: '' } }} inPage={inPage} />
      </div>
    </div>
  );
};

export default WidgetSection;
