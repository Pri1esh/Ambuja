import { CustomIcon } from '@components';
const getIcons = (iconName: string, className?: string) => {
  return <CustomIcon iconName={iconName} classname={className} />;
};

export default getIcons;
