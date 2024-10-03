import { IFieldData, ISelectDropdownOption } from '@interfaces';

export const dropdownInputValidator = (formFieldData: IFieldData, value: ISelectDropdownOption) => {
  const { errorMessages } = formFieldData;
  const { requiredFieldErrorMessage } = errorMessages;

  return value ? true : requiredFieldErrorMessage;
};
