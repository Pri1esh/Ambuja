import { ENDPOINT } from '@api-manager';
import { Breadcrumbs, ErrorFallback, Layout, Overview } from '@components';
import { getApiData, getMetadata } from '@utils/server';
import BisStandards from 'src/components/BisStandards';

interface ISlugPage {
  params: {
    slug: string;
  };
}

export async function generateMetadata(props: ISlugPage): Promise<any> {
  const { params } = props;
  const apiData = await getApiData(`${ENDPOINT.SSR.selectingRightMaterialSlug}${params?.slug}`);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}

const SlugPage = async (props: ISlugPage) => {
  const { params } = props;
  const apiData = await getApiData(`${ENDPOINT.SSR.selectingRightMaterialSlug}${params?.slug}`);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const { seoData, breadCrumbList, overview, bisStandards } = main;

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
        {overview?.fields && <Overview compData={overview?.fields} />}
        {bisStandards?.fields?.standards && <BisStandards compData={bisStandards?.fields?.standards} />}
      </div>
    </Layout>
  );
};

export default SlugPage;
