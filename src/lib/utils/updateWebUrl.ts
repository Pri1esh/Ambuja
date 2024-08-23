const updateWebUrl = (params: any) => {
  const currentUrl = new URL(window.location.href);
  Object.keys(params)?.map((param) => {
    if (params[param]) {
      currentUrl.searchParams.set(param, `${params[param]}`);
    } else {
      currentUrl.searchParams.delete(param);
    }
  });
  window.history.replaceState(null, '', currentUrl);
};

export default updateWebUrl;
