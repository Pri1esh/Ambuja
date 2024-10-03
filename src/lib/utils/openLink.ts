const openLink = (link: string, target: string, event?: any) => {
  if (link === '#') {
    return;
  }
  if (event?.ctrlKey || event?.metaKey) {
    window.open(link, '_blank');
  } else if (target && target !== '') {
    window.open(link, target);
  } else {
    window.location.href = link;
  }
};

export default openLink;
