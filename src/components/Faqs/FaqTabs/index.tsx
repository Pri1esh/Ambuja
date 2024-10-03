import { Button } from '@components';
import { IFaqTab, IFaqTabs } from '@interfaces';
import { scrollTabIntoView } from '@utils';
import { useEffect, useRef } from 'react';
import styles from './faqTabs.module.scss';

const FaqTabs = (props: IFaqTabs) => {
  const { compData, handleTabChange, activeTab } = props;
  const parentRef = useRef<HTMLUListElement>(null);
  const activeTabRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setTimeout(() => scrollTabIntoView(parentRef?.current, activeTabRef?.current), 100);
  }, []);

  return (
    <div className={styles.navWrapper}>
      <div className={styles.pageNavWrapper}>
        {compData?.length > 1 && (
          <ul className={styles.pageNav} ref={parentRef}>
            {compData?.map((item: IFaqTab, index: number) => (
              <li key={`faqTab__${item?.categoryID + index}`} className={styles.pageNavItem}>
                <Button
                  variant="faqTab"
                  className={item?.categoryID === activeTab ? 'activeNavItem' : ''}
                  onClick={() => {
                    handleTabChange(item?.categoryID);
                  }}
                >
                  {item?.categoryLabel}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FaqTabs;
