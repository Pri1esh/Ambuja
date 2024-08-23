import { ICountup } from '@interfaces';
import { useEffect, useRef, useState } from 'react';
import CountUp from 'react-countup';
import styles from '../achievements.module.scss';

const Countup = (props: ICountup) => {
  const [count, setCount] = useState<number>(parseFloat(props.start));
  const [suffix, setSuffix] = useState<string>();
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState<number>();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const size = props.endCount.split('').length;
    if (isNaN(parseFloat(props.endCount.split('')[size - 1]))) {
      setCount(
        parseFloat(
          props.endCount
            .split('')
            .slice(0, size - 1)
            .join(''),
        ),
      );
      setIndex(
        props.endCount.split('').includes('.')
          ? props.endCount
              .split('')
              .slice(0, size - 1)
              .join('')
              .split('.')[1].length
          : 0,
      );
      setSuffix(props.endCount.split('')[size - 1]);
    } else {
      setIndex(props.endCount.split('').includes('.') ? props.endCount.split('.')[1].length : 0);
      setCount(parseFloat(props.endCount));
    }

    const observer = new IntersectionObserver(
      (el) => {
        if (el[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 },
    );

    ref.current && observer.observe(ref.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.count} ref={ref}>
      <CountUp
        start={parseFloat(props.start)}
        end={inView ? count : 0}
        suffix={suffix ?? ''}
        decimals={index}
        useEasing={true}
        duration={parseInt(props.delay)}
      >
        {({ countUpRef }) => <strong ref={countUpRef}></strong>}
      </CountUp>
    </div>
  );
};

export default Countup;
