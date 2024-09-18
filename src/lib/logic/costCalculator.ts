import {
  IConstructionSubmitButton,
  IConstructionTabValues,
  IMaterialData,
  IupdateCostInCostEstimation,
} from '@interfaces';
import { openLink } from '@utils';
import { Dispatch, SetStateAction } from 'react';

const handleMaterialEstimationTabFilterChange = (
  type: string,
  value: any,
  apiData: any,
  materialData: IMaterialData,
  setMaterialData: Dispatch<SetStateAction<IMaterialData>>,
) => {
  for (let i = 0; i < apiData?.materialInfo?.length; ++i) {
    const curr = apiData?.materialInfo?.[i]?.filter?.find((filterType: { id: string }) => filterType?.id === value?.id);
    if (curr) {
      setMaterialData({ ...materialData, materialInfo: apiData?.materialInfo?.[i]?.data?.data });
      break;
    }
  }
};

const validateConstructionTabInputs = (values: IConstructionTabValues) => {
  if (!values?.area || values?.area === 0) {
    return false;
  }

  return true;
};

const validateConstructionSelect = (value: any) =>{
  if(JSON.stringify(value) === '{}'){
    return false;
  }
  return true;
}

const updateCostInCostEstimation = async (params: IupdateCostInCostEstimation) => {
  const {
    prevPrice,
    qty,
    newPrice,
    totalAmount,
    setTotalAmount,
    type,
    setPercentageData,
    percentageData,
    labourCharges,
    setLabourCharges,
  } = params;
  let newSum = 0;
  let prevSum = 0;
  const labourCharge = labourCharges || 0;
  let newAmount = totalAmount - labourCharge;

  if (type === 'percentage') {
    newAmount = newAmount - percentageData?.percentageAmount;
    if (!isNaN(newPrice)) {
      newSum = (newPrice * newAmount) / 100;
      setPercentageData({
        percentageAmount: parseFloat(newSum?.toString()),
        percentage: newPrice,
      });
    }

    newAmount = newAmount + newSum + labourCharge;
  } else if (qty === null) {
    newAmount = newAmount + newPrice;
    setLabourCharges(newPrice);
  } else {
    let percentAmount = 0;

    if (!isNaN(prevPrice)) {
      prevSum = prevPrice * qty;
    }
    if (!isNaN(newPrice)) {
      newSum = newPrice * qty;
    }

    newAmount = newAmount - prevSum + newSum - (percentageData?.percentageAmount || 0);
    percentAmount = (newAmount * percentageData?.percentage || 0) / 100;

    setPercentageData({
      ...percentageData,
      percentageAmount: parseFloat(percentAmount?.toString()),
    });
    newAmount = newAmount + percentAmount + labourCharge;
  }
  const finalAmount = parseFloat(newAmount?.toString());
  setTotalAmount(finalAmount > 0 ? finalAmount : 0);
};

const getAmountDetail = (amount: number) => {
  switch (true) {
    case amount >= 10000000:
      return { type: 'Crore', value: (amount / 10000000).toFixed(2) };
    case amount >= 100000:
      return { type: 'Lakh', value: (amount / 100000).toFixed(2) };
    default:
      return { type: '', value: amount.toFixed(0) };
  }
};

const goToCostCalculatorPage = (payload: any, buttonPropeties?: IConstructionSubmitButton) => {
  let url = buttonPropeties?.link ?? '';
  Object.keys(payload)?.map((value, index: number) => {
    url += index === 0 ? `?${value}=${payload?.[value]}` : `&${value}=${payload?.[value]}`;
  });
  openLink(url, buttonPropeties?.linkTarget ?? '');
};

const filterCostCalculatorData = (data: any, selectedStructureType: string, area: string | number,stateName:string,districtName:string,areaName:string) => {
  const newData = data?.map((materialInfoData: any) => {
    const filteredData = materialInfoData?.data?.filter((i: any) => i?.type === selectedStructureType)?.[0];

    const updatedData = filteredData?.data?.map((materialData: any) => {
      const updatedQtyData = {
        ...materialData,
        qty:
          !materialData?.qty && materialData?.qty !== 0
            ? null
            : Math.ceil((materialData?.qty * parseInt(area?.toString())) / 1000),
        calculatorNum:
          !materialData?.qty && materialData?.qty !== 0 && materialData?.type === 'number'
            ? parseInt(area?.toString())
            : 0,
      };
      return updatedQtyData;
    });
    return { filter: materialInfoData?.filter, data: { ...filteredData, data: updatedData },stateName,districtName,areaName };
  });
  return newData;
};

export {
  filterCostCalculatorData,
  getAmountDetail,
  goToCostCalculatorPage,
  handleMaterialEstimationTabFilterChange,
  updateCostInCostEstimation,
  validateConstructionTabInputs,
  validateConstructionSelect
};
