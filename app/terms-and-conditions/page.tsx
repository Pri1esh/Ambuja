import { ENDPOINT } from '@api-manager';
import { ErrorFallback, HeroBanner, Layout, Legal, SubNav } from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.termsPage);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}

const TermsPage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.termsPage);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const { mainBanner, breadCrumbList, seoData, subNav, Details } = main;
  return (
    <Layout footerData={footer?.footer?.fields} headerData={header?.header?.fields} seoData={seoData?.fields}>
      {mainBanner?.fields && (
        <HeroBanner compData={mainBanner?.fields} noMargin={true} breadCrumbList={breadCrumbList?.fields} />
      )}
      {subNav?.fields?.items?.length > 0 && <SubNav compData={subNav?.fields?.items} />}
      <div className="container">
        <Legal
          compData={{
            details: Details?.fields,
          }}
        />
      </div>
    </Layout>
  );
};

export default TermsPage;
