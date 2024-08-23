interface IArrowRight {
  className?: string;
}
const ArrowRight = (props: IArrowRight) => {
  const { className } = props;
  return (
    <svg viewBox="0 0 32 32" className={className}>
      <path
        d="M20.33,16.48l-7.5,9.12c-0.15,0.18-0.36,0.27-0.58,0.27c-0.17,0-0.34-0.06-0.48-0.17
        c-0.32-0.26-0.37-0.74-0.1-1.06l7.1-8.64l-7.1-8.64c-0.26-0.32-0.22-0.79,0.1-1.06s0.79-0.22,1.06,0.1l7.5,9.12
        C20.55,15.8,20.55,16.2,20.33,16.48z"
      />
    </svg>
  );
};

export { ArrowRight };
