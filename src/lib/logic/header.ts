import { IGTMData, IHamburgerMenuData, IHeaderCollapseItem, IHeaderSectionItem, IHeaderWrapperMenu } from '@interfaces';
import { GTMHelper, openLink, timeout } from '@utils';

const isAbsoluteHeader = (waitForSticky: boolean, mainNavPosition: number, mainHeaderParent: any) => {
  const mainHeader = mainHeaderParent[0];
  if (waitForSticky) {
    if (document.documentElement.scrollTop >= mainNavPosition) {
      mainHeader.classList.add('sticky');
    } else {
      mainHeader.classList.remove('sticky');
    }
  } else {
    document.documentElement.scrollTop > 0 ? mainHeader.classList.add('sticky') : mainHeader.classList.remove('sticky');
  }
};
const scrollFunction = (
  mainNavPosition: number,
  mainHeaderParentClass: string,
  classToAdd: string,
  isAbsolute = false,
  waitForSticky = false,
  isStatic = false,
) => {
  const mainHeaderParent = document.getElementsByClassName(mainHeaderParentClass);

  if (mainHeaderParent && mainHeaderParent.length > 0) {
    const mainHeader = mainHeaderParent[0];
    if (isAbsolute) {
      isAbsoluteHeader(waitForSticky, mainNavPosition, mainHeaderParent);
    } else {
      document.documentElement.scrollTop > 60 && !isStatic
        ? mainHeader.classList.add(classToAdd)
        : mainHeader.classList.remove(classToAdd);
    }
  }
};

const handleDropdownOpen = (
  val: string,
  openChild: string,
  setOpenChild: React.Dispatch<React.SetStateAction<string>>,
) => {
  if (val === openChild) {
    return setOpenChild('');
  }
  return setOpenChild(val);
};

const collapseAll = (allMenuData: IHeaderWrapperMenu[]) => {
  return new Promise((resolve, reject) => {
    try {
      const allDataItems: IHeaderWrapperMenu[] = [...allMenuData];
      const finalData = allDataItems?.map((data: IHeaderWrapperMenu) => {
        if (data.hasOwnProperty('isOpen')) {
          data.isOpen = false;
        }
        if (data.hasOwnProperty('sectionItems') && data?.sectionItems !== undefined) {
          const finalSection = data.sectionItems?.map((sectionItem: IHeaderSectionItem) => {
            if (sectionItem.hasOwnProperty('isOpen')) {
              sectionItem.isOpen = false;
            }
            return sectionItem;
          });
          data.sectionItems = finalSection;
        }
        if (data.hasOwnProperty('collapseItems') && data?.collapseItems !== undefined) {
          data.isOpen = false;
        }
        return data;
      });

      resolve(finalData);
    } catch (error: any) {
      reject(new Error(error));
    }
  });
};

const WrapperMenu = (data: IHamburgerMenuData[]) => {
  const menuData: IHeaderWrapperMenu[] = [];

  data?.map((menuItem: IHamburgerMenuData) => {
    const menuItemObject = {
      sectionHeader: menuItem?.linkText || '',
      sectionLeftIcon: menuItem?.headerLeftIcon ?? '',
      sectionItems: menuItem?.items,
      collapseItems: menuItem?.collapseItems,
    };
    menuData.push(menuItemObject);
  });

  return menuData;
};

const handleCollapsedClick = async (
  sectionHeader: string,
  linkText: string,
  isOpen: boolean,
  allMenuData: IHeaderWrapperMenu[],
  setAllMenuData: React.Dispatch<React.SetStateAction<IHeaderWrapperMenu[]>>,
) => {
  try {
    await collapseAll(allMenuData).then((allDataItems: any) => {
      const sectionDataIndex = allDataItems.findIndex(
        (filter: { sectionHeader: string }) => filter.sectionHeader === sectionHeader,
      );

      const sectionItemIndex = allDataItems[sectionDataIndex].sectionItems.findIndex(
        (filter: { linkText: string }) => filter.linkText === linkText,
      );
      try {
        allDataItems[sectionDataIndex].sectionItems[sectionItemIndex] = {
          ...allDataItems[sectionDataIndex].sectionItems[sectionItemIndex],
          isOpen: !isOpen,
        };
      } catch (error) {
        allDataItems[sectionDataIndex].sectionItems[sectionItemIndex] = {
          ...allDataItems[sectionDataIndex].sectionItems[sectionItemIndex],
          isOpen: !allDataItems[sectionDataIndex].sectionItems[sectionItemIndex]?.isOpen,
        };
      }
      setAllMenuData(allDataItems);
    });
  } catch (error) {
    console.error(error);
  }
};

const handleCollapsedParentClick = async (
  linkText: string,
  isOpen: boolean,
  allMenuData: IHeaderWrapperMenu[],
  setAllMenuData: React.Dispatch<React.SetStateAction<IHeaderWrapperMenu[]>>,
) => {
  try {
    await collapseAll(allMenuData).then((allDataItems: any) => {
      const sectionDataIndex = allDataItems.findIndex(
        (filter: { sectionHeader: string }) => filter.sectionHeader === linkText,
      );
      try {
        allDataItems[sectionDataIndex].isOpen = !isOpen;
      } catch (error) {
        allDataItems[sectionDataIndex].isOpen = !allDataItems[sectionDataIndex].isOpen;
      }
      setAllMenuData(allDataItems);
    });
  } catch (error) {
    console.error(error);
  }
};

const handleCollapseLinkClick = (
  e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  item: IHeaderCollapseItem | IHamburgerMenuData,
  handleChildOpen: (val: string) => void,
  gtmData?: IGTMData,
) => {
  e.preventDefault();
  if (item?.link) {
    if (typeof window !== 'undefined') {
      timeout(function () {
        openLink(item?.link, item?.linkTarget, e);
      }, 500);
    }
  } else {
    handleChildOpen(item?.linkText);
  }
  GTMHelper(gtmData);
};

export {
  WrapperMenu,
  collapseAll,
  handleCollapseLinkClick,
  handleCollapsedClick,
  handleCollapsedParentClick,
  handleDropdownOpen,
  scrollFunction,
};
