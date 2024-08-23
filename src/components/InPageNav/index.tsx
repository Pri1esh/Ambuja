import { IGTMData } from '@interfaces';
import { GTMHelper, scrollToSmoothly, useDeviceType } from '@utils';
import { useEffect, useRef, useState } from 'react';
import styles from './inPageNav.module.scss';

const InPageNav = (props: any) => {
  const { tabsData, defaultActiveTab = '' } = props;
  const activeTabRef = useRef<HTMLLIElement>(null);
  const parentContainerRef = useRef<HTMLDivElement>(null);
  const { deviceType } = useDeviceType();
  const [activeTab, setActiveTab] = useState<string>('');

  useEffect(() => {
    tabsData?.length && tabsData[0]?.linkText && setActiveTab(tabsData[0]?.linkText);
    let timer: any = null;
    window.addEventListener(
      'scroll',
      function () {
        if (timer !== null) {
          clearTimeout(timer);
        }
        timer = setTimeout(function () {
          handleScroll();
        }, 50);
      },
      false,
    );

    return () => {
      window.removeEventListener(
        'scroll',
        function () {
          if (timer !== null) {
            clearTimeout(timer);
          }
          timer = setTimeout(function () {
            handleScroll();
          }, 50);
        },
        false,
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => defaultActiveTab && handleSmoothScroll(`#${defaultActiveTab}`), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultActiveTab]);

  const handleClick = () => {
    const parent = parentContainerRef?.current;
    const tab = activeTabRef?.current;
    const parentWidth = parent?.clientWidth ?? 0;
    const tabOffsetLeft = tab?.offsetLeft ?? 0;
    const tabWidth = tab?.clientWidth ?? 0;
    const firstTabId = tabsData[0]?.link;
    const firstTab = document?.querySelector(firstTabId);
    const firstWidth = firstTab?.offsetLeft || 0;
    const leftWidth = tab?.getBoundingClientRect().left ?? 0;

    if (tabOffsetLeft > parentWidth - tabWidth) {
      parent?.scrollBy({ left: leftWidth - firstWidth, behavior: 'smooth' });
    } else {
      parent?.scrollBy({ left: tabOffsetLeft - parentWidth - tabWidth, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    for (let index = tabsData?.length - 1; index >= 0; index--) {
      if (
        !tabsData[index].link?.includes('/') &&
        parentContainerRef?.current &&
        window.scrollY >=
          document.querySelector(tabsData[index].link)?.offsetTop -
            (deviceType === 'desktop' ? 180 : parentContainerRef?.current?.clientHeight + 15)
      ) {
        setActiveTab(tabsData[index]?.linkText);
        handleClick();
        break;
      }
    }
    if (
      !tabsData[0].link?.includes('/') &&
      parentContainerRef?.current &&
      tabsData &&
      window.scrollY <=
        document.querySelector(tabsData[0].link)?.offsetTop -
          (deviceType === 'desktop' ? 180 : parentContainerRef?.current?.clientHeight + 15)
    ) {
      setActiveTab(tabsData[0]?.linkText);
      handleClick();
    }
  };

  const handleSmoothScroll = (link: string) => {
    parentContainerRef?.current &&
      scrollToSmoothly(
        (document.querySelector(link) as HTMLElement)?.offsetTop -
          (deviceType === 'desktop' ? 170 : parentContainerRef?.current?.clientHeight + 15),
        300,
        document.querySelector(link),
        parentContainerRef,
        deviceType,
      );
  };

  return (
    <div className={styles.stickyTop}>
      <div className={styles.btngroup} ref={parentContainerRef}>
        <ul>
          {tabsData?.map((data: { linkText: string; link: any; gtmData: IGTMData }, key: number) => (
            <li
              itemProp="relatedLink"
              key={`${data?.linkText + key}`}
              className={`${activeTab === data?.linkText ? 'tabActive' : 'inactive'}`}
              ref={activeTab === data?.linkText ? activeTabRef : null}
            >
              <a
                itemProp="sameAs"
                title={data?.linkText}
                href={data?.link}
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll(data?.link);
                  GTMHelper(data?.gtmData);
                }}
              >
                {data.linkText}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default InPageNav;
