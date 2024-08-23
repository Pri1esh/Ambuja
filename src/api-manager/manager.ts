import Axios from 'axios';
import https from 'https';

const Agent = new https.Agent({ rejectUnauthorized: process.env.NEXT_PUBLIC_ENV === 'dev' ? false : true });
const ssrHost = process.env.NEXT_PUBLIC_API_HOST_SSR;
const clientHost = process.env.NEXT_PUBLIC_API_HOST_CLIENT;

const postHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,PATCH',
  'Access-Control-Allow-Credentials': 'true',
  'Strict-Transport-Security': 'max-age=31536000; includeSubdomains;preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
};

export async function postAPI(url: string, payload: Record<string, any> = {}, additionalHeader?: string) {
  const newHeader = additionalHeader
    ? {
        ...postHeader,
        AntiforgeryToken: additionalHeader,
      }
    : postHeader;

  const res = await Axios.post(clientHost + url, payload, { headers: newHeader });
  if (res.data.errors) {
    throw new Error('Failed to fetch API');
  }
  return res.data;
}

export async function getAPI(api: string, isSSR = true) {
  const url = isSSR ? ssrHost + api : clientHost + api;
  const res = await Axios.get(url, { httpsAgent: Agent });
  return res.data;
}

export async function getAllAPI(apis: string[], isSSR = true) {
  const combinedRequest: any[] = [];
  apis.forEach((api) => {
    const url = isSSR ? ssrHost + api : clientHost + api;
    combinedRequest.push(Axios.get(url, { httpsAgent: Agent }));
  });
  const combinedResponse = await Axios.all(combinedRequest);
  const finalData: any[] = [];
  combinedResponse.forEach((item: any) => {
    finalData.push(item.data);
  });
  return finalData;
}
