import { CustomIcon, CustomImage, CustomLink } from '@components';
import { IProducts } from '@interfaces';
import { useState } from 'react';
import styles from './products.module.scss';

const Products = (props: { compData: IProducts[] }) => {
  const { compData } = props;
  const [show, setShow] = useState<boolean>(false);
  const [activeProduct, setActiveProduct] = useState<string>('');

  const handleDropdownToggle = (id: string) => {
    activeProduct === id && show ? setShow(false) : setShow(true);
    setActiveProduct(id);
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        {compData?.map((item, index: number) => (
          <div key={`${item?.productLabel + index}`} className={styles.product}>
            <button
              className={`${styles.productImage} ${show && activeProduct === item?.activeId ? styles.show : ''}`}
              onClick={() => handleDropdownToggle(item?.activeId)}
            >
              <span className={styles.label}>
                {item?.productLabel} <CustomIcon iconName={'up'} />
              </span>
              <CustomImage src={{ defaultSource: item?.imageSource }} alt={item?.imageAlt} />
            </button>

            <div className={`${styles.productDD} ${show && activeProduct === item?.activeId ? styles.dropdown : ''}`}>
              <ul>
                {item?.subProduct?.length > 0 &&
                  item?.subProduct?.map((item, index: number) => (
                    <li key={`${item?.linkText + index}`}>
                      <CustomLink href={item?.link} target={item?.linkTarget}>
                        {item?.linkText}
                      </CustomLink>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
