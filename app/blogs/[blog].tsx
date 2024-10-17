import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../contexts/datacontext";
import BreadCrumb from "../../components/breadCrumb/breadCrumb";
import BlogTile from "../../components/blogTile/blogTile";
import BlogDetailComponent from "../../components/blogDetail/blogDetail";
import Endpoints from "../../api-manager/endpoints";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ShimmerSectionHeader, ShimmerContentBlock, ShimmerText, ShimmerThumbnail } from "react-shimmer-effects";


const BlogDetail = () => {
  let bcrumb = [
    { txt: "Home", link: "/" },
    { txt: "Blogs", link: "/blogs" },
  ];
  const [blogData, setblogData] = useState<any>();
  const [category, setCategory] = useState<string>();
  const location = useLocation();
  const pageName = location.pathname.split("/").pop();

  const getblogData = async () => {
    axios
      .get(Endpoints.blogDetail + pageName?.replace(/ /g, "-") + "&bloglist=false")
      .then((response: any) => {
        setblogData(response.data.sitecore.route.placeholders["Main"]);
      })
      .catch((error: any) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (!blogData) {
      getblogData();
    } else {
      const cateGory = blogData.find((item: any) => item.componentName === "Blog Detail Rendering")?.fields?.blogDetailChild?.category;
      if (cateGory) {
        setCategory(cateGory);
      }
      console.log(blogData);
    }
  }, [blogData]);

  return (
    <>
      <BreadCrumb crumbs={bcrumb} />
      {blogData && (<div className="blogSection blogDetailSection container mb-5">
        {blogData &&
          blogData?.map((elem: any) => {
            if (elem.componentName === "Blog Detail Rendering") {
              return (
                <>
                  <div className="blogList-left">
                    <BlogDetailComponent data={elem.fields?.blogDetailChild} />
                  </div>
                </>
              );
            } else if (elem.componentName === "Blog") {
              return (
                <div className="blogList-right bg_blogdetail">
                  <div className="right-list">
                    {elem.fields?.recentBlogs && category && (
                      <div className="mb-5">
                        <h3 className="cate-head">Recnt Blogs</h3>
                        {elem.fields.recentBlogs
                          .find((blogcat: any) => blogcat.category === category)
                          ?.data.map((item: any, index: number) => (
                            <BlogTile key={index} tileData={item} />
                          ))}
                      </div>
                    )}

                    {elem.fields?.trendingBlogs && category && (
                      <div className="mb-5">
                        <h3 className="cate-head">Trending Blogs</h3>
                        {elem.fields.trendingBlogs
                          .find((blogcat: any) => blogcat.category === category)
                          ?.data.map((item: any, index: number) => (
                            <BlogTile key={index} tileData={item} />
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          })}
      </div>)}
      {!blogData && (
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
      )}
    </>
  );
};

export default BlogDetail;
