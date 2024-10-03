import { ICardData } from '@interfaces';
import { useDeviceType } from '@utils';
import { Col, Container, Row } from 'react-bootstrap';
import MediaCard from './MediaCard';
import TextCard from './TextCard';
import styles from './twoColumnCard.module.scss';

const MessageCard = (props: { cardData: ICardData }) => {
  const { cardData } = props;
  const { deviceType } = useDeviceType();

  return (
    <div className={styles.messageCard}>
      <Container className={styles.rowWrapper}>
        <Row className="justify-content-lg-between">
          <Col lg={6} md={6}>
            <div className={styles.mediaWrapper}>
              {deviceType === 'mobile' && cardData?.heading && <h2 className={styles.heading}>{cardData?.heading}</h2>}
              <MediaCard cardData={cardData} />
            </div>
          </Col>
          <Col lg={5} md={6}>
            <div className={styles.textAreaWrapper}>
              {deviceType !== 'mobile' && cardData?.heading && <h2 className={styles.heading}>{cardData?.heading}</h2>}
              <TextCard cardData={{ ...cardData, heading: '' }} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MessageCard;
