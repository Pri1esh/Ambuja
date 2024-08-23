const apiDataFilter = (data: any) => {
  if (!data) {
    return null;
  }
  const arr: any = {};
  data = data?.sitecore?.route?.placeholders;
  if (data?.['header']) {
    arr['header'] = componentDataFilter(data?.['header']);
  }
  if (data?.['footer']) {
    arr['footer'] = componentDataFilter(data?.['footer']);
  }
  if (data?.['main']) {
    arr['main'] = componentDataFilter(data?.['main']);
    arr['seoData'] = arr['main']?.seoData;
  }
  return arr;
};

const componentDataFilter = (data: any) => {
  const arr: any = {};
  data?.map((component: any) => {
    arr[component?.componentName] = component;
  });
  return arr;
};

export default apiDataFilter;
