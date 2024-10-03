import { ICustomLink } from '@interfaces';
import styles from './customLink.module.scss';

const CustomLink = (props: ICustomLink) => {
  const { children, href, className = '', target, onClick } = props;
  const variant = props?.variant ? props?.variant?.toLowerCase() : '';

  const getVariant = (variant: string) => {
    switch (variant) {
      case 'primary':
        return styles.primary;
      case 'underline':
        return styles.underline;
      case 'lightUnderline':
        return styles.lightUnderline;
      case 'button':
        return styles.button;
      case 'bordered':
        return styles.bordered;
      case 'lightbordered':
        return styles.lightbordered;
      case 'anchor':
        return styles.anchor;
      case 'brandcolor':
        return styles.brandcolor;
      default:
        return '';
    }
  };

  return (
    <a
      {...props}
      href={href}
      target={target}
      onClick={onClick}
      className={`${className} ${styles.link} ${getVariant(variant)} ${
        variant === '' || variant === 'underline' ? '' : 'styles.ripple'
      }`}
    >
      {children}
    </a>
  );
};

export default CustomLink;
