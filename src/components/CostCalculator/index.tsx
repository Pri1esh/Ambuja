/* eslint-disable */

'use client';
import { ENDPOINT, getAPI } from '@api-manager';
import { ConstructionDetails, CostEstimation, CustomIcon, CustomLoader } from '@components';
import {
  IConstructionSubmitButton,
  IConstructionTabValues,
  ICostCalculator,
  ICostPdfData,
  IMaterialData,
  IPriceData,
  ISelectDropdownOption,
} from '@interfaces';
import {
  filterCostCalculatorData,
  getAmountDetail,
  goToCostCalculatorPage,
  handleMaterialEstimationTabFilterChange,
  updateCostInCostEstimation,
} from '@logic/costCalculator';
import { apiDataFilter, useDeviceType } from '@utils';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Offcanvas } from 'react-bootstrap';
import styles from './costCalculator.module.scss';
import CostCalculatorBody from './CostCalculatorBody';

const CostCalculator = (props: ICostCalculator) => {
  const { compData, inPage = true } = props;
  const searchParams = useSearchParams();
  const { labels, tabData } = compData;
  const { deviceType } = useDeviceType();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [apiData, setApiData] = useState<any>(null);
  const [materialData, setMaterialData] = useState<IMaterialData>({
    materialDropdownOptions: null,
    materialInfo: [],
  });
  const [selectedValues, setSelectedValues] = useState<IConstructionTabValues | null>(null);
  const [pdfData, setPdfData] = useState<ICostPdfData[]>([]);
  const [totalAmount, setTotalAmount] = useState<GLuint64>(0);
  const [percentageData, setPercentageData] = useState<{ percentageAmount: GLuint64; percentage: number }>({
    percentageAmount: 0,
    percentage: 0,
  });
  const [labourCharges, setLabourCharges] = useState<GLuint64>(0);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(searchParams?.get('area') !== null);
  const [priceData, setPriceData] = useState<IPriceData[]>([]);

  const [selectedData, setSelectedData] = useState<any[]>([]);

  

  useEffect(() => {
    if (searchParams?.get('area')) {
      setSelectedValues({
        structureType: searchParams?.get('structuretype')?.replace(/_/g, ' ') ?? '',
        dropdown: searchParams?.get('constructionstage')?.replace(/_/g, ' ') ?? '',
        area: searchParams?.get('area')?.replace(/_/g, ' ') ?? '',
        stateName: searchParams?.get('stateName')?.replace(/_/g, ' ') ?? '',
        districtName: searchParams?.get('districtName')?.replace(/_/g, ' ') ?? '',
        areaName: searchParams?.get('areaName')?.replace(/_/g, ' ') ?? '',
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    deviceType !== 'desktop' && activeTab !== 0 ? setShow(true) : setShow(false);

  }, [deviceType,activeTab]);

  useEffect(() => {
    updateMaterialData();
  }, [materialData,selectedData]);


  const updateMaterialData = async () => {
    const newPdfData: ICostPdfData[] = [];

    materialData?.materialInfo?.map(async (material: ICostPdfData) => {
      const gotSlab:any = selectedData.find((data:any)=>(data?.label === material?.label));
      newPdfData.push({
        label: material?.label,
        price: gotSlab?.cost,
        qty: material?.qty,
        type: material?.type,
        product: gotSlab?.product
      });
    });
    setPdfData(newPdfData);
  };


  const getTabDetails = (tab: any) => {
    switch (tab?.type) {
      case 'constructionDetails':
        return loading ? (
          <div className={styles.loaderWrapper}>
            <CustomLoader />
          </div>
        ) : (
          <ConstructionDetails
            compData={tab?.data}
            handleFormSubmit={handleConstructionDetailsSubmit}
            selectedValues={selectedValues}
            inPage={inPage}
            apiData={apiData}
          />
        );
      case 'materialCostEstimation':
        return (
          <CostEstimation
            compData={tab?.data}
            materialData={materialData}
            handleFilterChange={handleFilterChange}
            updateCost={updateCost}
            totalAmount={totalAmount}
            selectedValues={selectedValues}
            priceData={priceData}
            setPriceData={setPriceData}
            setTotalAmount={setTotalAmount}
            setSelectedData={setSelectedData}
          />
        );
    }
  };

  const updatePdfData = (label: string, qty: number, newPrice: number) => {
    let newPdfData: ICostPdfData[] = [];
    if (pdfData?.length > 0) {
      newPdfData = pdfData?.map((data: ICostPdfData) => {
        if (data?.label === label) {
          return { ...data, price: newPrice };
        }
        return data;
      });
    }
    setPdfData(newPdfData);
  };

  const getCostCalculatorTabs = (data: any) => {
    const tabs: any[] = [];
    data?.map((currentTab: any, index: number) => {
      tabs.push({
        title: currentTab?.label,
        key: index,
        content: getTabDetails(currentTab),
        subTitle: currentTab?.subTitle || '',
        tooltipData: currentTab?.tooltipData || null,
      });
    });
    return tabs;
  };

  const handleApiResponse = (data: any, selectedStructureTypeId: string, payload: any) => {
    if (data) {
      setPriceData([]);
      setPercentageData({ percentage: 0, percentageAmount: 0 });
      setLabourCharges(0);
      setTotalAmount(0);
      const filteredData = filterCostCalculatorData(
        data?.materialInfo?.fields?.materialInfo,
        selectedStructureTypeId,
        payload?.area,
        payload?.stateName,
        payload?.districtName,
        payload?.areaName
      );
      setApiData({
        materialInfo: filteredData,
        materialDropdownOptions: data?.dropdownOptions?.fields?.dropdownOptions,
      });
      const selectedDropdownOption = data?.dropdownOptions?.fields?.dropdownOptions?.[0]?.options?.find(
        (i: ISelectDropdownOption) => i?.label === payload?.dropdown,
      );

      const dataIdx = filteredData?.findIndex((i: any) => i?.filter?.[0]?.id === selectedDropdownOption?.id);

      const stateWiseData = getStateWiseData(data.CostCalculatorAPIStateData.fields?.costInfo,payload?.stateName);
      const constructionData = filteredData?.[dataIdx === -1 ? 0 : dataIdx]?.data?.data;

      setMaterialData({
        materialInfo: mergeData(constructionData,stateWiseData),
        materialDropdownOptions: data?.dropdownOptions?.fields?.dropdownOptions?.[0],
      });
    }
  };

  const getStateWiseData = (stateArray:any,stateName:string) => {
    const stateData = stateArray.find((state:any)=>(state?.statefilter[0]?.state === stateName))?.statedata;
    return stateData;
  }

  const mergeData = (constructionData:any,stateWiseData:any) => {
    return constructionData.map((baseData:any)=>{
      const additionData = stateWiseData.find((item:any)=>(item?.type.includes(baseData?.label.split(' ')[0])))?.data;
      baseData.data = additionData;
      return baseData
    });
  }

  const handleFilterChange = async (type: string, value: ISelectDropdownOption | null) => {
    selectedValues && setSelectedValues({ ...selectedValues, dropdown: value?.label ?? '' });
    handleMaterialEstimationTabFilterChange(type, value, apiData, materialData, setMaterialData);
  };

  const handleTabChange = (activeIndex: number) => {
    setActiveTab(activeIndex + 1);
    if (activeIndex === 0 && deviceType !== 'desktop') {
      setShow(true);
    }
  };

  const updateCost = async (prevPrice: number, qty: number, newPrice: number, label: string, type = 'number') => {
    const params = {
      prevPrice,
      qty,
      newPrice: parseFloat(newPrice?.toString()?.replace('%', '')),
      totalAmount,
      setTotalAmount,
      type,
      setPercentageData,
      percentageData,
      labourCharges,
      setLabourCharges,
    };
    updateCostInCostEstimation(params);
    updatePdfData(label, qty, newPrice);
  };

  const handleConstructionDetailsSubmit = async (
    payload: IConstructionTabValues,
    selectedStructureTypeId: string,
    buttonPropeties?: IConstructionSubmitButton,
  ) => {
    setLoading(true);

    try {
      if (tabData?.length > 1) {
        const res = await getAPI(ENDPOINT.CLIENT.costCalculatorResponse, false);
        const data = apiDataFilter(res);
        handleApiResponse(data?.main, selectedStructureTypeId, payload);
        setSelectedValues({
          structureType: payload?.structureType,
          area: payload?.area,
          dropdown: payload?.dropdown,
          stateName: payload?.stateName,
          districtName: payload?.districtName,
          areaName : payload?.areaName
        });
        handleTabChange(0);
        setLoading(false);
      } else {
        goToCostCalculatorPage(payload, buttonPropeties);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setActiveTab(0);
    deviceType !== 'desktop' && setShow(false);
  };

  return (
    <>
      {inPage && show && (
        <Offcanvas
          className={styles.offCanvas}
          placement={'bottom'}
          show={show}
          onHide={() => {
            handleClose();
          }}
        >
          <Offcanvas.Header>
            <div className={styles.offcanvasHeader}>
              <button onClick={handleClose}>
                <CustomIcon iconName="arrowleft" />
              </button>
              <h3>{tabData?.[activeTab]?.label}</h3>
              <p>{tabData?.[activeTab]?.subTitle}</p>
            </div>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className={styles.calculatorWrapper}>
              <CostCalculatorBody
                getCostCalculatorTabs={getCostCalculatorTabs}
                labels={labels}
                tabData={tabData}
                getAmountDetail={getAmountDetail}
                handleClose={handleClose}
                show={show}
                activeTab={activeTab}
                selectedValues={selectedValues}
                selectedData={selectedData}
                inPage={inPage}
                pdfData={pdfData}
                totalAmount={totalAmount}
              />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      )}
      {inPage && !show && (
        <div className={styles.calculatorWrapper}>
          <Container>
            <CostCalculatorBody
              getCostCalculatorTabs={getCostCalculatorTabs}
              labels={labels}
              tabData={tabData}
              getAmountDetail={getAmountDetail}
              handleClose={handleClose}
              show={show}
              activeTab={activeTab}
              selectedValues={selectedValues}
              inPage={inPage}
              pdfData={pdfData}
              totalAmount={totalAmount}
              selectedData={selectedData}
            />
          </Container>
        </div>
      )}
      {!inPage && (
        <CostCalculatorBody
          getCostCalculatorTabs={getCostCalculatorTabs}
          labels={labels}
          tabData={tabData}
          getAmountDetail={getAmountDetail}
          handleClose={handleClose}
          show={show}
          activeTab={activeTab}
          selectedValues={selectedValues}
          inPage={inPage}
          pdfData={pdfData}
          selectedData={selectedData}
          totalAmount={totalAmount}
        />
      )}
    </>
  );
};

export default CostCalculator;
