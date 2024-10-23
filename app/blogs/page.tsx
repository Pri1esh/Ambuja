import React from "react";
import {BlogBanner, BlogContainer, ErrorFallback,BlogSearch,Layout} from "@components";
import {BreadCrumb} from "@components";
import { getApiData, getMetadata } from '@utils/server';
import { ENDPOINT } from "@api-manager";
import '../../styles/blogs.scss';

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.blogListPage);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
} 


const Bloglist = async () => {
  const bcrumb = [
    { txt: "Home", link: "/" },
    { txt: "Blogs", link: "/blogs" },
  ];

  const apiData = await getApiData(ENDPOINT.SSR.blogListPage);
  const { data, errorData } = apiData;
  const { footer, header, main } = data;
  const BlogListData:any = main;

  if (errorData || !data) {
    return <ErrorFallback description={errorData?.error} errorMessage={errorData?.errorMessage} />;
  }

  return (
    <Layout headerData={header?.header?.fields} footerData={footer?.footer?.fields} navBarType="productDetail">
      <BreadCrumb crumbs={bcrumb} />
      {BlogListData?.HomeSection && 
        <>
        <BlogBanner key={BlogListData?.HomeSection?.componentName} data={BlogListData?.HomeSection?.fields} />
        <BlogSearch />
      </>
      }
      {BlogListData?.Blog && 
        <BlogContainer data={BlogListData?.Blog}/>
      }


      {/* {BlogListData &&
        BlogListData?.map((elem: any) => {
          if (elem.componentName === "HomeSection") {
            return (
              <>
                <BlogBanner key={elem.componentName} data={elem.fields} />
                <BlogSearch />
              </>
            );
          } else if (elem.componentName === "Blog") {
            return (
              <BlogContainer data={elem.fields}/>
            );
          }
        })} */}

      
</Layout>
  );
};

export default Bloglist;
