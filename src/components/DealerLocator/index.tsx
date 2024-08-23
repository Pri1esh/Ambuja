import { ENDPOINT } from '@api-manager';
import { CustomIcon, CustomLoader } from '@components';
import { MESSAGES } from '@enum';
import { IDealerLocator, ISelectedDealerFilters } from '@interfaces';
import { setSelectedFilters } from '@logic/dealerLocator';
import { getClientApiData, openLink, updateWebUrl, useDeviceType } from '@utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import DealerLocatorFilter from './DealerLocatorFilter';
import DealersList from './DealersList';
import NoResult from './NoResult';
import SelectedFilters from './SelectedFilters';
import styles from './dealerLocator.module.scss';

const DealerLocator = (props: IDealerLocator) => {
  const { compData, inPage = false, showOffcanvas, setShowOffcanvas, setShowToast, setToastMessage } = props;
  const { deviceType } = useDeviceType();
  const searchParams = useSearchParams();
  const {
    dealerLocatorFilterData,
    showInPage = 9,
    showInMobile = 5,
    showInOverlay = 5,
    redirectUrl,
    noResult,
    editData,
  } = compData;

  const [dealerApiData, setDealerApiData] = useState<any>(null);
  const [selected, setSelected] = useState<ISelectedDealerFilters | null>(null);
  const [hasFilterUpdated, setHasFilterUpdated] = useState(false);
  const [loading, setLoading] = useState(searchParams?.get('state') !== null);
  const [disabled, setDisabled] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedResultFilters, setSelectedResultFilters] = useState<ISelectedDealerFilters | null>(null);

  const inPageFunction = async (selectedFilters: any) => {
    try {
      let url = ENDPOINT.CLIENT.dealerResult;
      if (selectedFilters?.stateId) {
        url += `/${selectedFilters?.stateId}`;
      }
      if (selectedFilters?.cityId) {
        url += `/${selectedFilters?.cityId}`;
      }
      if (selectedFilters?.areaId) {
        url += `/${selectedFilters?.areaId}`;
      }

      const res = await getClientApiData(url);
      setApiCall(true);
      if (deviceType !== 'desktop') {
        setShow(true);
      }
      setSelectedResultFilters({
        selectedState: selectedFilters?.stateId,
        selectedCity: selectedFilters?.cityId,
        selectedArea: selectedFilters?.areaId,
      });

      !showOffcanvas &&
        updateWebUrl({
          state: selectedFilters?.stateId ?? null,
          city: selectedFilters?.cityId ?? null,
          area: selectedFilters?.areaId ?? null,
        });

      if (!res?.data || (res?.data?.details?.length === 0 && !noResult)) {
        setShowToast('true');
        setToastMessage(MESSAGES.NO_DATA_FOUND);
        return;
      }

      setDealerApiData(res?.data);
      setHasFilterUpdated(!hasFilterUpdated);
    } catch (e) {
      setDealerApiData([]);
      setHasFilterUpdated(!hasFilterUpdated);
      setShowToast('true');
      setToastMessage(MESSAGES.SOMETHING_WENT_WRONG);
    }
  };

  const redirectUrlFunction = (selectedFilters: any) => {
    let url: any = redirectUrl;
    if (selectedFilters?.stateId) {
      url += '?state=' + selectedFilters?.stateId?.replace(/ /g, '+');
    }
    if (selectedFilters?.cityId) {
      url += '&city=' + selectedFilters?.cityId?.replace(/ /g, '+');
    }
    if (selectedFilters?.areaId) {
      url += '&area=' + selectedFilters?.areaId?.replace(/ /g, '+');
    }
    openLink(url, '');
  };

  const dealerFilter = (selectedFilters: any) => {
    setLoading(true);
    setDealerApiData(null);
    if (inPage) {
      inPageFunction(selectedFilters);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else if (typeof window !== 'undefined' && redirectUrl) {
      redirectUrlFunction(selectedFilters);
    }
  };

  useEffect(() => {
    setFormLoader(true);
    setTimeout(() => setFormLoader(false), 1000);
    if (searchParams?.get('state')) {
      setSelectedFilters(
        dealerLocatorFilterData?.options,
        {
          state: searchParams?.get('state') ?? '',
          city: searchParams?.get('city') ?? '',
          area: searchParams?.get('area') ?? '',
        },
        setSelected,
      );
      dealerFilter({
        stateId: searchParams?.get('state') ?? '',
        cityId: searchParams?.get('city') ?? '',
        areaId: searchParams?.get('area') ?? '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dealersListWrapper = () => {
    switch (true) {
      case inPage && dealerApiData !== null && showOffcanvas && dealerApiData?.details?.length > 0:
        return (
          <div key={dealerApiData?.dealersDetails?.details && hasFilterUpdated?.toString()}>
            <DealersList
              compData={dealerApiData}
              dealersToShow={showInOverlay}
              isOverlay={showOffcanvas}
              setDisabled={setDisabled}
              selectedResultFilters={selectedResultFilters}
              editData={editData}
              handleClose={handleClose}
            />
          </div>
        );
      case inPage && dealerApiData !== null && dealerApiData?.details?.length > 0:
        return (
          <div key={dealerApiData?.dealersDetails?.details && hasFilterUpdated?.toString() && deviceType?.toString()}>
            <DealersList
              compData={dealerApiData}
              dealersToShow={deviceType !== 'desktop' ? showInMobile : showInPage}
              isOverlay={false}
              setDisabled={setDisabled}
              selectedResultFilters={selectedResultFilters}
              editData={editData}
              handleClose={handleClose}
            />
          </div>
        );
      case inPage && dealerApiData === null && apiCall && !loading && !!noResult:
        return deviceType === 'desktop' ? (
          <NoResult data={noResult} isOverlay={false} />
        ) : (
          <Offcanvas
            className={styles.noResultOffCanvas}
            placement={'end'}
            show={show}
            onHide={() => {
              setShow(false);
            }}
          >
            <Offcanvas.Header>
              {editData && selectedResultFilters && (
                <div className={styles.dealerResultOffcanvasHeader}>
                  <button onClick={() => setShow(false)}>
                    <CustomIcon iconName="arrowleft" />
                  </button>
                  <h2 className={styles.dealerResultOffcanvasHeading}>
                    {noResult?.heading} <span className={styles.offcanvasSubHeader}>{noResult?.subHeading}</span>
                  </h2>
                </div>
              )}
            </Offcanvas.Header>
            <Offcanvas.Body>
              {editData && selectedResultFilters && (
                <div className={styles.editWrapper}>
                  <SelectedFilters
                    compData={editData}
                    selectedResultFilters={selectedResultFilters}
                    onEditClick={() => {
                      setShow(false);
                      handleClose();
                    }}
                  />
                </div>
              )}
              <NoResult data={noResult} isOverlay={true} />
            </Offcanvas.Body>
          </Offcanvas>
        );
      default:
        return <div className={styles.emptyDataWrapper}></div>;
    }
  };

  const dealerLocatorWidget = () => {
    if (showOffcanvas) {
      return (
        <div className={styles.wrapper}>
          {dealerApiData === null || dealerApiData?.details?.length === 0 ? (
            <DealerLocatorFilter
              key={selected?.toString()}
              compData={dealerLocatorFilterData}
              filterDealers={dealerFilter}
              selected={selected}
              isOverlay={showOffcanvas}
              loading={loading}
              setDisabled={setDisabled}
              disabled={disabled}
              setShowToast={setShowToast}
              setToastMessage={setToastMessage}
            />
          ) : (
            dealersListWrapper()
          )}
        </div>
      );
    }

    return (
      <div className={styles.wrapper}>
        {dealerLocatorFilterData?.options && (
          <DealerLocatorFilter
            key={selected?.toString()}
            compData={dealerLocatorFilterData}
            filterDealers={dealerFilter}
            selected={selected}
            isOverlay={showOffcanvas}
            inPage={inPage}
            loading={loading}
            setDisabled={setDisabled}
            disabled={disabled}
            setShowToast={setShowToast}
            setToastMessage={setToastMessage}
          />
        )}

        {inPage && dealersListWrapper()}
      </div>
    );
  };

  const handleClose = () => {
    if (dealerApiData !== null) {
      setDealerApiData(null);
      setApiCall(false);
    } else {
      if (setShowOffcanvas) setShowOffcanvas(false);
      setApiCall(false);
    }
  };

  return (
    <div className={`${showOffcanvas || inPage ? styles.locatorWrapper : ''}`}>
      {showOffcanvas ? (
        <Offcanvas
          className={styles.offCanvas}
          placement={deviceType === 'desktop' ? 'end' : 'bottom'}
          show={showOffcanvas}
          onHide={() => {
            handleClose();
          }}
        >
          <Offcanvas.Header className={styles.offcanvasHeader} closeButton={dealerApiData === null && !noResult}>
            {dealerApiData?.details?.length > 0 && apiCall && (
              <div className={styles.dealerResultOffcanvasHeader}>
                <button onClick={() => handleClose()}>
                  <CustomIcon iconName="arrowleft" />
                </button>

                <h2 className={styles.dealerResultOffcanvasHeading}>
                  {dealerApiData?.labels?.dealersNearbyLabel}{' '}
                  <span className={styles.offcanvasSubHeader}>
                    ({dealerApiData?.details?.length} {dealerApiData?.labels?.resultsLabel})
                  </span>
                </h2>
              </div>
            )}
          </Offcanvas.Header>
          <Offcanvas.Body className={styles.offcanvasBody}>
            {formLoader ? (
              <div className="pageLoader">
                <CustomLoader />
              </div>
            ) : (
              dealerLocatorWidget()
            )}
          </Offcanvas.Body>
        </Offcanvas>
      ) : (
        dealerLocatorWidget()
      )}
    </div>
  );
};

export default DealerLocator;
