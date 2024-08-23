'use client';
import { IScaleSlider } from '@interfaces';
import { addClassOnScrollIntoView } from '@utils';
import { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Details from './Details';
import Slider from './Slider';
import styles from './scaleSlider.module.scss';

const ScaleSlider = (props: IScaleSlider) => {
  const { compData } = props;
  const myref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addClassOnScrollIntoView(0.1, 'slideInUp', myref);
  }, []);
  return (
    <section className={styles.wrapper} ref={myref} id={compData?.sectionID}>
      <Container>
        <Details
          heading={compData?.heading}
          subHeading={compData?.subHeading}
          linkText={compData?.linkText}
          link={compData?.link}
          imageSource={compData?.imageSource}
        />
      </Container>
      <Slider gallery={compData?.gallery} />
    </section>
  );
};

export default ScaleSlider;
