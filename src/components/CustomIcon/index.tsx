import { ICustomIcon } from '@interfaces';
import { useEffect, useState } from 'react';

const CustomIcon = (props: ICustomIcon) => {
  const { iconName, classname } = props;
  const [showIcon, setShowIcon] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setShowIcon(true), 200);
  }, []);

  return <i className={`icon-${iconName} ${classname ?? ''} ${showIcon ? '' : 'opacity-0'}`}></i>;
};
export default CustomIcon;
