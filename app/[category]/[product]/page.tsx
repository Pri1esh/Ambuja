import { ENDPOINT } from '@api-manager';
import {
  AboutSection,
  BrochureCard,
  CardSlider,
  CustomVideo,
  ErrorFallback,
  Faqs,
  FeaturesCard,
  HeroBanner,
  Layout,
  ProductsCard,
} from '@components';
import { IPageType } from '@interfaces';
import { getApiData, getMetadata } from '@utils/server';
import { redirect } from 'next/navigation';

export async function generateMetadata(props: IPageType): Promise<any> {
  const { params } = props;
  const apiData = await getApiData(ENDPOINT.SSR.productsPage + params.category + '/' + params.product);
  const { data } = apiData;
  return getMetadata(data?.seoData?.fields, data?.main?.heroBanner?.fields?.imageSourceMobile);
}

const ProductDetailsPage = async (props: IPageType) => {
  const { params } = props;
  const apiData = await getApiData(ENDPOINT.SSR.productsPage + params.category + '/' + params.product);
  const { data, errorData } = apiData;

  if (!data) {
    return redirect('/404');
  }
  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }
  const { header, footer, main } = data;
  const {
    seoData,
    heroBanner,
    dealerLocatorData,
    breadCrumbList,
    brochureData,
    features,
    areasApplication,
    videoBanner,
    CardSlider: cardSlider,
    products,
    HomeFAQ,
    aboutPage,
  } = main;

  return (
    <Layout
      navBarType="productDetail"
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      seoData={seoData?.fields}
      headerAbsolute={false}
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
      {heroBanner?.fields && (
        <HeroBanner
          compData={heroBanner?.fields}
          dealerLocatorData={dealerLocatorData?.fields}
          isPDPBanner={true}
          breadCrumbList={breadCrumbList?.fields}
        />
      )}
      {brochureData?.fields && <BrochureCard compData={brochureData?.fields} />}
      {features?.fields?.gallery?.length > 0 && (
        <div className="container">
          <FeaturesCard compData={features?.fields} />
        </div>
      )}
      {areasApplication?.fields && (
        <ProductsCard compData={areasApplication?.fields} className={!videoBanner?.fields ? 'mb-0' : ''} />
      )}
      {videoBanner?.fields && (
        <div className="container">
          <CustomVideo compData={videoBanner?.fields} />
        </div>
      )}
      {cardSlider?.fields && <CardSlider compData={cardSlider?.fields} noMargin={true} />}
      {products?.fields && <ProductsCard compData={products?.fields} />}
      <div className="container">
        {HomeFAQ?.fields?.data?.length > 0 && <Faqs compData={HomeFAQ?.fields} />}
        {aboutPage?.fields && <AboutSection compData={aboutPage?.fields} />}
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
