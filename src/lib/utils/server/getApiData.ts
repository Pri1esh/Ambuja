import { getAPI } from '@api-manager';
import { MESSAGES } from '@enum';
import { apiDataFilter } from '@utils/server';

const getApiData = async (apiUrl: string) => {
  let data = null;
  let errorData = null;

  try {
    const res = await getAPI(apiUrl);
    data = apiDataFilter(res);
    return {
      data: data,
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

export default getApiData;
