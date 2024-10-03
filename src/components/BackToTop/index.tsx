import { CustomIcon } from '@components';
import { useRipple } from '@utils';
import { FC, useEffect, useState } from 'react';
import styles from './backtoTop.module.scss';

const BackToTop: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const { createRippleParam } = useRipple();

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }
    const footer: any = document.getElementsByClassName('footer_wrapper');
    const backTotop = document.getElementsByClassName(styles.backToTop);
    const scrollFunctionName = 'scroll';
    const scrollFunction = () => {
      if (footer && backTotop && footer.length > 0 && backTotop.length > 0) {
        const footerHeight = footer[0]?.offsetTop + 20;
        const scrollHeight = document.body.scrollTop || document.documentElement.scrollTop;
        const footerOffset = footerHeight - window.innerHeight;
        if (footerOffset < scrollHeight) {
          backTotop && backTotop.length > 0 && backTotop[0] && backTotop[0].classList.add(styles.active);
        } else {
          backTotop && backTotop.length > 0 && backTotop[0] && backTotop[0].classList.remove(styles.active);
        }
      }
    };
    document.addEventListener(scrollFunctionName, scrollFunction);

    return () => {
      document.removeEventListener(scrollFunctionName, scrollFunction);
    };
  }, []);

  const toggleVisible = () => {
    if (typeof document === 'undefined') {
      return;
    }
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500) {
      setVisible(true);
    } else if (scrolled <= 500) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  typeof document !== 'undefined' && window.addEventListener('scroll', toggleVisible);

  return (
    <button
      className={styles.backToTop}
      onClick={(e) => {
        createRippleParam(e, 'primary_waves');
        setTimeout(() => {
          scrollToTop();
        }, 500);
      }}
      style={{ display: visible ? 'block' : 'none' }}
    >
      <div className={styles.inner}>
        <CustomIcon iconName="up" />
        <span>Back to Top</span>
      </div>
    </button>
  );
};
export default BackToTop;
