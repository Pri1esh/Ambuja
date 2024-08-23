import { CustomLink } from '@components';
import { IHeaderNavData } from '@interfaces';
import { GTMHelper } from '@utils';
import React, { useState } from 'react';
import GetInTouchForm from '../Forms/GetInTouchForm';
import styles from './header.module.scss';

const EnquiryButton = (props: { data: IHeaderNavData }) => {
  const { data } = props;
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <div className={styles.mEnquiryButton}>
        <CustomLink
          href={data?.link}
          variant={'anchor'}
          target={data?.linkTarget}
          onClick={(e: any) => {
            if (data?.headerCallback) {
              e?.preventDefault();
              setShow(true);
            }
            GTMHelper({ ...data?.gtmData });
          }}
        >
          {data?.linkText}
        </CustomLink>
      </div>
      <GetInTouchForm isPopup={true} setShow={setShow} show={show} />
    </>
  );
};

export default EnquiryButton;
