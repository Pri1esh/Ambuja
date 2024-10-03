import { CustomLink } from '@components';
import { IGetInTouchData } from '@interfaces';
import { getIconByName, useDeviceType } from '@utils';
import { Col, Row } from 'react-bootstrap';
import GetInTouchForm from '../Forms/GetInTouchForm';
import styles from './getInTouch.module.scss';

const GetInTouchData = (props: { compData: IGetInTouchData }) => {
  const { compData } = props;
  const { deviceType } = useDeviceType();

  return (
    <Row className={styles.wrapper}>
      <Col lg={7} className={`mb-md-4 mb-lg-0 ${styles.form}`}>
        {deviceType !== 'desktop' && (
          <>
            <h4 className={styles.topHeading}>{compData?.sectionHeading}</h4>
            {compData?.heading && <h2 className={styles.sectionHeading}> {compData?.heading}</h2>}
          </>
        )}
        {deviceType !== 'desktop' ? (
          <GetInTouchForm />
        ) : (
          <div className={styles.formWrapper}>
            {compData?.textData?.heading && <h3>{compData?.textData?.heading}</h3>}
            <p>{compData?.textData?.description}</p>
            <GetInTouchForm />
          </div>
        )}
      </Col>
      <Col lg={5}>
        {deviceType === 'desktop' && (
          <>
            <h4 className={styles.topHeading}>{compData?.sectionHeading}</h4>
            {compData?.heading && <h2 className={styles.sectionHeading}> {compData?.heading}</h2>}
          </>
        )}
        <h3 className={styles.locationHeading}>{compData?.subHeading}</h3>
        {compData?.items?.map((data: any, key: number) => (
          <div className={styles.addressWrapper} key={`GetInTouch__${data?.heading + key}`}>
            <div className={styles.icon}>
              {getIconByName(data?.iconName)}
              <div>
                {data.heading &&
                  (data?.iconName === 'mail' ? (
                    <CustomLink
                      href={`mailto:${data.heading}`}
                      target="_blank"
                      className={`${data?.iconName === 'mail' ? styles.mail : ''}`}
                    >
                      {data.heading}
                    </CustomLink>
                  ) : (
                    <p className={styles.heading}>{data.heading}</p>
                  ))}
                {data.subHeading && <p className={styles.subHeading}>{data.subHeading}</p>}
                {data.area && <p className={styles.area}>{data.area}</p>}
                {data.city && <p className={styles.city}>{data.city}</p>}
              </div>
            </div>
          </div>
        ))}
      </Col>
    </Row>
  );
};

export default GetInTouchData;
