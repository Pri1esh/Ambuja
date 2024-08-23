const scrollTabIntoView = (parent: any, tab: any) => {
  if (
    parent?.getBoundingClientRect().left + parent?.getBoundingClientRect().width - tab?.getBoundingClientRect().width <
    tab?.getBoundingClientRect().left
  ) {
    parent?.scrollBy({
      left: tab?.getBoundingClientRect().left - parent?.getBoundingClientRect().left - 40,
      behavior: 'smooth',
    });
  } else if (
    tab?.getBoundingClientRect().right - tab?.getBoundingClientRect().width - parent?.getBoundingClientRect()?.left <=
      0 ||
    tab?.getBoundingClientRect().left - parent?.getBoundingClientRect().left - tab?.getBoundingClientRect().width <= 0
  ) {
    parent?.scrollBy({
      left:
        tab?.getBoundingClientRect().right -
        tab?.getBoundingClientRect().width -
        parent?.getBoundingClientRect()?.right / 2,
      behavior: 'smooth',
    });
  }
};

export default scrollTabIntoView;
