'use client';
import { IProductList, IRelatedProductItem } from '@interfaces';
import { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import Details from './Details';
import ProductItem from './ProductItem';
import styles from './productList.module.scss';

const ProductList = (props: IProductList) => {
  const { compData } = props;

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isScroll = sessionStorage.getItem('isScroll') ?? null;
    const scrollToRef = () => {
      if (scrollRef?.current) {
        const headerHeight = 88;
        const targetPosition = scrollRef.current.getBoundingClientRect().top + window.scrollY - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    };

    if (isScroll) {
      scrollToRef();
      sessionStorage.removeItem('isScroll');
    }
  }, []);

  return (
    <section className={styles.wrapper} id={compData?.sectionID} ref={scrollRef}>
      <Container>
        <Details {...props} />
        <div className={styles.productListContainer}>
          {compData?.gallery?.map((product: IRelatedProductItem, i: number) => {
            return <ProductItem key={`${product?.link + i}`} linkText={compData?.linkText} {...product} />;
          })}
        </div>
      </Container>
    </section>
  );
};

export default ProductList;
