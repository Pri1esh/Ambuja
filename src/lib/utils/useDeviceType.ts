import { useEffect, useState } from 'react';

function getWindowDimensions() {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  } else {
    return { width: 0, height: 0 };
  }
}

function useDeviceType(paramDeviceType = 'desktop') {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  const [deviceType, setDeviceType] = useState(paramDeviceType);

  useEffect(() => {
    let deviceResizeTimeout: NodeJS.Timeout;
    function handleResize() {
      clearTimeout(deviceResizeTimeout);
      deviceResizeTimeout = setTimeout(() => {
        setWindowDimensions(getWindowDimensions());
      }, 500);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowDimensions.width < 768) {
      setDeviceType('mobile');
    } else if (windowDimensions.width >= 768 && windowDimensions.width < 992) {
      setDeviceType('tabletVertical');
    } else if (windowDimensions.width >= 767 && windowDimensions.width < 1025) {
      setDeviceType('tablet');
    } else {
      setDeviceType('desktop');
    }
  }, [windowDimensions]);

  return { windowDimensions, deviceType };
}

export default useDeviceType;
