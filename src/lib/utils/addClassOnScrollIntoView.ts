const addClassOnScrollIntoView = (threshold: number, className: string, ref: any) => {
  const observer = new IntersectionObserver(
    (el) => {
      if (el[0].isIntersecting) {
        el[0].target.classList.add(className);
      }
    },
    { threshold: threshold },
  );
  ref.current && observer.observe(ref.current);
};

export default addClassOnScrollIntoView;
