import { CustomLink } from '@components';
import { ILink, ISitemapLink, ISitemapLinksList } from '@interfaces';
import { Col } from 'react-bootstrap';
import styles from './sitemap.module.scss';

const SitemapLinks = (props: ISitemapLinksList) => {
  const { compData } = props;

  return (
    <section className={`container ${styles.sitemapLinkWrapper}`}>
      {compData?.map((data: ISitemapLink, key: number) => (
        <div itemProp="mainEntity" key={`${data?.linkText + key}`} className={styles.sitemapLinks}>
          {data?.link ? (
            <CustomLink href={data?.link} target={data?.linkTarget}>
              <h2 itemProp="headline" className={styles.heading}>
                {data?.linkText}
              </h2>
            </CustomLink>
          ) : (
            <h2 itemProp="headline" className={styles.heading}>
              {data?.linkText}
            </h2>
          )}

          <Col sm={12} lg={12} key={`${data?.linkText + key}`}>
            {data?.items?.map((currKey: ILink, key: number) => (
              <CustomLink
                target={currKey?.linkTarget ? currKey?.linkTarget : ''}
                href={currKey?.link ? `${currKey?.link}` : '#'}
                key={`${currKey?.link + key}`}
              >
                {currKey?.linkText}
              </CustomLink>
            ))}
          </Col>
        </div>
      ))}
    </section>
  );
};

export default SitemapLinks;
