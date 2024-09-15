import { CustomIcon } from '@components';
import { IConstructionTooltipData, ICostCalculatorBody } from '@interfaces';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { GTMHelper, useDeviceType } from '@utils';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PdfToDownload from '../PdfToDownload';
import styles from '../costCalculator.module.scss';

const CostCalculatorBody = (props: ICostCalculatorBody) => {
  const { deviceType } = useDeviceType();
  const {
    getCostCalculatorTabs,
    labels,
    tabData,
    getAmountDetail,
    handleClose,
    activeTab,
    show,
    inPage,
    pdfData,
    totalAmount,
    selectedValues,
  } = props;

  return (
    <div className={`${styles.wrapper} ${!inPage ? styles.inPageWrapper : ''}`}>
      {labels?.headingLabel && (
        <h2 className={styles.heading}>
          {labels?.headingLabel}
          {labels?.headingIcon}
        </h2>
      )}
      <div className={styles.subTabWrapper}>
        {getCostCalculatorTabs(tabData)?.map((tab: any, index: number) => (
          <div key={`${tab?.key + index}`} className={`${styles.tab} ${show ? '' : styles.mobileInPage}`}>
            {index === 0 && labels?.headingLabel && (
              <h2 className={`${styles.tabHeader} ${styles.heading}`}>
                {labels?.headingLabel}
                {labels?.headingIcon}
              </h2>
            )}
            {((index !== 1 && deviceType !== 'desktop') || deviceType === 'desktop') && (
              <div className={styles.tabHeader}>
                {inPage && (
                  <h3 className={styles.tabTitle}>
                    {tab?.title}{' '}
                    <span
                      className={`${styles.tabSubTitle} ${
                        index === 1 && activeTab === tab.key ? styles.activeTabSubTitle : ''
                      }`}
                    >
                      {tab?.subTitle}
                    </span>
                  </h3>
                )}
                {index === 0 && activeTab !== tab?.key && (
                  <button
                    className={styles.editBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClose();
                      GTMHelper({
                        ...labels?.gtmData,
                        construction_type: selectedValues?.structureType,
                        construction_stage: selectedValues?.dropdown,
                        construction_area: selectedValues?.area,
                      });
                    }}
                  >
                    {labels?.editButtonLabel}
                  </button>
                )}
              </div>
            )}
            {index === 0 && activeTab === tab.key && tab?.tooltipData && (
              <div className={styles.tabTooltipInfo}>
                <OverlayTrigger
                  placement="bottom"
                  trigger={['hover', 'focus']}
                  delay={{ show: 250, hide: 400 }}
                  overlay={
                    <Tooltip className={`${styles.tooltip} ${!inPage ? styles.inPageTooltipWrapper : ''}`}>
                      <div className={styles.tooltipContent}>
                        {tab?.tooltipData?.map((tooltipData: IConstructionTooltipData, index: number) => (
                          <p className={styles.info} key={`${tooltipData?.title + index}`}>
                            <span className={styles.infoHeading}>{tooltipData?.title} </span>
                            {tooltipData?.description}
                          </p>
                        ))}
                      </div>
                    </Tooltip>
                  }
                >
                  <span className={styles.tooltipIcon}>
                    <CustomIcon iconName="info" />
                  </span>
                </OverlayTrigger>
              </div>
            )}

            {activeTab === tab?.key && <div className={styles.tabContent}>{tab?.content}</div>}
            {index === 0 && activeTab !== tab?.key && (
              <div className={styles.tabInfo}>
                <span>{selectedValues?.structureType}</span>
                <span>{selectedValues?.dropdown}</span>
                <span className={styles.infoAreaLabel}>
                  {labels?.totalAreaLabel} : {selectedValues?.area} {labels?.areaLabel}
                </span>
                <span>{selectedValues?.stateName}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {labels?.downloadEstimateLabel && deviceType === 'desktop' && pdfData?.length > 0 && (
        <div className={styles.downloadEstimate}>
          <PDFDownloadLink
            document={<PdfToDownload compData={{ pdfData, totalAmount, labels }} />}
            fileName={labels?.pdfLabels?.pdfFileName}
            onClick={() =>
              GTMHelper({
                ...labels?.pdfLabels?.gtmData,
                construction_type: selectedValues?.structureType,
                construction_stage: selectedValues?.dropdown,
                construction_area: selectedValues?.area,
              })
            }
          >
            <div className={styles.downloadWrapper}>
              <CustomIcon iconName={labels?.downloadEstimateIcon} />
              <span className={styles.downloadLabel}>{labels?.downloadEstimateLabel}</span>
            </div>
          </PDFDownloadLink>
        </div>
      )}

      {deviceType !== 'desktop' && show && (
        <div className={styles.btnWrapper}>
          <div className={styles.downloadBtnWrapper}>
            <div className={styles.costWrapper}>
              <h4>
                {tabData?.[activeTab]?.data?.labels?.priceLabel} {getAmountDetail(totalAmount)?.value}{' '}
                {getAmountDetail(totalAmount)?.type}
              </h4>
              <p>{tabData?.[activeTab]?.data?.labels?.totalCostLabel}</p>
            </div>
            {labels?.downloadEstimateLabel && (
              <div className={styles.downloadBtn}>
                <PDFDownloadLink
                  document={<PdfToDownload compData={{ pdfData, totalAmount, labels }} />}
                  fileName={labels?.pdfLabels?.pdfFileName}
                  onClick={() =>
                    GTMHelper({
                      ...labels?.pdfLabels?.gtmData,
                      construction_type: selectedValues?.structureType,
                      construction_stage: selectedValues?.dropdown,
                      construction_area: selectedValues?.area,
                    })
                  }
                >
                  <div className={styles.downloadWrapper}>
                    <span className={styles.downloadLabel}>{labels?.downloadEstimateLabel}</span>
                  </div>
                </PDFDownloadLink>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default CostCalculatorBody;
