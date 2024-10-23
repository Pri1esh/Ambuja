import React from "react";

const BreadCrumb = (props: any) => {
  return (
    <section className="crumbs d-none d-md-block mt-3 mb-5">
      <div className="container">
        <div className="bread-line">
          {props.crumbs &&
            props.crumbs.map((crumb: any, index: number) =>
              props.crumbs.length - 1 > index ? (
                <div key={index}>
                  <a href={crumb.link}>
                    <span>{crumb.txt}</span>
                  </a>
                  &nbsp; /&nbsp;
                </div>
              ) : (
                <div key={index}>
                  <a href={crumb.link}>
                    <span>{crumb.txt}</span>
                  </a>
                </div>
              )
            )}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumb;
