import { Button, CustomLink } from '@components';
import { ICustomToggle, IFaqs } from '@interfaces';
import { GTMHelper, useRipple } from '@utils';
import cx from 'classnames';
import { useRef, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import styles from './faqs.module.scss';

const CustomToggle = (props: ICustomToggle) => {
  const { createRippleParam } = useRipple();
  const { children, eventKey, index, toggleClass } = props;
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <button
      className={styles.itemHeading}
      onClick={(e) => {
        decoratedOnClick(e);
        createRippleParam(e, 'primary_waves');
        toggleClass(index);
      }}
    >
      {children}
    </button>
  );
};

const Faqs = (props: IFaqs) => {
  const { compData, noTransition = false, isExpandable } = props;
  const refwrapper = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(-1);
  const [open, setOpen] = useState(false);
  const totalItems = compData?.data?.length ?? 0;
  const defaultCount = Number(compData?.defaultCount) ? Number(compData?.defaultCount) : 5;
  const [numberOfItems, setNumberOfItems] = useState<number>(defaultCount);

  const toggleClass = (key: number) => {
    if (key === isActive) {
      setIsActive(-1);
    } else {
      setIsActive(key);
    }
  };

  const handleViewToggle = () => {
    setOpen(!open);
    setNumberOfItems((numberOfItems) => (numberOfItems === defaultCount ? totalItems : defaultCount));
  };

  return (
    <section
      className={cx(styles.wrapper, { [styles.noTransition]: noTransition })}
      ref={refwrapper}
      id={compData?.sectionID}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {compData?.sectionHeading ? (
        <h2 className={styles.sectionHeading}>{compData?.sectionHeading}</h2>
      ) : (
        <h2 className={styles.sectionHeading}>{compData?.data?.[0]?.categoryLabel}</h2>
      )}
      <div className={styles.faqDataWrapper}>
        <Accordion>
          <Card>
            {compData?.data?.map((item, index: number) => {
              if (index < numberOfItems) {
                return (
                  item?.heading && (
                    <Card.Header
                      itemScope
                      itemType="https://schema.org/Question"
                      itemProp="mainEntity"
                      className={` ${styles.item} ${isActive == index ? styles.active : ''}`}
                      id={item?.questionID}
                      key={`${item?.questionID + index}`}
                    >
                      <CustomToggle eventKey={`faq${index}`} toggleClass={toggleClass} index={index}>
                        <p itemProp="name">{item?.heading}</p>
                      </CustomToggle>
                      <Accordion.Collapse
                        itemScope
                        itemType="https://schema.org/Answer"
                        itemProp="acceptedAnswer"
                        eventKey={`faq${index}`}
                      >
                        <>
                          <div
                            itemProp="text"
                            className={styles.itemBody}
                            dangerouslySetInnerHTML={{ __html: item?.description }}
                          />
                          {compData?.acceptenceDesc && (
                            <div className={styles.acceptenceBtn}>
                              <p>{compData?.acceptenceDesc}</p>
                              <div className={styles.btnWrap}>
                                <Button variant="grey" className={styles.helpfulBtn}>
                                  {compData?.yesBtnLabel}
                                </Button>
                                <Button variant="grey" className={styles.helpfulBtn}>
                                  {compData?.noBtnLabel}
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      </Accordion.Collapse>
                    </Card.Header>
                  )
                );
              }
            })}
          </Card>
        </Accordion>
        <div className={styles.viewAll}>
          {isExpandable && totalItems > defaultCount ? (
            <Button variant="link" onClick={handleViewToggle}>
              {open ? compData?.collapseBtnLabel : compData?.expandBtnLabel}
            </Button>
          ) : (
            <CustomLink
              href={compData?.link}
              variant={'underline'}
              target={compData?.linkTarget}
              onClick={() => {
                GTMHelper({
                  ...compData?.gtmData,
                });
              }}
            >
              {compData?.linkText}
            </CustomLink>
          )}
        </div>
      </div>
    </section>
  );
};

export default Faqs;
