import styles from './customLoader.module.scss';

interface ICustomLoaderProps {
  bg?: string;
}

const CustomLoader = (props: ICustomLoaderProps) => {
  const style = props.bg ? { background: props.bg } : undefined;

  return (
    <span className={styles.loader}>
      <span className={styles.loaderDot} style={style}></span>
      <span className={styles.loaderDot} style={style}></span>
      <span className={styles.loaderDot} style={style}></span>
    </span>
  );
};

export default CustomLoader;
