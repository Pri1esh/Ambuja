import { ILegal } from '@interfaces';
import { Col, Row } from 'react-bootstrap';
import styles from './legal.module.scss';
const Legal = (props: ILegal) => {
  const { compData } = props;

  return (
    <Row>
      <Col className={styles.detailContent}>
        {compData?.details?.heading && <h2>{compData?.details?.heading}</h2>}
        <div className={styles.description}>
          {compData?.details?.data && <div dangerouslySetInnerHTML={{ __html: compData?.details?.data }} />}
        </div>
      </Col>
    </Row>
  );
};

export default Legal;
