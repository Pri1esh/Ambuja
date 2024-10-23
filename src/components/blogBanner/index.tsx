import React from 'react';
import CustomImage from '../CustomImage';

const BlogBanner = (props:any) => {
  return (
    <>
    {props.data && 
      (
        <section>
        <div className="container">
             <div className='blogs-banner'>
                <div className='bannerGradient'></div>
                <div className='imgBox'>
                  <CustomImage className='h-100' src={{ defaultSource: props.data?.Image?.value?.src }} alt="" loader={'false'} />
                </div>
                <div className='content'>
                    <div className="title">{props.data?.Title?.value}</div>
                    <div className="description">{props.data?.SubHeading?.value}</div>
                </div>
             </div>
        </div>
    </section>
      )
    }
    </>
  )
}

export default BlogBanner