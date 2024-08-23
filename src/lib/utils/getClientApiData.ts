import { getAPI } from '@api-manager';
import { MESSAGES } from '@enum';

const getClientApiData = async (apiUrl: string) => {
  const data = null;
  let errorData = null;

  try {
    const res = await getAPI(apiUrl, false);
    return {
      data: res,
      errorData: errorData,
    };
  } catch (error: any) {
    errorData = {
      data: null,
      error: MESSAGES.API_ISSUE,
      errorMessage: JSON.stringify(error),
    };
    return {
      data: data,
      errorData: errorData,
    };
  }
};

export default getClientApiData;
