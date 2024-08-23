const useRipple = () => {
  function createRipple(e: any) {
    const button = e.currentTarget;
    button.classList.add('ripple_root');
    const children = button.getElementsByClassName('ripple_waves');
    while (children.length > 0) {
      children[0].parentNode.removeChild(children[0]);
    }

    const circle = document.createElement('span');
    circle.style.position = 'absolute';
    circle.style.pointerEvents = 'none';
    circle.style.borderRadius = 'inherit';
    circle.style.zIndex = '0';
    circle.style.overflow = 'hidden';
    button.appendChild(circle);

    const d = Math.max(button.clientWidth, button.clientHeight);
    const eRect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = d + 'px';
    circle.style.left = e.clientX - eRect.left - d / 2 + 'px';
    circle.style.top = e.clientY - eRect.top - d / 2 + 'px';
    circle.classList.add('ripple_waves');
  }

  function createRippleParam(e: { currentTarget: any; clientX: number; clientY: number }, param: string) {
    const button = e.currentTarget;
    button.classList.add('ripple_root');
    const children = button.getElementsByClassName('ripple_waves');
    while (children.length > 0) {
      children[0].parentNode.removeChild(children[0]);
    }

    const circle = document.createElement('span');
    circle.style.position = 'absolute';
    circle.style.pointerEvents = 'none';
    circle.style.borderRadius = 'inherit';
    circle.style.zIndex = '0';
    circle.style['overflow'] = 'hidden';
    button.appendChild(circle);

    const d = Math.max(button.clientWidth, button.clientHeight);
    const eRect = button.getBoundingClientRect();

    circle.style.width = circle.style.height = d + 'px';
    circle.style.left = e.clientX - eRect.left - d / 2 + 'px';
    circle.style.top = e.clientY - eRect.top - d / 2 + 'px';
    param && circle.classList.add('ripple_waves', param);
  }

  return { createRipple, createRippleParam };
};

export default useRipple;
