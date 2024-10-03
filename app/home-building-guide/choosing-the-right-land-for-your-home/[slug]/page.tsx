import { ENDPOINT } from '@api-manager';
import { Breadcrumbs, Checklist, ErrorFallback, Layout, VectorCard } from '@components';
import { IPageType } from '@interfaces';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(props: IPageType): Promise<any> {
  const { params } = props;
  const apiData = await getApiData(ENDPOINT.SSR.choosingLand + params?.slug);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}

const SlugPage = async (props: IPageType) => {
  const { params } = props;
  const apiData = await getApiData(ENDPOINT.SSR.choosingLand + params?.slug);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const { seoData, breadCrumbList, VectorCard: vectorCardData, Checklist: checklistData, overview } = main;

  return (
    <Layout
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
      navBarType="productDetail"
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
      {breadCrumbList?.fields?.items?.length > 0 && (
        <div className="container">
          <Breadcrumbs list={breadCrumbList?.fields?.items} />
        </div>
      )}
      {vectorCardData?.fields && <VectorCard compData={vectorCardData?.fields} overview={overview?.fields} />}
      {checklistData?.fields && (
        <div className="container">
          <Checklist compData={checklistData?.fields} />
        </div>
      )}
    </Layout>
  );
};

export default SlugPage;
