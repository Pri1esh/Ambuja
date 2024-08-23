import { Button } from '@components';
import { useEffect, useRef, useState } from 'react';
import styles from './twoColumnList.module.scss';

export interface IDescription {
  compData: {
    readMore?: string;
    readLess?: string;
    description: string;
  };
}

const Description = (props: IDescription) => {
  const { compData } = props;
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const textRef = useRef<any>(null);
  const [isEllipsisActive, setIsEllipsisActive] = useState(false);

  useEffect(() => {
    const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight);
    const textHeight = textRef.current.offsetHeight;
    const numLines = textHeight / lineHeight;

    setIsEllipsisActive(numLines > 3);
  }, []);

  return (
    <>
      {compData?.description && (
        <div className={styles.description}>
          <p ref={textRef} className={isEllipsisActive && !isExpanded ? styles.truncated : ''}>
            {compData?.description}
          </p>
          {isEllipsisActive && (
            <Button
              isActive="false"
              onClick={() => setIsExpanded(!isExpanded)}
              variant="link"
              aria-controls="example-collapse-text"
              aria-expanded={isExpanded}
              className={styles.readBtn}
            >
              {isExpanded ? compData?.readLess : compData?.readMore}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default Description;
