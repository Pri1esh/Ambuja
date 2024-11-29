import React, { useState } from "react";
import searchBtn from "../../assets/temp/search_mag.svg";
import { ThreeDots } from "react-loader-spinner";
import Image from 'next/image'


import axios from "axios";
import CustomImage from "../CustomImage";

const BlogSearch = () => {
  const clientHost = process.env.NEXT_PUBLIC_API_HOST_CLIENT;

  const [searchData, setsearchData] = useState<string>();
  const [showResult, setShowResult] = useState<boolean>(false);
  const [searchList, setsearchList] = useState<any>(null);
  const [found, setfound] = useState<string>("finding");

  const fetchBlogData = async (searchTerm: string): Promise<any> => {
    try {
      const response = await axios.post<any>(
        `${clientHost}/formsapi/GetInTouch/getblog`,
        {
          searchTerm,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Cookie: "ASP.NET_SessionId=1tvqct3bxjepa3jxcqb4430a; SC_ANALYTICS_GLOBAL_COOKIE=50375b5c8f9d4343af53bac211e82be1|False; ASP.NET_SessionId=1tvqct3bxjepa3jxcqb4430a; SC_ANALYTICS_GLOBAL_COOKIE=50375b5c8f9d4343af53bac211e82be1|False; shell#lang=en",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching blog data:", error);
      throw error;
    }
  };

  const convertCTA = (uri: string): any => {
    return uri?.split("/")?.pop()?.replace(/ /g, "-");
  };

  const searchBlog = async (event: any) => {
    const searchValue = event.target.value;
    setsearchList(null);
    setsearchData(searchValue);
    if (searchValue.length >= 3) {
      setShowResult(true);
      setfound("finding");
      try {
        const data = await fetchBlogData(searchValue);
        if (data && data.Data.length > 0) {
          setsearchList(data?.Data);
        setfound("found");
        } else {
          setsearchList(null);
          setfound("nothing");
        }
      } catch (error) {
        setfound("nothing");
        console.error("Error:", error);
      }
    } else {
      setShowResult(false);
    }
  };

  return (
    <div className="blog-search container">
      <div className="blog-searchBox">
        <button className="blog-srh-btn">
        <Image src={searchBtn} alt="" />
        </button>
        <input className="blog-searchBar" placeholder="Search by keywords" onChange={searchBlog} value={searchData} />
      </div>
      {showResult && (
        <div className="blog-searchResult">
          {(found === "found") && (
            <ul className="list-unstyled">
              {searchList &&
                searchList.map((item: any, index: number) => (
                  <li key={index}>
                    <a href={"/blogs/"+convertCTA(item.CTALink)} className="text-dark text-decoration-none" key={index}>
                      <div className="blog-SearchTile">
                        <div className="d-flex align-items-center">
                          {item?.Image && <CustomImage className='result-img' src={{ defaultSource: item.Image }} alt="" loader={'false'} />}
                          <div className="result-content">
                            {item.Title && <h5 className="result-head">{item.Title}</h5>}
                            {item.Description && <p className="result-description text-truncate">{item.Description}</p>}
                          </div>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
            </ul>
          )}

          {(found === "nothing") && (
            <div className="d-flex justify-content-center align-items-center w-100 h-100">
              <div className="noResult">
                <Image src={searchBtn} alt="" />
                <h5 className="conten">No Result Found!</h5>
              </div>
            </div>
          )}

          {found === "finding" && (
            <div className="d-flex justify-content-center align-items-center w-100 h-100">
                <ThreeDots
                visible={true}
                height="25"
                width="25"
                color="#222222"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass="d-inline"
                />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogSearch;
