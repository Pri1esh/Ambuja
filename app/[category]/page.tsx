import { ENDPOINT } from '@api-manager';
import {
  AboutSection,
  CardSlider,
  ErrorFallback,
  Faqs,
  HeroBanner,
  HomeCategoryList,
  Layout,
  ProductList,
} from '@components';
import { IPageType } from '@interfaces';
import { getApiData, getMetadata } from '@utils/server';
import { redirect } from 'next/navigation';

export async function generateMetadata(props: IPageType): Promise<any> {
  const { params } = props;
  const apiData = await getApiData(ENDPOINT.SSR.productsPage + params.category);
  const { data } = apiData;
  return getMetadata(data?.seoData?.fields, data?.main?.heroBanner?.fields?.imageSourceMobile);
}

const ProductListPage = async (props: IPageType) => {
  const { params } = props;
  const apiData = await getApiData(ENDPOINT.SSR.productsPage + params.category);
  const { data, errorData } = apiData;

  if (!data) {
    return redirect('/404');
  }

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  const {
    breadCrumbList,
    seoData,
    heroBanner,
    categoriesList,
    productList: productListData,
    CardSlider: CardSliderData,
    HomeFAQ,
    aboutPage,
  } = main;
  return (
    <Layout
      navBarType="productPages"
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
      {heroBanner?.fields && (
        <HeroBanner compData={heroBanner?.fields} noMargin={true} breadCrumbList={breadCrumbList?.fields} />
      )}
      {categoriesList?.fields?.categoriesList && (
        <HomeCategoryList categoryData={categoriesList?.fields?.categoriesList} type="category" isCategoryPage={true} />
      )}
      {productListData?.fields && <ProductList compData={productListData?.fields} />}
      {CardSliderData?.fields && <CardSlider compData={CardSliderData?.fields} />}
      <div className="container">
        {HomeFAQ?.fields && <Faqs compData={HomeFAQ?.fields} />}
        {aboutPage?.fields && <AboutSection compData={aboutPage?.fields} />}
      </div>
    </Layout>
  );
};

export default ProductListPage;
