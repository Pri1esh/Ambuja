import { IFieldData } from '@interfaces';

export const fileInputValidator = (formFieldData: IFieldData, value: File) => {
  const { errorMessages } = formFieldData;
  const { maxFileSizeErrorMessage, minFileSizeErrorMessage, regexErrorMessage, requiredFieldErrorMessage } =
    errorMessages;
  if (value) {
    const fileType = value?.type?.toLowerCase();
    if (
      fileType !== 'application/pdf' &&
      fileType !== 'application/msword' &&
      fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
      return regexErrorMessage;
    const fileSize = value?.size / (1024 * 1024);
    const fixFileSize = fileSize.toFixed(3);
    if (formFieldData?.maxAllowedFileSize && fixFileSize > formFieldData?.maxAllowedFileSize)
      return maxFileSizeErrorMessage;
    if (formFieldData?.minRequiredFileSize && fixFileSize < formFieldData?.minRequiredFileSize)
      return minFileSizeErrorMessage;

    return true;
  }
  return requiredFieldErrorMessage;
};
