import { ICostCalculator } from '@interfaces';
import styles from './costCalculatorWidget.module.scss';
import TextSection from './TextSection';
import WidgetSection from './WidgetSection';

const CostCalculatorWidget = (props: ICostCalculator) => {
  const { compData, inPage = true } = props;

  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.sectionWrapper}`}>
        {compData?.textData && <TextSection compData={compData?.textData} />}
        <WidgetSection compData={compData} inPage={inPage} />
      </div>
    </div>
  );
};

export default CostCalculatorWidget;
