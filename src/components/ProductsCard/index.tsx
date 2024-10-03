'use client';
import { Container } from 'react-bootstrap';
import Slider from './Slider';
import styles from './productsCard.module.scss';

const ProductsCard = (props: any) => {
  const { compData, className = '' } = props;

  return (
    <div className={`${styles.wrapper} ${className} ${compData?.theme?.includes('blue') ? styles.blue : ''}`}>
      <Container>
        {compData?.heading && <h2 className={styles.heading}>{compData?.heading}</h2>}
        <Slider cardDetails={compData} />
      </Container>
    </div>
  );
};

export default ProductsCard;
