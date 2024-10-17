import React, { useEffect, useRef } from 'react';
import {BlogListSection, BlogTile, CustomIcon} from "@components";
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import { Pagination, Navigation, EffectFlip } from "swiper/modules";


import rightChev from "../../assets/icons/right.svg";
import leftChev from "../../assets/icons/left.svg";

const BlogContainer = (props:any) => {
    const {data} = props;
    const swiperRef = useRef<SwiperType>();

    const pagination = {
        clickable: true,
        renderBullet: function (index: number, className: string) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      };
    
      const pageArrange = (currentSlide: any) => {
        // Find all pagination bullets
        const bullets = document.querySelectorAll<HTMLSpanElement>(".swiper-pagination-bullet");
    
        // Find the specific bullet element based on numberFromFunction
        let targetBullet: HTMLSpanElement | any = null;
        bullets.forEach((bullet) => {
          if (bullet.innerHTML.trim() === `${currentSlide}`) {
            targetBullet = bullet;
          }
        });
    
        // Scroll the swiper-pagination container to bring the target bullet into view
        if (targetBullet) {
          const paginationContainer = document.querySelector<HTMLDivElement>(".swiper-pagination");
          if (paginationContainer) {
            const containerRect = paginationContainer.getBoundingClientRect();
            const targetRect = targetBullet.getBoundingClientRect();
    
            // Calculate the scroll position to center the target element
            const scrollLeft = targetRect.left - containerRect.left - (containerRect.width - targetRect.width - 25) / 2;
    
            paginationContainer.scroll({
              left: scrollLeft,
              behavior: "smooth",
            });
          }
        }
      };

    useEffect(() => {
        console.warn("asdfasdf");
         
          // For sizing pagination
    
          const bullets = document.querySelectorAll<HTMLSpanElement>(".swiper-pagination-bullet");
          if (bullets.length < 7) {
            const page_btn: HTMLDivElement | any = document.querySelector(".blogList-left .swiper-pagination");
            const nav_left: HTMLDivElement | any = document.querySelector(".blogList-left .blogswiper-left");
            const nav_right: HTMLDivElement | any = document.querySelector(".blogList-left .blogswiper-right");
            if (page_btn) {
              page_btn.style.justifyContent = "center";
            }
            if (nav_left) {
              nav_left.style.transform = `translateX(${-((bullets.length * 33) / 2) - 25}px)`;
            }
            if (nav_right) {
              nav_right.style.transform = `translateX(${(bullets.length * 33) / 2}px)`;
            }
          }
    
          console.log();
        
      }, []);


    

  return (
    <div key={data.componentName} className="blogSection container">
                <div className="blogList-left">
                  <Swiper
                    pagination={pagination}
                    effect={"flip"}
                    modules={[EffectFlip, Navigation, Pagination]}
                    onBeforeInit={(swiper: any) => {
                      swiperRef.current = swiper;
                    }}
                    className="blogSwiper"
                  >
                    {data?.fields?.blog &&
                      data?.fields?.blog.map((blogset: any, index: number) => (
                        <SwiperSlide>
                          <BlogListSection key={index} blogSet={blogset.data} />
                        </SwiperSlide>
                      ))}
                    <div>
                      <button
                        className="blogswiper-left"
                        onClick={() => {
                          swiperRef.current?.slidePrev();
                          pageArrange(swiperRef.current?.activeIndex);
                        }}
                      >
                        <Image className='h-100' src={leftChev} alt=""/>
                      </button>
                      <button
                        className="blogswiper-right"
                        onClick={() => {
                          swiperRef.current?.slideNext();
                          pageArrange(swiperRef.current?.activeIndex);
                        }}
                      >
                        <Image className='h-100' src={rightChev} alt=""/>
                      </button>
                    </div>
                  </Swiper>
                </div>
                {data.fields && (


                  <div className="blogList-right bg_bloglist">
                    <div className="right-list">


                      <div className="mb-5">
                        <h3 className="cate-head">Keywords</h3>

                        
                        <div className="row" role="tablist">
                          {data.fields?.recentBlogs &&
                            data.fields?.recentBlogs.map((item: any, index: number) => (
                              <div key={index} className="col-md-4 col-6">
                                <button className={index == 0 ? "cat-button rounded-pill active show" : "cat-button rounded-pill"} data-bs-toggle="tab" data-bs-target={`#tab-${item.category}`}>
                                  {item.category}
                                </button>
                              </div>
                            ))}
                        </div>
                        
                      </div>


                      <div className="tab-content">
                        {data.fields?.recentBlogs &&
                          data.fields?.recentBlogs.map((item: any, index: number) => (
                            <div key={index} id={`tab-${item.category}`} className={index == 0 ? "tab-pane fade active show" : "tab-pane fade"}>
                              <div className="mb-5">
                                <h3 className="cate-head">{item.category}</h3>
                                {item?.data.map((recentBlog: any, ind: number) => (
                                  <BlogTile key={ind} tileData={recentBlog} num={ind} />
                                ))}
                              </div>
                              <div className="mb-5">
                                <h3 className="cate-head">Keywords</h3>
                                {data.fields?.trendingBlogs && data.fields?.trendingBlogs
                                  .find((trend: any) => trend.category === item.category)
                                  ?.data?.map((trendBlog: any, trendNum: number) => (
                                    <BlogTile key={trendNum} tileData={trendBlog} num={trendNum} />
                                  ))}
                              </div>
                            </div>
                          ))}
                      </div>



                    </div>
                  </div>
                )}
              </div>
  )
}

export default BlogContainer