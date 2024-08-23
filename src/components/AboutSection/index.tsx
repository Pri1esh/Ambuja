import { Button } from '@components';
import { IAboutSection } from '@interfaces';
import { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import styles from './aboutSection.module.scss';

const AboutSection = (props: IAboutSection) => {
  const { isHomePage, compData } = props;
  const { heading, moreContent, content, readMore, readLess, sectionID } = compData;
  const [open, setOpen] = useState(false);

  return (
    <div className={`${styles.wrapper} ${isHomePage ? styles.homePageWrapper : ''}`} itemProp="about" id={sectionID}>
      {heading && <h1 className={styles.heading}>{heading}</h1>}
      {content && (
        <div
          itemProp="mainEntity"
          className={`${styles.text} ${!open ? styles.textOverflow : ''}`}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {moreContent && (
        <Collapse in={open}>
          <div className={styles.text} dangerouslySetInnerHTML={{ __html: moreContent }} />
        </Collapse>
      )}
      {moreContent && (
        <Button
          isActive="false"
          onClick={() => setOpen(!open)}
          variant="link"
          aria-controls="example-collapse-text"
          aria-expanded={open}
          className={styles.readMore}
        >
          {open ? <>{readLess}</> : <>{readMore}</>}
        </Button>
      )}
    </div>
  );
};

export default AboutSection;
