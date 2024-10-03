import { Button, CustomLink } from '@components';
import { IDealer, IDealerDetail, IDealersList } from '@interfaces';
import { useDeviceType } from '@utils';
import { useEffect, useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import CustomIcon from 'src/components/CustomIcon';
import SelectedFilters from '../SelectedFilters';
import styles from './dealersList.module.scss';

const DealerDetail = (props: IDealerDetail) => {
  const { id, dealer } = props;

  return (
    <div key={id} className={styles.dealerDetails}>
      <div className={styles.dealerInfoHeader}>
        <div className={styles.dealerImage}>
          <CustomIcon iconName={dealer?.icon} />
        </div>
        <div className={styles.dealerDescription}>
          <p className={styles.dealerOrganisation}>{dealer?.organisation}</p>
          <ul className={styles.dealerInfoList}>
            {dealer?.name && (
              <li className={styles.dealerInfo}>
                <p className={styles.dealerInfoLabel}>
                  {dealer?.profileIcon && <CustomIcon iconName={dealer?.profileIcon || 'profile'} />}
                  <span className={styles.dealerInfoDescription}>{dealer?.name}</span>
                </p>
              </li>
            )}
            {dealer?.contact && (
              <li className={styles.dealerInfo}>
                <p className={styles.dealerInfoLabel}>
                  {dealer?.contactIcon && <CustomIcon iconName={dealer?.contactIcon || 'mobile'} />}
                  <CustomLink href={`tel:${dealer?.contact}`} target="_blank">
                    <span className={styles.dealerInfoDescription}>{dealer?.contact}</span>
                  </CustomLink>
                </p>
              </li>
            )}
            {dealer?.address && (
              <li className={styles.dealerInfo}>
                <p className={styles.dealerInfoLabel}>
                  {dealer?.addressIcon && <CustomIcon iconName={dealer?.addressIcon || 'location'} />}
                  <span className={styles.dealerInfoDescription}>{dealer?.address} </span>
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

const DealersList = (props: IDealersList) => {
  const { compData, dealersToShow = 9, isOverlay = true, selectedResultFilters, editData, handleClose = null } = props;
  const { deviceType } = useDeviceType();
  const { labels, details } = compData;

  const [dealersData, setDealersData] = useState<any>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [show, setShow] = useState(false);

  useEffect(() => {
    details?.length > 0 && getDealersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details]);

  useEffect(() => {
    if (deviceType !== 'desktop' && !isOverlay) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [deviceType, isOverlay]);

  const getDealersData = () => {
    if (deviceType === 'desktop') {
      const newDealers = [];
      for (let i = (pageNo - 1) * dealersToShow; i < details?.length && i < pageNo * dealersToShow; i++) {
        newDealers?.push(details?.[i]);
      }
      pageNo === 1 ? setDealersData(newDealers) : setDealersData([...dealersData, ...newDealers]);
      setPageNo(pageNo + 1);
    } else {
      setDealersData(details);
    }
  };

  const onHide = () => {
    setShow(false);
  };

  const dealerDetailsBody = () => {
    return (
      <div className={isOverlay || show ? styles.offcanvasDealerListWrapper : styles.wrapper}>
        {!isOverlay && !show && (
          <h2 className={styles.header}>
            {labels?.dealersNearbyLabel}{' '}
            <span className={styles.subHeader}>
              ({details?.length} {labels?.resultsLabel})
            </span>
          </h2>
        )}
        {(show || isOverlay) && editData && selectedResultFilters?.selectedState && (
          <SelectedFilters
            onEditClick={() => {
              onHide();
              if (handleClose) handleClose();
            }}
            selectedResultFilters={selectedResultFilters}
            compData={editData}
          />
        )}
        <div className={styles.dealerDetailsWrapper}>
          {dealersData?.map((dealer: IDealer, index: number) => (
            <DealerDetail key={`${dealer.city + index}`} id={index} dealer={dealer} labels={labels} />
          ))}
        </div>
        {deviceType === 'desktop' && details?.length > dealersData?.length && (
          <div className={`${styles.btnWrapper} ${isOverlay ? styles.overlayBtn : ''}`}>
            <Button
              className={styles.showMoreBtn}
              onClick={() => {
                getDealersData();
              }}
            >
              {labels?.buttonLabel}
            </Button>
          </div>
        )}
      </div>
    );
  };
  return (
    <>
      {show && (
        <Offcanvas className={styles.offCanvas} placement={'bottom'} show={show} onHide={onHide}>
          <Offcanvas.Header>
            <div className={styles.dealerResultOffcanvasHeader}>
              <button onClick={onHide}>
                <CustomIcon iconName="arrowleft" />
              </button>
              <h2 className={styles.offcanvasHeader}>
                {labels?.dealersNearbyLabel}{' '}
                <span className={styles.offcanvasSubHeader}>
                  ({details?.length} {labels?.resultsLabel})
                </span>
              </h2>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>{dealerDetailsBody()}</Offcanvas.Body>
        </Offcanvas>
      )}
      {!show && isOverlay && dealerDetailsBody()}
      {!show && !isOverlay && deviceType === 'desktop' && <div className="container">{dealerDetailsBody()}</div>}
    </>
  );
};

export default DealersList;
