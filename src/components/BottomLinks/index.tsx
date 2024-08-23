import { IBottomLinks } from '@interfaces';
import { getIconByName, useDeviceType } from '@utils';
import { Container, Row } from 'react-bootstrap';
import CustomImage from '../CustomImage';
import CustomLink from '../CustomLink';
import styles from './bottomLinks.module.scss';

const BottomLinks = (props: { bottomLinksData: IBottomLinks }) => {
  const { deviceType } = useDeviceType();
  const { bottomLinksData } = props;
  const handleClick = (linkName: string) => {
    if (window !== undefined) {
      window.location.href = linkName;
    }
  };
  return (
    <section className={styles.bottomLinks}>
      <Container>
        <Row>
          {bottomLinksData?.links?.map((item: any) => {
            return (
              <div key={`${item?.link}__${item?.linkText}`}>
                <CustomLink
                  className={styles.bottomLinksCol}
                  href={item?.link}
                  target={item?.linkTarget}
                  onClick={(e: any) => {
                    e.preventDefault();
                    handleClick(item?.link);
                  }}
                >
                  {item?.iconName && (
                    <CustomImage
                      loader="false"
                      src={{
                        defaultSource: item?.iconName,
                      }}
                    />
                  )}

                  <div className={styles.bottomLinkText}>
                    <label>{item?.linkText}</label>
                    <p>{item?.description}</p>
                  </div>
                  {deviceType == 'mobile' && getIconByName('arrowright')}
                </CustomLink>
              </div>
            );
          })}
        </Row>
      </Container>
    </section>
  );
};

export default BottomLinks;
