import React, { Dispatch, HTMLAttributeAnchorTarget, ReactNode, SetStateAction } from 'react';
import { Control, UseFormGetValues, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';

export interface IPage {
  data: { header: any; footer: any; main: any };
  error: string;
  errorMessage?: string;
  category?: string;
  device?: string;
  filter?: IDealerPageFilter;
}

export interface IDealerPageFilter {
  state: string;
  city: string;
  area: string;
}
export interface ILayoutProps {
  children?: ReactNode;
  footerData?: any;
  headerData?: any;
  seoData?: ISeoData;
  className?: string;
  isHomePage?: boolean;
  mainBannerData?: string;
  headerAbsolute?: boolean;
  navBarType?: string;
  defaultActiveTab?: string;
  showHeader?: boolean;
}

export interface ISeoData {
  metaDescription: string;
  metaKeywords: string;
  browserTitle: string;
  ogDescription: string;
  ogTitle: string;
  ogImage: string;
  robotsTags: string;
  ogKeyword: string;
  canonicalUrl: string;
  googleSiteVerification: string;
  msValidate: string;
  orgSchema: IOrgSchema;
}

export interface IOrgSchema {
  name: string;
  url: string;
  logo: string;
  streetAddress: string;
  addressRegion: string;
  postalCode: string;
  telephone: string;
  contactType: string;
  areaServed: string;
  sameAs: any[];
}

export interface IGTMData {
  event: string;
  category: string;
  page_type: string;
  sub_category?: string | null;
  title?: string | null;
  label?: string | null;
  banner_category?: string | null;
  index?: number | string | null;
  section_title?: string | null;
  video_duration?: string | null;
}

export interface IFormGTM {
  submitEvent: string;
  gtmCategory: string;
  gtmSubCategory: string;
  pageType: string;
  failEvent: string;
}

export interface ICareerForm {
  compData: {
    sectionHeading?: string;
    antiforgeryToken?: string;
    formFields?: IFieldData[];
    checkboxField?: ICheckboxFieldData;
    reCaptchaField?: IFieldData;
    submitButton?: { buttonText?: string };
    sectionID?: string;
    theme?: string;
    formGTMData?: IFormGTM;
    thankYouData?: {
      heading?: string;
      description?: string;
    };
    progressData?: {
      heading?: string;
      description?: string;
    };
    formFailData?: {
      heading?: string;
      description?: string;
    };
  };
}

export interface IFieldData {
  fieldType: string;
  fieldName: string;
  isClear?: boolean;
  required?: boolean;
  placeholder: string;
  fieldOptions?: { label: string; id: string }[];
  selected?: boolean;
  fieldID?: string;
  fieldDescription?: string;
  maxAllowedLength?: number;
  minRequiredLength?: number;
  maxAllowedFileSize?: number | string;
  minRequiredFileSize?: number | string;
  errorMessages: IFormErrorMessages;
  whatsAppLabel?: string;
  gtmData?: IGTMData;
}

export interface IFormErrorMessages {
  requiredFieldErrorMessage?: string;
  maxLengthErrorMessage?: string;
  minLengthErrorMessage?: string;
  maxFileSizeErrorMessage?: string;
  minFileSizeErrorMessage?: string;
  regexErrorMessage?: string;
}

export interface IFooter {
  compData: IFooterData;
  isHomePage?: boolean;
}

export interface IFooterData {
  mainNavigations?: any;
  socialLinks?: any;
  copyRight?: any;
  buCopyright?: any;
  largeFooter?: boolean;
  logo: any;
  bottomLinks: IBottomLinks;
  backgroundImage: IFooterBg;
}
export interface IFloatingInput {
  key?: any;
  type?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange?: (a: any) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  controlProps?: any;
  name?: string;
  errorMessage?: string;
  classname?: string;
  isClear?: boolean;
  borderOnFocus?: boolean;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onClear?: () => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onBlur?: (a?: any) => void;
  maxLen?: number | string;
  defaultValue?: string;
  inputType?: string;
  isVerified?: boolean;
  alignValueToRight?: boolean;
  onFocus?: (a: any) => void;
  disableBorder?: boolean;
  readOnly?: boolean;
}

export interface IButton {
  children?: any;
  className?: string;
  variant?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
  isActive?: string;
}

export interface ICheckbox {
  control?: Control<any, any>;
  errors?: any;
  classname?: string;
  compData: ICheckboxFieldData;
  setValue: UseFormSetValue<any>;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export interface ICheckboxFieldData {
  url?: string;
  target?: string;
  fieldName: string;
  fieldID?: string;
  placeholder: string;
  errorMessages: IFormErrorMessages;
  selected?: boolean;
  gtmData?: IGTMData;
  whatsAppLabel?: string;
  imageSource?: string;
  imageAlt?: string;
}
export interface IError {
  errorMessage?: string;
}

export interface IRecaptcha {
  control?: Control<any, any>;
  controlName: string;
  errors?: any;
  errorMessage?: string;
  classname?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  reCaptchaRef: React.RefObject<any>;
}

export interface IFileInputSelected {
  name: string;
  lastModified: number;
  lastModifiedDate: Date;
  webkitRelativePath: string;
  size: number;
  type: string;
}
export interface IFileInput {
  selected?: IFileInputSelected;
  setSelected: (i: IFileInputSelected | null) => void;
  label?: string;
  description?: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onBlur?: () => void;
  errorMessage?: string;
  classname?: string;
  inputRef: React.RefObject<HTMLInputElement>;
}

export interface IFormDatePicker {
  classname?: string;
  label?: string;
  startDate?: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onChange?: (e: Date | null) => {};
  placeholder?: string;
}

export interface ICountryFlag {
  countryName: string;
  dialCode: string;
  isO3: string;
  isO2: string;
  untermEnglish: string;
  id: string;
  contactNoLength: string;
}

export interface IMobileNumberData {
  phoneNumber?: string;
  countryCode?: string;
  alpha2Code?: string;
}
export interface IMobileNumberInput {
  selectedCountryCode?: string;
  label?: string;
  countryCode?: boolean;
  onChangeMobileNumber?: (e: IMobileNumberData) => void;
  onBlur?: () => void;
  errorMessage?: string;
  options?: ICountryFlag[];
  isDropdown?: boolean;
  controlProps?: any;
  contactNoLen?: number;
  isClear?: boolean;
  classname?: string;
  name?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  value?: string;
}

export interface ICountryFlagDropdown {
  selectedCountry?: ICountryFlag;
  selectCountry: (i: ICountryFlag) => void;
  options: ICountryFlag[];
  countryLabel: React.RefObject<HTMLDivElement>;
  setCountryDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ISelectDropdownOption {
  placeholder?: string;
  id: string;
  label: string;
  type?: string;
}
export interface ISelectDropdown {
  options?: ISelectDropdownOption[];
  setSelected?: (i: ISelectDropdownOption | null) => void;
  placeholder?: string;
  errorMessage?: string;
  selected?: ISelectDropdownOption | null;
  onBlur?: () => void;
  classname?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  resetOnOptionChange?: boolean;
  showSelectedTick?: boolean;
  loading?: boolean;
  isClose?: boolean;
  handleOnClear?: () => void;
  dataFallback?: string;
  disabled?: boolean;
}

export interface ISelectDropdownCustom {
  options?: ISelectDropdownOption[];
  setSelected?: (i: ISelectDropdownOption | null) => void;
  placeholder?: string;
  errorMessage?: string;
  selected?: ISelectDropdownOption | null;
  onBlur?: () => void;
  classname?: string;
  showSelectedTick?: boolean;
  loading?: boolean;
  isClose?: boolean;
  handleOnClear?: () => void;
  dataFallback?: string;
  disabled?: boolean;
}
export interface ICountrySprite {
  code?: string;
}
export interface ICustomVideo {
  compData: IVideoData;
  classname?: string;
  isOverlayRequired?: boolean;
}

export interface IVideoData {
  heading?: string;
  isOverlayRequired?: boolean;
  mediaType?: string;
  videoSource?: string;
  videoSourceMobile?: string;
  videoSourceTablet?: string;
  videoSourceOgg?: string;
  videoSourceMobileOgg?: string;
  videoSourceTabletOgg?: string;
  sectionID?: string;
  defaultVideoSource?: string;
  defaultVideoSourceTablet?: string;
  defaultVideoSourceMobile?: string;
  defaultVideoSourceOgg?: string;
  defaultVideoSourceTabletOgg?: string;
  defaultVideoSourceMobileOgg?: string;
  autoplay?: boolean;
  playText?: string;
  welcomeText?: string;
  posterImage?: string;
  uploadDate?: string;
  seoDescription?: string;
  seoName?: string;
  gtmVideoStart?: IGTMData;
  gtmVideoProgress?: IGTMData;
  gtmVideoComplete?: IGTMData;
}

export interface IBaseSlider {
  settings: any;
  isMobSlider?: boolean;
  isTabSlider?: boolean;
  nextArrowClass?: string;
  prevArrowClass?: string;
  children?: any;
  cardRef?: React.MutableRefObject<HTMLDivElement>;
  classname?: string;
  asNavFor?: any;
  sliderRef?: any;
}
export interface IPrevNextArrow {
  className?: string;
  onClick?: () => void;
}
export interface ICustomLink {
  children?: any;
  href?: string;
  className?: string;
  variant?: string;
  target?: string;
  download?: boolean;
  onClick?: any;
}
export interface IErrorPage {
  error?: string;
  buttonTitle?: string;
  title?: string;
  description?: string;
  imageAlt?: string;
  showButton?: boolean;
  heading?: string;
  backToHome?: boolean;
  errorMessage?: string;
}

export interface ICustomIcon {
  iconName?: string;
  classname?: string;
}

export interface IFullWidthImage {
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
}

export interface ICustomToast {
  setShow: React.Dispatch<SetStateAction<string>>;
  show?: string;
  icon?: string;
  classname?: string;
  autohide?: boolean;
  onClose?: () => void;
  message: string;
  isIconShow?: boolean;
}

export interface ICustomImage {
  type?: string;
  src: { mobileSource?: string; tabletSource?: string; defaultSource: string };
  alt?: string;
  title?: string;
  itemProp?: string;
  className?: string;
  layout?: 'fixed' | 'fill' | 'intrinsic' | 'responsive';
  objectFit?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onClick?: any;
  lazy?: string;
  ref?: React.MutableRefObject<HTMLImageElement>;
  loader?: string;
}

export interface IInPageNavData {
  title: string;
  url: string;
}

export interface IDealerLocatorError {
  stateError: string;
  cityError: string;
  areaError: string;
}

export interface IDealerDropdownOptions {
  cityOptions: any[];
  areaOptions: any[];
}

export interface IDealerLocatorWidget {
  compData: IDealerLocatorWidgetData;
  filterDealers?: any;
  selected?: ISelectedDealerFilters | null;
  isOverlay?: boolean;
  inPage?: boolean;
  loading?: boolean;
  disabled: boolean;
  setDisabled: React.Dispatch<SetStateAction<boolean>>;
  setShowToast: React.Dispatch<SetStateAction<string>>;
  setToastMessage: React.Dispatch<SetStateAction<string>>;
}

export interface ISelectedDealerFilters {
  selectedState: { label: string; id: string } | null;
  selectedCity: { label: string; id: string } | null;
  selectedArea: { label: string; id: string } | null;
}
export interface IDealer {
  organisation: string;
  name: string;
  contact: string;
  pincode: string;
  stateId: string;
  state: string;
  cityId: string;
  city: string;
  areaId: string;
  area: string;
  icon: string;
  profileIcon: string;
  addressIcon: string;
  contactIcon: string;
  address: string;
}

export interface IDealersList {
  compData: IDealersListData;
  dealersToShow?: number;
  isOverlay?: boolean;
  setDisabled: React.Dispatch<SetStateAction<boolean>>;
  selectedResultFilters: ISelectedDealerFilters | null;
  editData: IEditData;
  handleClose: () => void | null;
}

export interface ISelectedFilters {
  compData: IEditData;
  onEditClick: () => void;
  selectedResultFilters: ISelectedDealerFilters | null;
}

export interface IDealerDetail {
  id: number;
  labels: IDealerDetailLabel;
  dealer: IDealer;
}
export interface IDealerDetailLabel {
  nameLabel: string;
  mobileNoLabel: string;
  pincodeLabel: string;
  dealersNearbyLabel: string;
  resultsLabel: string;
  buttonLabel: string;
  showMoreLabel: string;
  overlayHeading: string;
}

export interface IDealerDropdownItem {
  id: string;
  label: string;
  type: string;
  cityOptions: {
    id: string;
    label: string;
    type: string;
    areaOptions: { id: string; label: string; type: string };
  };
}
export interface IProductTypeData {
  id: string;
  label: string;
  products: {
    id: string;
    label: string;
    url: string;
  }[];
}

export interface INoResult {
  heading: string;
  subHeading: string;
  imageSource: string;
  imageSourceMobile: string;
  imageSourceTablet: string;
  imageAlt: string;
  title: string;
  text: string;
}
export interface IDealerLocator {
  compData: {
    dealerLocatorFilterData: IDealerLocatorWidgetData;
    noResult?: INoResult;
    showInPage: number;
    showInMobile: number;
    showInOverlay: number;
    redirectUrl?: string;
    editData: IEditData;
  };
  inPage?: boolean;
  showOffcanvas?: boolean;
  setShowOffcanvas?: React.Dispatch<SetStateAction<boolean>>;
  setShowToast: React.Dispatch<SetStateAction<string>>;
  setToastMessage: React.Dispatch<SetStateAction<string>>;
}

export interface IEditData {
  editButtonLabel: string;
  stateLabel: string;
  cityLabel: string;
  areaLabel: string;
}

export interface IDealersListData {
  labels: IDealerDetailLabel;
  details: IDealer[];
}

export interface IDealerLocatorWidgetData {
  redirectUrl?: string;
  gtmData: IGTMData;
  options: any;
  placeholders: {
    statePlaceholder: string;
    cityPlaceholder: string;
    areaPlaceholder: string;
    fieldName: string;
    heading: string;
    description: string;
    buttonLabel: string;
    errorMessage?: string;
    noDataFound?: string;
    searchLabel?: string;
  };
}

export interface ISocialLinks {
  socialData?: ISocialLinksData[];
}

export interface ISocialLinksData {
  url?: string;
  label: string;
  target?: string;
  gtmData?: IGTMData;
}

export interface ICustomToggle {
  children: any;
  eventKey: string;
  index: number;
  toggleClass: (index: number) => void;
}

export interface IFaqItemData {
  heading: string;
  description: string;
  questionID: string;
  categoryID?: string;
  categoryLabel?: string;
}

export interface IFaqData {
  sectionHeading?: string;
  data?: IFaqItemData[];
  link?: string;
  linkText?: string;
  linkTarget?: string;
  sectionID?: string;
  gtmData?: IGTMData;
  acceptenceDesc?: string;
  yesBtnLabel?: string;
  noBtnLabel?: string;
  expandBtnLabel?: string;
  collapseBtnLabel?: string;
  defaultCount?: number;
}

export interface IFaqPageContent {
  faqs: IFaqData;
}

export interface IFaqs {
  compData: IFaqData;
  noTransition?: boolean;
  isExpandable?: boolean;
}

export interface IFaqTab {
  categoryLabel?: string;
  categoryID: string;
}

export interface IFaqTabs {
  compData: IFaqTab[];
  handleTabChange?: any;
  activeTab?: string;
}

export interface ISearchList {
  compData: ISearchListData[];
}

export interface ISearchListData {
  heading: string;
  description?: string;
  id?: string | number;
  url?: string;
  target?: string;
}

export interface IupdateCostInCostEstimation {
  prevPrice: number;
  qty: number;
  newPrice: number;
  totalAmount: number;
  setTotalAmount: Dispatch<SetStateAction<number>>;
  type: string;
  setPercentageData: Dispatch<SetStateAction<any>>;
  percentageData: any;
  labourCharges: number;
  setLabourCharges: Dispatch<SetStateAction<number>>;
}
export interface ICostCalculatorLabels {
  headingLabel: string;
  headingIcon?: string;
  editButtonLabel?: string;
  totalAreaLabel?: string;
  areaLabel?: string;
  downloadEstimateLabel?: string;
  downloadEstimateIcon?: string;
  pdfLabels?: {
    pdfHeading: string;
    pdfMaterialLabel: string;
    pdfPricePerUnitLabel: string;
    pdfQuantityLabel: string;
    pdfTotalCostLabel: string;
    pdfFileName: string;
    gtmData?: IGTMData;
  };
  gtmData?: IGTMData;
}
export interface ICostCalculator {
  compData: {
    labels: ICostCalculatorLabels;
    textData?: ITextSection;
    tabData: any[];
  };
  inPage?: boolean;
}

export interface IConstructionDetails {
  compData: {
    buttonTabs: IConstructionTabRadioOption[];
    inputTabs: IConstructionTabInputTab[];
    labels: {
      headingLabel: string;
      submitButtonLabel: string;
      defaultActiveKey: number;
      gtmData: IGTMData;
    };
    submitButton: IConstructionSubmitButton;
  };
  handleFormSubmit?: (payload: any, id: string, buttonPropeties: any) => void;
  inPage?: boolean;
  selectedValues?: IConstructionTabValues | null;
  apiData?: any;
}

export interface IConstructionTabRadioOption {
  label: string;
  placeholder: string;
  errorMessage: string;
  id: string;
}

export interface IConstructionTabInputTab {
  type: string;
  placeholder: string;
  errorMessage: string;
  options?: ISelectDropdownOption[];
  fieldName?: string;
}

export interface IConstructionTabValues {
  structureType: string;
  dropdown: string;
  area: number | string;
}

export interface IConstructionSubmitButton {
  type: 'submit' | 'link';
  link?: string;
  linkTarget?: string;
}
export interface IMaterialData {
  materialDropdownOptions: IConstructionTabInputTab | null;
  materialInfo: IMaterialSlab[];
}

export interface IMaterialSlab {
  label: string;
  qty: number;
  icon: string;
  type: string;
  calculatorNum?: number;
}

export interface IMaterialEstimateFilter {
  constructionStage: ISelectDropdownOption | undefined;
}
export interface ICostCalculatorBody {
  getCostCalculatorTabs: (data: any) => any[];
  labels: ICostCalculatorLabels;
  tabData: any[];
  getAmountDetail: (amount: number) => {
    type: string;
    value: string | number;
  };
  handleClose: () => void;
  activeTab: number;
  show: boolean;
  inPage: boolean;
  pdfData: ICostPdfData[];
  totalAmount: number;
  selectedValues?: IConstructionTabValues | null;
}

export interface IConstructionTooltipData {
  title: string;
  description: string;
}
export interface ICostSlab {
  label: string;
  qty: number;
  icon: string;
  updateCost: (prevPrice: number, qty: number, newPrice: number, label: string, type: string) => Promise<void>;
  calculatorNum: number;
  type: string;
  priceData: IPriceData[];
  setPriceData: React.Dispatch<SetStateAction<IPriceData[]>>;
  defaultPrice: string | number;
}

export interface ICostEstimation {
  materialData: IMaterialData;
  handleFilterChange: (type: string, value: ISelectDropdownOption | null) => void;
  compData: {
    labels: {
      headingLabel: string;
      materialLabel: string;
      pricePerUnitLabel: string;
      quantitytLabel: string;
      totalCostLabel: string;
      priceLabel: string;
    };
  };
  updateCost: (prevPrice: number, qty: number, newPrice: number, label: string, type: string) => Promise<void>;
  totalAmount: GLuint64;
  selectedValues?: IConstructionTabValues | null;
  priceData: IPriceData[];
  setPriceData: React.Dispatch<SetStateAction<IPriceData[]>>;
}

export interface IPriceData {
  label: string;
  price: string | number;
}
export interface ICostPdfData {
  type: string;
  label: string;
  price?: number;
  qty: number;
}

export interface ICostAreaSelected {
  ground: number;
  first: number;
  second: number;
  third: number;
}

export interface IAchievementItem {
  icon: string;
  start: string;
  count: string;
  delay: string;
  desc: string;
}
export interface IAchievements {
  data: IAchievementItem[];
}

export interface ICountup {
  start: string;
  endCount: string;
  delay: string;
  count?: string;
}

export interface IQuarryToLorry {
  compData: {
    imageSource: string;
    imageSourceMobile: string;
    imageSourceTablet: string;
    imageAlt: string;
    imageTitle: string;
    heading: string;
    description: string;
    link: string;
    linkTarget: string;
    linkText: string;
    gtmData: IGTMData;
  };
}
export interface IGetInTouchForm {
  compData: {
    heading: string;
    fields: {
      fieldType: string;
      isClear?: boolean;
      required?: boolean;
      placeholder?: string;
      fieldOptions?: { label: string; id: string }[];
      selected?: boolean;
      fieldID?: string;
      fieldDescription?: string;
      maxAllowedLength?: number | string;
      minRequiredLength?: number | string;
      maxAllowedFileSize?: number | string;
      minRequiredFileSize?: number | string;
      errorMessages: IFormErrorMessages;
      fieldName: string;
      options: IDDOption[];
    }[];
  };
  onSubmit: (data?: any) => any;
  control: Control<any, any>;
  handleSubmit: UseFormHandleSubmit<any>;
  getValues: UseFormGetValues<any>;
  errors: any;
}

export interface IDDOption {
  id: string;
  label: string;
}

export interface IMobileNumber {
  phoneNumber?: string;
  countryCode?: string;
}

export interface IOtpInput {
  getIntouchOtpData: any;
  submit: (e: any, inputOtp: string, setInputValues: any) => Promise<void>;
  onHide: () => void;
  mobileNumber: IMobileNumber | null;
  resend: () => Promise<void>;
  otpErr: string;
  disableForm?: boolean;
  isModalOpen?: boolean;
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  productType?: string;
}

export interface IOtpFields {
  compData: IOtpInput;
}

export interface IVerticalTabs {
  HandleManageDetails?: any;
  defaultActiveKey?: number | string;
  tabData?: any;
  className?: string;
  isClick?: boolean;
  horizontalTabView?: boolean;
  onClick?: (e?: any) => void;
  onItemClick?: (e?: any) => void;
  autoIds?: any;
  ripple?: boolean | string;
  transition?: boolean;
  isItemAdded?: boolean;
  disableForwardTabs?: boolean;
}
export interface IAboutSection {
  compData: {
    heading?: string;
    moreContent: string;
    content: string;
    readMore?: string;
    readLess?: string;
    sectionID?: string;
  };
  isHomePage?: boolean;
}

export interface ISitemapLinksList {
  compData: ISitemapLink[];
}

export interface ISitemapLink {
  linkText: string;
  link?: string;
  linkTarget?: string;
  items: ILink[];
}

export interface ILink {
  link: string;
  linkText: string;
  linkTarget: string;
  gtmData?: any;
}

export interface IImage {
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
  imageTitle?: string;
}

export interface IBreadcrumbItem {
  children? : ReactNode;
  active: boolean;
  className?: string;
}

export interface IBreadcrumb {
  items: { active?: boolean; linkTarget?: string; linkText?: string; link: string; gtmData?: string }[];
}

export interface IBreadcrumbs {
  list?: any;
  onItemClick?: (e?: any) => void;
  className?: string;
  itemProps?: any;
  showOnMobile?: boolean;
  theme?: string;
}
export interface IHeader {
  compData: {
    addOnClass?: string;
    back?: boolean;
    logo?: string;
    buLink?: string;
    buLogoAltText?: string;
    buBackBtnText?: string;
    buBackBtnLink?: string;
    navData: IHeaderNavData[];
    topbarList: ITopBarList[];
    menuData: IHeaderMenuData;
    scrollOnAbsolute?: boolean;
    stopHeaderAnimate?: boolean;
    reference?: React.MutableRefObject<HTMLDivElement | null>;
    isBordered?: boolean;
    hamburgerMenuData: IHamburgerMenuData[];
    pageHeading?: string;
  };
  navCallback?: () => void;
  waitForSticky?: boolean;
  isAbsolute?: boolean;
  isStatic?: boolean;
  isHomePage?: boolean;
  navBarType?: string;
  defaultActive?: string;
}

export interface IHeaderMenuData {
  gtmData?: IGTMData;
  hamburgerMenuData: IHamburgerMenuData[];
}

export interface IHamburgerMenuData {
  linkText: string;
  link: string;
  linkTarget: string;
  headerLeftIcon?: string;
  headerRightIcon?: string;
  items?: IHeaderSectionItem[];
  collapseItems?: IHeaderCollapseItem[];
  itemLeftIcon?: string;
  isOpen?: boolean;
}

export interface IHeaderWrapperMenu {
  sectionHeader: string;
  sectionLeftIcon: string;
  sectionItems?: IHeaderSectionItem[];
  collapseItems?: IHeaderCollapseItem[];
  isOpen?: boolean;
}

export interface IHeaderSectionItem {
  collapseItems: IHeaderCollapseItem[];
  link: string;
  linkTarget: string;
  itemLeftIcon: string;
  linkText: string;
  isOpen: boolean;
  gtmData?: IGTMData;
  highlightLabel?: string;
}
export interface IHelpandsupport {
  linkText: string;
  items: IHeaderCollapseItem[];
}

export interface IAdaniBusiness {
  linkText: string;
  link: string;
  headerLeftIcon: string;
  headerRightIcon: string;
  collapseItems?: IHeaderCollapseItem[];
}

export interface IHelpDropdown {
  linkText: string;
  link: string;
  headerLeftIcon: string;
  headerRightIcon: string;
  items: IHelpDropdownItem[];
}

export interface IHelpDropdownItem {
  linkText: string;
  gtmData?: IGTMData;
  link: string;
  linkTarget: string;
  itemLeftIcon: string;
  itemRightIcon?: string;
  collapseItems?: IHeaderCollapseItem[];
  isActive?: boolean;
}

export interface IHeaderCollapseItem {
  linkText: string;
  gtmData: IGTMData;
  link: string;
  linkTarget: string;
  itemLeftIcon: string;
  itemSubText?: string;
  linkHeading?: string;
}
export interface ITopBarList {
  phone: string;
  phoneLink: string;
  phoneIcon: string;
  linkText: string;
  link: string;
  headerLeftIcon: string;
  headerRightIcon: string;
  items: ITopBarListItem[];
}

export interface ITopBarListItem {
  linkText: string;
  itemSubText: string;
  gtmData?: IGTMData;
  link: string;
  linkTarget: HTMLAttributeAnchorTarget;
  itemLeftIcon: string;
  isActive?: boolean;
}
export interface IHeaderNavData {
  linkText: string;
  headerCallback: boolean;
  items: INavDataItem[];
  link?: string;
  linkTarget?: string;
  isOpen: boolean;
  defaultImage?: string;
  gtmData?: IGTMData;
  columnCount: number;
  isActive?: boolean;
  activeId?: string;
}

export interface INavDataItem {
  linkText: string;
  gtmData?: IGTMData;
  link: string;
  linkTarget: string;
  columnCount?: number;
  subMenu?: INavDataItemSubMenu[];
}
export interface INavDataItemSubMenu {
  link: string;
  linkText: string;
  linkTarget: string;
}
export interface IMainNavDropdownMenu {
  id: boolean;
  data: IHeaderNavData;
  subMenu: INavDataItemSubMenu[];
  setSubMenu: React.Dispatch<React.SetStateAction<INavDataItemSubMenu[]>>;
}

export interface ILogo {
  logo?: string;
  buLink?: string;
  buLogoAltText?: string;
  linkTarget?: string;
}

export interface IMainNav {
  navData: IHeaderNavData[];
  pageName?: string;
  navCallback?: () => void;
  gtmData?: IGTMData;
  defaultActive?: string;
}

export interface INavBrand {
  menuData: IHamburgerMenuData[];
  logo?: string;
  buLink?: string;
  backIcon?: boolean;
  handleBackIcon?: () => void;
  buLogoAltText?: string;
  pageName?: string;
  searchData?: any;
  reference?: React.MutableRefObject<HTMLDivElement | null>;
  searchActive?: boolean;
  isBordered?: boolean;
  gtmData?: IGTMData;
  pageHeading?: boolean;
}
export interface ICollapsePanel {
  sectionItem?: IHeaderSectionItem;
  onCollapseClick: () => void;
  pageName?: string;
  gtmData?: IGTMData;
}
export interface IHamburger {
  menuData: IHamburgerMenuData[];
  logo?: string;
  buLink?: string;
  buLogoAltText?: string;
  pageName?: string;
  gtmData?: IGTMData;
  linkTarget?: string;
}
export interface INavBar {
  navBarType?: string;
  pageHeading?: string;
  navData: IHeaderNavData[];
  menuData: IHamburgerMenuData[];
  logo?: string;
  buLink?: string;
  buLogoAltText?: string;
  pageName?: string;
  reference?: React.MutableRefObject<HTMLDivElement | null>;
  isBordered?: boolean;
  defaultActive?: string;
  gtmData?: IGTMData;
  navCallback?: () => void;
}
export interface ITopBar {
  topbarList?: ITopBarList[];
  back?: boolean;
}
export interface IIconButton {
  onClick?: (e?: any) => void;
  ripple?: boolean;
  ariaLabel?: string;
  className?: string;
  itemProp?: string;
}

export interface IHamburgerCollapse {
  data: any;
  onCollapseParentClicked: (linkText: string, isOpen: boolean) => Promise<void>;
  pageName: string;
}
export interface IHamburgerSectionItem {
  data: IHeaderWrapperMenu;
  onCollapseClicked: (sectionHeader: string, linkText: string, isOpen: boolean) => void;
  pageName: string;
}
export interface IOffcanvas {
  placement?: any;
  title?: string;
  header?: any;
  showCanvas?: any;
  onHide?: () => void;
  closeButton?: boolean;
  footer?: any;
  className?: string;
  headerProps?: any;
  titleProps?: any;
  bodyProps?: any;
  footerProps?: any;
  bodySpacing?: boolean;
  height?: string | number;
  offCanvasAutoId?: any;
  show?: boolean;
  autoId?: number;
  backdrop?: string;
}
export interface IStickyMobileMenu {
  defaultActive?: string;
  compData: {
    footerData: IFooterData;
    stickyNavData: IStickyNavData;
  };
}

export interface IStickyNavData {
  tabs: IStickyNavTab[];
  navData: IMoreNavData;
  products: IProducts[];
}

export interface IStickyNavTab {
  link: string;
  icon: string;
  activeId: string;
  gifSource: string;
  imageSource: string;
  imageAlt: string;
  imageTitle: string;
  label: string;
  isOffcanvas: boolean;
  isActive: boolean;
}
export interface IMoreNavData {
  heading: string;
  description: string;
  headingIcon: string;
  otherData: {
    heading: string;
    items: IMoreNavItem[];
  };
}

export interface IMoreNavItem {
  iconName: string;
  label: string;
  link: string;
  linkTarget: string;
  gtmData?: any;
}
export interface ISideNav {
  compData?: {
    imageSource: string;
    imageAlt: string;
    heading?: string;
    navList: ISideNavData[];
  };
  pageHeading?: string;
}
export interface ISideNavData {
  title: string;
  active: boolean;
  link: string;
  gtmData?: IGTMData;
}

export interface ILegal {
  compData: {
    sideNav?: {
      imageSource: string;
      imageAlt: string;
      navList: ISideNavData[];
    };
    details: {
      heading: string;
      data: string;
    };
  };
}

export interface IBottomLinks {
  links: any;
  backgroundImage: any;
}
export interface IFooterBg {
  imageSource: string;
  imageSourceTablet?: string;
  imageSourceMobile?: string;
  imageAlt: string;
}

export interface IAppCookie {
  heading: string;
  description: string;
  decline: string;
  acceptCookies: string;
}

export interface IHeroBanner {
  compData: {
    heading?: string;
    subHeading?: string;
    imageSource: string;
    imageSourceTablet?: string;
    imageSourceMobile?: string;
    imageAlt: string;
    variant?: string;
    productData?: IHeroProductDetails;
    socialIcons?: {
      link: string;
      linkTarget?: string;
      itemicon: string;
      linkText: string;
      gtmData: IGTMData;
    }[];
  };
  classname?: string;
  noMargin?: boolean;
  dealerLocatorData?: {
    dealerLocatorFilterData: IDealerLocatorWidgetData;
    showInPage: number;
    showInMobile: number;
    showInOverlay: number;
  };
  isPDPBanner?: boolean;
  breadCrumbList?: any;
}

export interface IHeroProductDetails {
  heading: string;
  subHeading: string;
  description?: string;
  imageSource: string;
  imageSourceTablet?: string;
  imageSourceMobile?: string;
  imageAlt: string;
  itemicon?: string;
  buttons: {
    link: string;
    linkTarget?: string;
    linkText: string;
    gtmData?: IGTMData;
  }[];
}

export interface IHomeCategoryList {
  categoryData: IHomeCategoryListDetail[];
  type?: string;
  isCategoryPage?: boolean;
}

export interface IHomeCategoryListDetail {
  link: string;
  linkTarget?: string;
  imageSource: string;
  imageSourceTablet?: string;
  imageSourceMobile?: string;
  imageAlt?: string;
  imageTitle?: string;
  productName: string;
  productCount?: string;
  isActive?: boolean;
  gtmData?: IGTMData;
}

export interface ICardData {
  textFirst?: string | boolean;
  cardType: string;
  mediaType: string;
  heading?: string;
  description?: string;
  mainDescription?: string;
  link?: string;
  linkText?: string;
  imageSource?: string;
  imageSourceTablet?: string;
  imageSourceMobile?: string;
  videoSource?: string;
  videoSourceTablet?: string;
  videoSourceMobile?: string;
  videoSourceOgg?: string;
  videoSourceTabletOgg?: string;
  videoSourceMobileOgg?: string;
  defaultVideoSource?: string;
  defaultVideoSourceTablet?: string;
  defaultVideoSourceMobile?: string;
  defaultVideoSourceOgg?: string;
  defaultVideoSourceTabletOgg?: string;
  defaultVideoSourceMobileOgg?: string;
  label?: string;
  playText?: string;
  autoplayVideo?: boolean;
  posterImage?: string;
  gtmData?: IGTMData;
  gtmVideoStart?: IGTMData;
  gtmVideoProgress?: IGTMData;
  gtmVideoComplete?: IGTMData;
  target?: string;
  imageAlt?: string;
  uploadDate?: string;
  seoDescription?: string;
  seoName?: string;
  linkTarget?: string;
  subHeading?: string;
  subDescription?: string;
  theme?: string;
  variant?: string;
  iconImage?: string;
  readMore?: string;
  readLess?: string;
  isReadMore?: boolean;
  textData?: {
    heading?: string;
    description?: string;
  }[];
  iconImageAlt?: string;
  sectionID?: string;
}

export interface ITwoColumnCard {
  compData: { data: ICardData[]; variant: string; sectionID?: string; theme?: string };
}

export interface IMainBanner {
  compData: IMainBannerData;
}

export interface IMainBannerData {
  data: IMainBannerMedia[];
}

export interface IMainBannerMedia {
  heading?: string;
  linkTarget?: string;
  subHeading?: string;
  link?: string;
  linkText?: string;
  description?: string;
  gtmData?: IGTMData;
  videoSourceMobile?: string;
  imageSource: string;
  mediaType: string;
  videoSource: string;
  videoSourceOGG: string;
  isOverlayRequired?: boolean;
  autoplay?: boolean;
  videoSourceMobileOGG?: string;
  videoSourceTablet?: string;
  videoSourceTabletOGG?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt?: string;
}

export interface IMobileHeader {
  compData: {
    mobileLogo: string;
    navData: {
      headerCallback: boolean;
      linkText: string;
    }[];
    buLink: string;
    buLogoAltText: string;
    linkTarget: string;
  };
  navCallback?: () => void;
  isHomePage?: boolean;
  isAbsolute?: boolean;
}

export interface ICardSliderDetails {
  compData: {
    heading?: string;
    subHeading?: string;
    description?: string;
    theme: string;
    link?: string;
    linkText?: string;
    gtmData?: IGTMData;
    imageSource?: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageAlt?: string;
  };
}
export interface IDetails {
  heading?: string;
  subHeading?: string;
  description?: string;
  linkText?: string;
  link?: string;
  linkTarget?: string;
  imageSource?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt?: string;
  gtmData?: IGTMData;
}

export interface ICardSlider {
  compData: {
    heading?: string;
    subHeading?: string;
    description?: string;
    sectionID?: string;
    variant?: string;
    theme: string;
    gtmData?: IGTMData;
  };
  noMargin?: boolean;
}
export interface ICardSliderData {
  cardDetails: {
    variant?: string;
    gallery?: ISliderCardData[];
  };
}
export interface ISliderCardData {
  heading?: string;
  description?: string;
  date?: string;
  imageSource?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt?: string;
  link: string;
  linkTarget?: string;
  gtmData?: IGTMData;
}
export interface ICardSlider {
  compData: {
    heading?: string;
    subHeading?: string;
    description?: string;
    sectionID?: string;
    variant?: string;
    theme: string;
    gtmData?: IGTMData;
  };
}
export interface IScaleSlider {
  compData: {
    sectionID?: string;
    heading?: string;
    subHeading?: string;
    description?: string;
    linkText?: string;
    link?: string;
    gallery: ISliderGalleryData[];
    gtmData?: IGTMData;
    imageSource?: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageAlt?: string;
  };
}
export interface ISliderGalleryData {
  link: string;
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt: string;
  label?: string;
  heading?: string;
  description?: string;
}
export interface ISlider {
  gallery: ISliderGalleryData[];
}
export interface IFeatureList {
  imageSource: string;
  imageAlt: string;
  heading: string;
}

export interface IVerticalCarousel {
  compData: {
    starImage: string;
    starImageAlt: string;
    sectionHeading: string;
    data: {
      id: number;
      imageSource: string;
      imageSourceMobile?: string;
      imageSourceTablet?: string;
      imageAlt: string;
      linkTarget?: string;
      link?: string;
      linkText: string;
      features: IFeatureList[];
      heading: string;
      description: string;
      gtmData: IGTMData;
    }[];
  };
}

export interface IOrderConfirmation {
  heading: string;
  description: string;
  linkTarget?: string;
  link?: string;
  linkText: string;
  data: {
    label: string;
    info: string;
  }[];
}

export interface IRelatedProductItem {
  heading?: string;
  description?: string;
  badge?: string;
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt?: string;
  link: string;
  linkTarget?: string;
  gtmData?: IGTMData;
  hoverDetails?: IHoverDetails[];
}

export interface IRelatedProductSlider {
  cardDetails: {
    gallery?: IRelatedProductItem[];
    variant?: string;
  };
}

export interface IRelatedProducts {
  compData: {
    theme?: string;
    heading?: string;
    link?: string;
    linkText?: string;
    linkTarget?: string;
    gtmData?: IGTMData;
    gallery?: IRelatedProductItem[];
    sectionID?: string;
  };
  noMargin?: boolean;
}

export interface IProducts {
  productLabel: string;
  imageSource: string;
  imageAlt: string;
  activeId: string;
  subProduct: {
    linkText: string;
    linkTarget: string;
    link: string;
    gtmData: IGTMData;
  }[];
}

export interface IProductList {
  compData: {
    heading?: string;
    subHeading?: string;
    description?: string;
    sectionID?: string;
    theme?: string;
    imageSource: string;
    imageAlt?: string;
    link?: string;
    linkText?: string;
    linkTarget?: string;
    gtmData?: IGTMData;
    gallery?: IRelatedProductItem[];
  };
}

export interface IProductCard {
  heading?: string;
  description?: string;
  badge?: string;
  link?: string;
  linkText?: string;
  linkTarget?: string;
  imageSource: string;
  imageAlt?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  gtmData?: IGTMData;
  hoverDetails?: IHoverDetails[];
}

export interface IHoverDetails {
  id: number;
  hoverImage: string;
  hoverText: string;
  imageAlt?: string;
}
export interface ITwoColumnCardSmall {
  compData: ISmallCard[];
}

export interface ISmallCard {
  theme: string;
  heading: string;
  description: string;
  imageSource: string;
  imageAlt?: string;
  reverseColumn: boolean;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  link: string;
  linkText: string;
  linkTarget?: string;
}

export interface ITextSection {
  imageSource: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  heading?: string;
  description?: string;
  imageAlt: string;
}
export interface ISubNav {
  compData: {
    link: string;
    linkTarget?: string;
    linkText: string;
    active?: boolean;
    gtmData?: IGTMData;
  }[];
  heading?: string;
  offcanvasHeading?: string;
  isMobileDropdown?: boolean;
  classname?: string;
}

export interface ILoader {
  bg?: string;
}
export interface ILocatorBanner {
  compData: {
    heading?: string;
    subHeading?: string;
    imageSource?: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageAlt?: string;
    gtmData?: IGTMData;
  };
  dealerLocatorData: {
    dealerLocatorFilterData: IDealerLocatorWidgetData;
    showInPage: number;
    showInMobile: number;
    showInOverlay: number;
    editData: IEditData;
  };
  setShowToast: React.Dispatch<React.SetStateAction<string>>;
  setToastMessage: React.Dispatch<React.SetStateAction<string>>;
  breadCrumbList?: IBreadcrumb;
}

export interface ILocatorBannerWrapper {
  compData: {
    heading?: string;
    subHeading?: string;
    imageSource?: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageAlt?: string;
    gtmData?: IGTMData;
  };
  dealerLocatorData: {
    dealerLocatorFilterData: IDealerLocatorWidgetData;
    showInPage: number;
    showInMobile: number;
    showInOverlay: number;
    editData: IEditData;
  };
  breadCrumbList?: IBreadcrumb;
}
export interface IFeaturesCards {
  heading: string;
  gallery: IFeatureCard[];
}

export interface IFeatureCard {
  heading: string;
  description: string;
  imageSource: string;
  imageSourceTablet?: string;
  imageSourceMobile?: string;
  hoverImageSource?: string;
  imageAlt: string;
}

export interface IBrochureCard {
  heading: string;
  subHeading: string;
  description: string;
  imageSource: string;
  imageSourceTablet?: string;
  imageSourceMobile?: string;
  imageAlt: string;
  link: string;
  linkTarget?: string;
  linkText?: string;
  gtmData?: IGTMData;
}

export interface IGetInTouchData {
  heading: string;
  sectionHeading: string;
  subHeading: string;
  items: {
    heading: string;
    subHeading: string;
    area: string;
    city?: string;
    iconName: string;
  }[];
  textData: {
    heading: string;
    description: string;
  };
}

export interface IPageType {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export interface ICardList {
  compData: {
    heading?: string;
    cards: {
      link: string;
      linkTarget?: string;
      linkText: string;
      gtmData?: IGTMData;
      imageSource: string;
      imageSourceMobile?: string;
      imageSourceTablet?: string;
      imageAlt?: string;
      heading: string;
      description: string;
      readless: string;
    }[];
  };
  overview?: IOverviewData;
}
export interface ICardListData {
  cardData?: {
    linkTarget?: string;
    linkText?: string;
    gtmData?: IGTMData;
    imageSource?: string;
    imageSourceMobile?: string;
    imageSourceTablet?: string;
    imageAlt?: string;
    heading?: string;
    description?: string;
  }[];
}

export interface IVectorCard {
  compData: {
    heading?: string;
    description?: string;
    readMore: string;
    readLess: string;
    linkTarget?: string;
    link?: string;
    data: {
      heading: string;
      description: string;
      sequence?: string;
      imageSource: string;
      imageSourceTablet?: string;
      imageSourceMobile?: string;
      imageAlt: string;
    }[];
  };
  overview?: IOverviewData;
}
export interface IVideoCard {
  compData: {
    theme?: string;
    heading?: string;
  }[];
  noMargin?: boolean;
  gallery?: IVideoCardItem;
}

export interface IVideoCardSlider {
  compData: {
    gallery?: IVideoCardItem[];
    variant?: string;
  };
  noMargin?: boolean;
}
export interface IVideoCardItem {
  cardHeading: string;
  description?: string;
  imageSource: string;
  imageSourceHover?: string;
  playIcon?: string;
  link?: string;
  linkTarget?: string;
  imageAlt?: string;
  gtmData?: IGTMData;
}

export interface IOverview {
  compData: IOverviewData;
  className?: string;
  showHeading?: boolean;
  isMargin?: boolean;
}

export interface IOverviewData {
  heading?: string;
  description?: string;
  link?: string;
  readMore?: string;
  readLess?: string;
  imageSource?: string;
  imageSourceMobile?: string;
  imageSourceTablet?: string;
  imageAlt?: string;
  linkTarget?: string;
  sectionID?: string;
  gtmData?: IGTMData;
  backHeader?: boolean;
}

export interface ITwoColumnListItem {
  link: string;
  linkTarget?: string;
  linkText: string;
  gtmData?: IGTMData;
  iconImage: string;
  heading: string;
  description: string;
  isReadmore?: boolean;
  readMore?: string;
  readLess: string;
}

export interface ITwoColumnList {
  compData: {
    heading: string;
    list: ITwoColumnListItem[];
  };
  extraMargin?: boolean;
}
export interface IBisStandardItem {
  name: string;
  standard: string;
}
export interface IBisStandard {
  compData: IBisStandardItem[];
}

export interface IHomeBuilderCards {
  heading: string;
  cardData: ICardItem[];
}
export interface ICardItem {
  heading: string;
  description: string;
  imageSource: string;
  imageSourceMobile: string;
  imageSourceTablet: string;
  imageAlt: string;
  link: string;
  linkText: string;
  linkTarget: string;
  gtmData: IGTMData;
}

export interface IChecklist {
  compData: {
    description: string;
    iconname: string;
  };
}
