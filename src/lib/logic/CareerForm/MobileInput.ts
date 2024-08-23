import { IFieldData, IMobileNumberData } from '@interfaces';
import { mobileNumberValidatorRegex } from '@utils';
import { isValidNumberForRegion } from 'libphonenumber-js';
import { CountryCode } from 'libphonenumber-js/types';

export const mobileInputValidator = (formFieldData: IFieldData, value: IMobileNumberData) => {
  const { errorMessages } = formFieldData;
  const { requiredFieldErrorMessage, maxLengthErrorMessage, minLengthErrorMessage, regexErrorMessage } = errorMessages;

  if (!value?.phoneNumber) {
    return requiredFieldErrorMessage;
  }
  const regex = mobileNumberValidatorRegex;
  if (!regex?.test(value?.phoneNumber)) return regexErrorMessage;
  if (
    value?.phoneNumber?.length < 5 ||
    !isValidNumberForRegion(value?.phoneNumber?.toString(), value?.alpha2Code as CountryCode)
  ) {
    return regexErrorMessage;
  } else if (formFieldData?.maxAllowedLength && value?.phoneNumber?.length > formFieldData?.maxAllowedLength) {
    return maxLengthErrorMessage;
  } else if (formFieldData?.minRequiredLength && value?.phoneNumber?.length < formFieldData?.minRequiredLength) {
    return minLengthErrorMessage;
  }

  return true;
};
