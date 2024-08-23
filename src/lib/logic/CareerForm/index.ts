import { IFieldData } from '@interfaces';
import { dropdownInputValidator } from './DropdownInput';
import { fileInputValidator } from './FileInput';
import { mobileInputValidator } from './MobileInput';
import { textInputValidator } from './TextInput';

export const formValidator = (formFieldData: IFieldData, value: any) => {
  switch (formFieldData?.fieldType) {
    case 'text':
      return textInputValidator(formFieldData, value);
    case 'phone':
      return mobileInputValidator(formFieldData, value);
    case 'dropdown':
      return dropdownInputValidator(formFieldData, value);
    case 'file':
      return fileInputValidator(formFieldData, value);
    default:
      return true;
  }
};
