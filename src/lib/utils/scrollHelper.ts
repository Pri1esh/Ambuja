const getCoords = (elem: any) => {
  const box = elem.getBoundingClientRect();
  const body = document.body;
  const docEl = document.documentElement;
  const scrollTop = window.scrollY || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.scrollX || docEl.scrollLeft || body.scrollLeft;
  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;
  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return {
    top: Math.round(top),
    left: Math.round(left),
  };
};

const getTop = (cords: any, buffer: any, top: any) => {
  if (cords?.top) {
    if (buffer && cords.top > buffer) {
      top = cords.top - buffer;
    } else {
      top = cords.top;
    }
  }
  return top;
};

const scrollHelper = (ref: any, buffer: any, smooth: boolean = true) => {
  if (ref) {
    let top = 0;
    const cords = getCoords(ref);
    top = getTop(cords, buffer, top);

    if (Math.abs(window.scrollY - top) < 10) return;

    setTimeout(() => {
      window.scroll({
        top: top,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }, 2);
  }
};

export default scrollHelper;
