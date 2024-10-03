import { ENDPOINT } from '@api-manager';
import { Breadcrumbs, DealerWrapper, ErrorFallback, Layout } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.dealerResultPage);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}

const DealersNearYouPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.dealerResultPage);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }
  const { footer, header, main } = data;
  const { breadCrumbList, dealerLocatorData } = main;
  return (
    <Layout headerData={header?.header?.fields} footerData={footer?.footer?.fields} navBarType="productDetail">
      <div className="container">
        {breadCrumbList && (
          <div className="mt-4 pt-2">
            <Breadcrumbs list={breadCrumbList?.fields?.items} />
          </div>
        )}

        <DealerWrapper compData={dealerLocatorData?.fields} inPage={true} />
      </div>
    </Layout>
  );
};

export default DealersNearYouPage;
