import React from "react";

import calenderSvg from "../../assets/temp/calendar.svg";
import Image from 'next/image'
import CustomImage from "../CustomImage";


const Bloglgcard = (props: any) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const convertCTA = (uri: string): any => {
    return uri?.split("/")?.pop()?.replace(/ /g, "-");
  };

  return (
    <div className="bloglgCard block-space">
      <CustomImage className='blogCard-bg' src={{ defaultSource: props.blogData?.image }} alt="" loader={'false'} />
      <div className="innerBox">
        <div className="box-head mb-4">
          <button className="blog-md-btn rounded-pill">{props.blogData?.category}</button>
          <div className="card_head">
            <div className="author">Author: {props.blogData?.author} |</div>
            <div className="d-inline-flex">
            <Image src={calenderSvg} alt="" />
              <div className="dates ms-1">{props.blogData?.date}</div>
            </div>
          </div>
        </div>
        <h5 className="mb-3">{props.blogData?.title}</h5>
        <p className="mb-4">{props.blogData?.description}</p>
        <a className="text-decoration-none" href={convertCTA(props.blogData?.ctaLink)}>
          <button className="blog-lg-btn rounded-pill">Read More</button>
        </a>
      </div>
    </div>
  );
};

export default Bloglgcard;
