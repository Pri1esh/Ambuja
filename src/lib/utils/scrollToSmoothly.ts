const timeOut = (item: any, parentContainerRef: any, deviceType: any) => {
  if (item && parentContainerRef?.current) {
    const scrollOffset = deviceType === 'desktop' ? 170 : parentContainerRef?.current?.clientHeight + 15;
    const topDiff = Math.abs(item?.getBoundingClientRect().top - scrollOffset);
    if (topDiff > 10) {
      window.scrollBy({
        top: item?.getBoundingClientRect().top - scrollOffset,
      });
    }
  }
};
const scrollToSmoothly = (pos: number, time: number, item: any, parentContainerRef: any, deviceType: any) => {
  const currentPos = window.scrollY;
  let start: number | null = null;
  if (time == null) time = 500;
  pos = +pos;
  time = +time;
  window.requestAnimationFrame(function step(currentTime) {
    start = !start ? currentTime : start;
    const progress = currentTime - start;
    if (currentPos < pos) {
      window.scrollTo(0, ((pos - currentPos) * progress) / time + currentPos);
    } else {
      window.scrollTo(0, currentPos - ((currentPos - pos) * progress) / time);
    }
    if (progress < time) {
      window.requestAnimationFrame(step);
    } else {
      window.scrollTo(0, pos);
    }
  });

  setTimeout(() => {
    timeOut(item, parentContainerRef, deviceType);
  }, 350);
};

export default scrollToSmoothly;
