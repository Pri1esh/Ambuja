import React from "react";
import calenderSvg from "../../assets/temp/calendar.svg";


const baseUrl = process.env.REACT_APP_BASE_URL;

const BlogDetailComponent = (props:any) => {
  return (
    <div>
      <h4 className="blogHead">{props.data?.title}</h4>
      <div className="detail_card_head">
        <div className="author">Author: {props.data?.author} |</div>
        <div className="d-inline-flex">
          <img src={calenderSvg} alt="" />
          <div className="dates ms-1">{props.data?.date}</div>
        </div>
      </div>
      <div className="blogImg">
        <img src={baseUrl + props.data?.image} alt="" />
      </div>
      <div className="blogDescription">
        <p>{props.data?.description}</p>
      </div>
    </div>
  );
};

export default BlogDetailComponent;
