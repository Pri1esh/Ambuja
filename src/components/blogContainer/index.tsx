import React, { useEffect, useRef } from 'react';
import {BlogListSection, BlogTile} from "@components";
import Image from 'next/image'
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import { Pagination, Navigation, EffectFlip } from "swiper/modules";

import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';


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


                      
                      <Tab.Container id="left-tabs-example" defaultActiveKey={"Retailer"}>
                      
                      <Nav variant="pills" className="mb-4">
                      <h3 className="cate-head">Keywords</h3>
                        <div className='d-flex gap-3 flex-wrap'>
                        {data.fields?.recentBlogs &&
                            data.fields?.recentBlogs.map((item: any, index: number) => (
                              <Nav.Item className='' key={index}>
                                <Nav.Link eventKey={item.category} className="cat-button rounded-pill">
                                    {item.category}
                                </Nav.Link>
                              </Nav.Item>
                            ))}
                        </div>
                        </Nav>
                          
                            <Tab.Content>
                            {data.fields?.recentBlogs &&
                          data.fields?.recentBlogs.map((item: any, index: number) => (
                            <Tab.Pane key={index} eventKey={item.category}>
                              <div className="mb-5">
                                <h3 className="cate-head">Recent Blogs</h3>
                                {item?.data.map((recentBlog: any, ind: number) => (
                                  <BlogTile key={ind} tileData={recentBlog} num={ind} />
                                ))}
                              </div>
                              <div className="mb-5">
                                <h3 className="cate-head">Trending</h3>
                                {data.fields?.trendingBlogs && data.fields?.trendingBlogs
                                  .find((trend: any) => trend.category === item.category)
                                  ?.data?.map((trendBlog: any, trendNum: number) => (
                                    <BlogTile key={trendNum} tileData={trendBlog} num={trendNum} />
                                  ))}
                              </div>
                              </Tab.Pane>
                          ))}
                              
                            </Tab.Content>
                        
                        
                      </Tab.Container>

                      


                    </div>
                  </div>
                )}
              </div>
  )
}

export default BlogContainer