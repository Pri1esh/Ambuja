import { IDealerDropdownOptions, IDealerPageFilter, ISelectedDealerFilters } from '@interfaces';
import { Dispatch, SetStateAction } from 'react';
import { UseFormGetValues } from 'react-hook-form';

const formValidator = (data: any) => {
  if (!data?.selectedState?.id) {
    return false;
  } else {
    return true;
  }
};

const setSelected = (
  item: any,
  onChange: (...event: any[]) => void,
  getValues: UseFormGetValues<any>,
  dropdownOptions: IDealerDropdownOptions,
  setDropdownOptions: Dispatch<SetStateAction<IDealerDropdownOptions>>,
  type: string,
  fieldName: string,
) => {
  switch (type) {
    case 'state':
      onChange({
        selectedState: { label: item?.label, id: item?.id },
        selectedCity: null,
        selectedArea: null,
      });
      setDropdownOptions({ cityOptions: item ? item?.cityOptions : [], areaOptions: [] });
      break;
    case 'city':
      onChange({
        ...getValues(fieldName),
        selectedCity: { label: item?.label, id: item?.id },
        selectedArea: null,
      });
      setDropdownOptions({ ...dropdownOptions, areaOptions: item ? item?.areaOptions : [] });
      break;
    case 'area':
      onChange({
        ...getValues(fieldName),
        selectedArea: { label: item?.label, id: item?.id },
      });
      break;
  }
};

const filterDealers = (dealers: any[], selectedFilters: any) => {
  const filteredDealers = dealers?.filter(
    (i) =>
      i?.stateId === selectedFilters?.stateId &&
      i?.cityId === selectedFilters?.cityId &&
      i?.areaId === selectedFilters?.areaId,
  );
  return filteredDealers;
};

const updateDropdownOptions = (
  selected: any,
  options: any,
  setDropdownOptions: Dispatch<SetStateAction<IDealerDropdownOptions>>,
) => {
  const selectedCity = options?.find((option: any) => selected?.selectedState?.id === option?.id)?.cityOptions || [];
  const selectedArea =
    selectedCity?.find((option: any) => selected?.selectedCity?.id === option?.id)?.areaOptions || [];
  setDropdownOptions({ cityOptions: selectedCity, areaOptions: selectedArea });
};

const setSelectedFilters = (
  pageData: any,
  filter: IDealerPageFilter,
  setSelected: Dispatch<SetStateAction<ISelectedDealerFilters | null>>,
) => {
  const selectedData: any = {
    selectedState: null,
    selectedCity: null,
    selectedArea: null,
  };
  pageData?.map((option: any) => {
    if (filter?.state === option?.id) {
      selectedData.selectedState = { id: option?.id, label: option?.label };
      option?.cityOptions?.map((cityOption: any) => {
        if (filter?.city === cityOption?.id) {
          selectedData.selectedCity = { id: cityOption?.id, label: cityOption?.label };
          cityOption?.areaOptions?.map((areaOption: any) => {
            if (filter?.area === areaOption?.id) {
              selectedData.selectedArea = { id: areaOption?.id, label: areaOption?.label };
            }
          });
        }
      });
    }
  });
  setSelected(selectedData);
};

export { formValidator, setSelected, filterDealers, updateDropdownOptions, setSelectedFilters };
