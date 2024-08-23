import useGTM from './useGTM';

const GTMHelper = (data: any) => {
  const { sendEvent } = useGTM();
  if (!data) return;

  const gtmData: any = {};
  Object.keys(data)?.map((item: string) => {
    if (
      (data?.[item] && (typeof data?.[item] === 'number' || data?.[item]?.length > 0)) ||
      data?.[item]?.toString() == 'false' ||
      data?.[item]?.toString() == 'true' ||
      data?.[item] === 0
    ) {
      gtmData[item] = data?.[item];
    }
  });
  sendEvent({ ...gtmData }, true);
};

export default GTMHelper;
