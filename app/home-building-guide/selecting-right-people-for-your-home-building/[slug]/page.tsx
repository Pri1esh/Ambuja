import { ENDPOINT } from '@api-manager';
import { Breadcrumbs, ErrorFallback, Layout, VectorCard } from '@components';
import { IPageType } from '@interfaces';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(props: IPageType): Promise<any> {
  const { params } = props;
  const apiData = await getApiData(ENDPOINT.SSR.selectingRightPeople + params?.slug);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}
const SelectingMaterialPageSlugPage = async (props: IPageType) => {
  const { params } = props;
  const apiData = await getApiData(ENDPOINT.SSR.selectingRightPeople + params?.slug);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const { seoData, breadCrumbList, overview, VectorCard: vectorCard } = main;

  return (
    <Layout
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
      navBarType="productDetail"
    >
      <div className="container">
        {breadCrumbList?.fields?.items.length > 0 && <Breadcrumbs list={breadCrumbList?.fields?.items} />}
      </div>
      {vectorCard?.fields && <VectorCard compData={vectorCard?.fields} overview={overview?.fields} />}
    </Layout>
  );
};

export default SelectingMaterialPageSlugPage;
