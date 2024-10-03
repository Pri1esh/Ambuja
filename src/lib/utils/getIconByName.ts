import { getIcons } from '@utils';
const getIconByName = (iconName = '') => {
  if (iconName) {
    const name = iconName.replace('i-', '').replace(/[^0-9a-z]/gi, '');
    return getIcons(name);
  }
};
export default getIconByName;
