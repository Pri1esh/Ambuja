function useGTM() {
  function loadScript(GTM_ID: any) {
    if (document.getElementById('gtm')) {
      return;
    }
    const gtmScript = document.createElement('script');
    gtmScript.type = 'text/javascript';
    gtmScript.id = 'gtm';
    gtmScript.innerText = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl+'';f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer', '${GTM_ID}')`;
    document.head.appendChild(gtmScript);
  }

  function sendEvent(data: any, allowOnDev = false) {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV == 'development' && !allowOnDev) {
      return;
    }
    try {
      if (!(window as any)['google_tag_manager']) {
        console.error('Hey! GTM not found');
        return;
      }
      (window as any).dataLayer.push({
        ...data,
      });
    } catch (e) {
      return;
    }
  }

  return {
    loadScript,
    sendEvent,
  };
}

export default useGTM;
