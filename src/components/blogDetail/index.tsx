import React from "react";
import calenderSvg from "../../assets/temp/calendar.svg";
import CustomImage from "../CustomImage";
import Image from 'next/image'

const BlogDetailComponent = (props:any) => {
  return (
    <div>
      <h4 className="blogHead">{props.data?.title}</h4>
      <div className="detail_card_head">
        <div className="author">Author: {props.data?.author} |</div>
        <div className="d-inline-flex">
        <Image src={calenderSvg} alt="" />
          <div className="dates ms-1">{props.data?.date}</div>
        </div>
      </div>
      <div className="blogImg">
      <CustomImage className='blogCard-bg' src={{ defaultSource: props.data?.image}} alt={ props.data?.imageAltText} loader={'false'} />

      </div>
      <div className="blogDescription">
        <p>{props.data?.description}</p>
      </div>
    </div>
  );
};

export default BlogDetailComponent;
