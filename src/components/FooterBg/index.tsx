import { IFooterBg } from '@interfaces';
import CustomImage from '../CustomImage';

const FooterBg = (props: { compData: IFooterBg }) => {
  const { compData } = props;

  return (
    <CustomImage
      loader="false"
      src={{
        defaultSource: compData?.imageSource,
        tabletSource: compData?.imageSourceTablet,
        mobileSource: compData?.imageSourceMobile,
      }}
    />
  );
};

export default FooterBg;
