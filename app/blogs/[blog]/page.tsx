import {BreadCrumb,BlogDetailComponent, BlogTile,Layout,ErrorFallback} from "@components";
import { ENDPOINT } from "@api-manager";
import { getApiData, getMetadata } from '@utils/server';
import { IPageType } from '@interfaces';
import '../../../styles/blogs.scss';


export async function generateMetadata(props: IPageType): Promise<any> {
  const { params } = props;
    const pageName = params?.blog;
  const apiData = await getApiData(ENDPOINT.SSR.blogDetail+pageName+"&bloglist=false");
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
} 

const BlogDetail = async (props: IPageType) => {
  const bcrumb = [
    { txt: "Home", link: "/" },
    { txt: "Blogs", link: "/blogs" },
  ];
  const { params } = props;
  const pageName = params?.blog;
  const apiData = await getApiData(ENDPOINT.SSR.blogDetail+pageName+"&bloglist=false");
  const { data, errorData } = apiData;
  const { footer, header, main } = data;
  const blogData:any = main;
  const category:any = main?.BlogDetailRendering?.fields?.blogDetailChild?.category;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  return (
    <Layout headerData={header?.header?.fields} footerData={footer?.footer?.fields} navBarType="productDetail">
      <BreadCrumb crumbs={bcrumb} />
      {blogData && (
        <div className="blogSection blogDetailSection container mb-5">
          
          {blogData?.BlogDetailRendering && 
            <div className="blogList-left">
            <BlogDetailComponent data={blogData?.BlogDetailRendering?.fields?.blogDetailChild} />
          </div>
          }

          {blogData?.Blog && 
            <div className="blogList-right bg_blogdetail">
            <div className="right-list">
              {blogData?.Blog?.fields?.recentBlogs && category && (
                <div className="mb-5">
                  <h3 className="cate-head">Recnt Blogs</h3>
                  {blogData?.Blog?.fields.recentBlogs
                    .find((blogcat: any) => blogcat.category === category)
                    ?.data.map((item: any, index: number) => (
                      <BlogTile key={index} tileData={item} />
                    ))}
                </div>
              )}

              {blogData?.Blog?.fields?.trendingBlogs && category && (
                <div className="mb-5">
                  <h3 className="cate-head">Trending Blogs</h3>
                  {blogData?.Blog?.fields.trendingBlogs
                    .find((blogcat: any) => blogcat.category === category)
                    ?.data.map((item: any, index: number) => (
                      <BlogTile key={index} tileData={item} />
                    ))}
                </div>
              )}
            </div>
          </div>
          } 
         
      </div>)}




      {/* {!blogData && (
        <div className="container mt-5">
          <ShimmerText line={1} className="w-25" />
          <ShimmerThumbnail height={250} rounded className="d-md-block d-none" />
          <ShimmerThumbnail height={150} rounded className="d-md-none d-block" />
          <ShimmerText line={1} className="w-25 my-4" />
          <div className="blogSection container">
            <div className="blogList-left">
              {[...Array(5)].map((x: any, i: number) => (
                <ShimmerContentBlock key={i} title text cta thumbnailWidth={370} thumbnailHeight={370} />
              ))}
            </div>
            <div className="blogList-right">
              <ShimmerThumbnail height={250} rounded />
            </div>
          </div>
        </div>
      )} */}
    </Layout>
  );
};

export default BlogDetail;
