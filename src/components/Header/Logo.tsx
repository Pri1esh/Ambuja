import { CustomImage, CustomLink } from '@components';
import { ILogo } from '@interfaces';
import styles from './header.module.scss';

const Logo = (props: ILogo) => {
  const { logo, buLink, buLogoAltText = '', linkTarget } = props;
  return (
    <div className={styles.headerLogo}>
      <CustomLink href={buLink} target={linkTarget}>
        <CustomImage
          loader="false"
          type="img"
          itemProp="image"
          src={{ defaultSource: logo ?? '' }}
          alt={buLogoAltText}
        />
      </CustomLink>
    </div>
  );
};

export default Logo;
