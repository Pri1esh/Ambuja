import { ENDPOINT } from '@api-manager';
import {
  AboutSection,
  AppCookie,
  CardSlider,
  CostCalculatorWidget,
  CustomVideo,
  ErrorFallback,
  Faqs,
  HomeCategoryList,
  Layout,
  MainBanner,
  ScaleSlider,
  VerticalCarousel,
} from '@components';
import { getApiData, getMetadata } from '@utils/server';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.homePage);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
}

const HomePage = async () => {
  const apiData = await getApiData(ENDPOINT.SSR.homePage);
  const { data, errorData } = apiData;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  const { footer, header, main } = data;
  return (
    <Layout
      footerData={footer?.footer?.fields}
      headerData={header?.header?.fields}
      headerAbsolute={false}
      isHomePage={true}
      seoData={main?.seoData?.fields}
      defaultActiveTab={main?.CommonKey?.fields?.defaultActiveTab}
    >
      <MainBanner compData={main?.mainBanner?.fields} />
      {main?.categoriesList?.fields?.categoriesList && (
        <HomeCategoryList categoryData={main?.categoriesList?.fields?.categoriesList} />
      )}
      {main?.ScaleSlider?.fields && <ScaleSlider compData={main?.ScaleSlider?.fields} />}
      {main?.costCalculatorData?.fields && (
        <CostCalculatorWidget compData={main?.costCalculatorData?.fields} inPage={false} />
      )}
      {main?.verticalCarousel?.fields && <VerticalCarousel compData={main?.verticalCarousel?.fields} />}
      {main?.CardSlider?.fields && <CardSlider compData={main?.CardSlider?.fields} />}
      <div className="container">
        {main?.HomeFAQ?.fields && <Faqs compData={main?.HomeFAQ?.fields} />}
        {main?.videoBanner?.fields && <CustomVideo compData={main?.videoBanner?.fields} />}
        {main?.cookies?.fields && <AppCookie compData={main?.cookies?.fields} />}
        {main?.aboutPage?.fields && <AboutSection compData={main?.aboutPage?.fields} isHomePage={true} />}
      </div>
    </Layout>
  );
};

export default HomePage;
