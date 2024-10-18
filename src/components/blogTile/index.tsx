import React from "react";
import { motion } from "framer-motion";
import CustomImage from "../CustomImage";


const BlogTile = (props: any) => {
  const baseUrl = process.env.REACT_APP_BASE_URL;

  const convertCTA = (uri: string): any => {
    return uri?.split("/")?.pop()?.replace(/ /g, "-");
  };

  return (
    <motion.div className="animated-list" whileInView={{ opacity: 1, scale: 1, x: 0 }} initial={{ opacity: 0, scale: 0.3, x: -50 }} transition={{ duration: 0.2, delay: props.num * 0.2 }} viewport={{ once: true }}>
      <a className="text-decoration-none" href={"/blogs/"+convertCTA(props.tileData?.ctaLink)}>
        <div className="blog_tile">
        <CustomImage className='blogCard-bg' src={{ defaultSource: props.tileData?.image }} alt="" loader={'false'} />
          <p>{props.tileData?.title}</p>
        </div>
      </a>
    </motion.div>
  );
};

export default BlogTile;
