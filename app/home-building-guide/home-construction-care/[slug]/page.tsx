import { ENDPOINT } from '@api-manager';
import { Breadcrumbs, ErrorFallback, Layout, Overview, TwoColumnCard, TwoColumnList } from '@components';
import { IPageType } from '@interfaces';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(props: IPageType): Promise<any> {
  const { params } = props;
  const apiData = await getApiData(ENDPOINT.SSR.homeConstructionCarePage + params?.slug);
  const { data } = apiData;
  return getMetadata(data?.seoData?.fields);
}

const page = async (props: IPageType) => {
  const { params } = props;
  const apiData = await getApiData(ENDPOINT.SSR.homeConstructionCarePage + params?.slug);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const {
    breadCrumbList,
    seoData,
    TwoColumnList: TwoColumnListData,
    overview,
    TwoColumnCard: TwoColumnCardData,
  } = main;
  return (
    <Layout
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
      navBarType="productDetail"
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
      <div className="container">
        {breadCrumbList?.fields?.items?.length > 0 && <Breadcrumbs list={breadCrumbList?.fields?.items} />}
        {overview?.fields && <Overview compData={overview?.fields} />}
        {TwoColumnListData?.fields && <TwoColumnList compData={TwoColumnListData?.fields} />}
      </div>
      {TwoColumnCardData?.fields && <TwoColumnCard compData={TwoColumnCardData?.fields} />}
    </Layout>
  );
};

export default page;
