import { ENDPOINT } from '@api-manager';
import { getApiData } from '@utils/server';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data } = await getApiData(ENDPOINT.SSR.sitemapXMLApi);
  console.info('====>', process.env.NEXT_PUBLIC_API_HOST_SSR + ENDPOINT.SSR.sitemapXMLApi, new Date().toString());
  if (data?.main) {
    const sitemap = data?.main?.SitemapXML?.fields?.sitemapXML?.map((item: any) => ({
      url: item?.url,
      lastModified: item?.lastmod,
      priority: item?.priority,
      changeFrequency: item?.changeFrequency,
    }));

    return sitemap || []; // Return an empty array if sitemap is null or undefined
  } else {
    return [];
  }
}
