import React from "react";
import {BlogBanner, BlogContainer, ErrorFallback} from "@components";
import {BreadCrumb} from "@components";
import '../../styles/blogs.scss';
import { getApiData, getMetadata } from '@utils/server';

import leftChev from "../../assets/images/blog-left-chev.svg";
import rightChev from "../../assets/images/blog-right-chev.svg";

import {BlogSearch,Layout} from '@components';
import { ENDPOINT } from "@api-manager";

export async function generateMetadata(): Promise<any> {
  const apiData = await getApiData(ENDPOINT.SSR.blogListPage);
  const { data } = apiData;

  return getMetadata(data?.seoData?.fields);
} 


const Bloglist = async () => {
  let bcrumb = [
    { txt: "Home", link: "/" },
    { txt: "Blogs", link: "/blogs" },
  ];

  const apiData = await getApiData(ENDPOINT.SSR.blogListPage);
  const { data, errorData } = apiData;
  const { footer, header, main } = data;
  console.log("data",data?.main?.HomeSection)
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
