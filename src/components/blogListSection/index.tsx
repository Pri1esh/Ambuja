import React from "react";
import { motion } from "framer-motion";
import Bloglgcard from "../bloglgcard";
import Blogsmcard from "../blogsmcard";

const BlogListSection = (props:any) => {
  return (
    <>
        {props.blogSet &&(
            <div>
            {props.blogSet.length > 0 && (
              <motion.div className="animated-list" whileInView={{ opacity: 1, scale: 1, y: 0 }} initial={{ opacity: 0, scale: 0.3, y: -50 }} transition={{ duration: 0.4, delay: 0.2 }} viewport={{ once: true }}>
                <Bloglgcard blogData={props.blogSet[0]}/>
              </motion.div>
            )}
      
            <div className="middle-blogs">
              {props.blogSet.length > 1 && (
                <motion.div className="animated-list" whileInView={{ opacity: 1, scale: 1, y: 0 }} initial={{ opacity: 0, scale: 0.3, y: -50 }} transition={{ duration: 0.4, delay: 0.2 }} viewport={{ once: true }}>
                <Blogsmcard blogData={props.blogSet[1]}/>
              </motion.div>
              )}
      
              {props.blogSet.length > 2 && (
                <motion.div className="animated-list" whileInView={{ opacity: 1, scale: 1, y: 0 }} initial={{ opacity: 0, scale: 0.3, y: -50 }} transition={{ duration: 0.4, delay: 0.2 }} viewport={{ once: true }}>
                <Blogsmcard blogData={props.blogSet[2]}/>
              </motion.div>
              )}
            </div>
            {props.blogSet.length > 3 && (
                <motion.div className="animated-list" whileInView={{ opacity: 1, scale: 1, y: 0 }} initial={{ opacity: 0, scale: 0.3, y: -50 }} transition={{ duration: 0.4, delay: 0.2 }} viewport={{ once: true }}>
                <Bloglgcard blogData={props.blogSet[3]}/>
              </motion.div>
            )}
          </div>
        )}
           
    </>
    
  );
};

export default BlogListSection;


