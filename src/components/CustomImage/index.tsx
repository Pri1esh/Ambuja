import { ICustomImage } from '@interfaces';
import { useDeviceType } from '@utils';
import Image from 'next/image';

const getImageSource = (deviceType: any, src: any) => {
  let imageSource = '';
  if (deviceType === 'mobile') {
    imageSource = src?.mobileSource || src?.defaultSource;
  } else if (deviceType === 'tablet') {
    imageSource = src?.tabletSource || src?.defaultSource;
  } else {
    imageSource = src?.defaultSource;
  }
  // uncomment for local fallback 
  return 'https://uat-s.ambujahelp.in' + imageSource || src?.defaultSource;
  // return imageSource || src?.defaultSource;
};

const CustomImage = (props: ICustomImage) => {
  const {
    lazy = 'true',
    src = { mobileSource: '', tabletSource: '', defaultSource: '' },
    alt = '',
    priority = false,
    width = 1,
    height = 1,
    className = '',
    type = 'img',
    loader = 'true',
  } = props;
  const { deviceType } = useDeviceType();
  const customLoader = (src: string) => src;

  return type === 'nextImg' ? (
    <Image
      {...props}
      loading={lazy === 'true' && !priority ? 'lazy' : 'eager'}
      src={getImageSource(deviceType, src) || src?.defaultSource}
      loader={() => customLoader(getImageSource(deviceType, src) || src?.defaultSource)}
      alt={alt}
      width={width}
      height={height}
      key={deviceType}
      className={`${className}${loader === 'true' ? ' bgLoader' : ''}`}
    />
  ) : (
    <img
      {...props}
      loading={lazy === 'true' && !priority ? 'lazy' : 'eager'}
      src={getImageSource(deviceType, src) || src?.defaultSource}
      alt={alt}
      key={deviceType}
      className={`${className}${loader === 'true' ? ' bgLoader' : ''}`}
    />
  );
};
export default CustomImage;
