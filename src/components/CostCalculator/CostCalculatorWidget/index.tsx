import { ICostCalculator } from '@interfaces';
import styles from './costCalculatorWidget.module.scss';
import TextSection from './TextSection';
import WidgetSection from './WidgetSection';
import CustomImage from 'src/components/CustomImage';

const CostCalculatorWidget = (props: ICostCalculator) => {
  const { compData, inPage = true } = props;

  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.sectionWrapper}`}>
        {compData?.textData && <TextSection compData={compData?.textData} />}
        <div className={styles.ImageBox}>
        <CustomImage
            lazy="false"
            src={{
              mobileSource: compData?.textData?.iconImage,
              tabletSource: compData?.textData?.iconImage,
              defaultSource: compData?.textData?.iconImage||''
            }}
            loader="false"
            alt={"cost calculator"}
          />
        </div>
        {/* <WidgetSection compData={compData} inPage={inPage} /> */}
      </div>
    </div>
  );
};

export default CostCalculatorWidget;
