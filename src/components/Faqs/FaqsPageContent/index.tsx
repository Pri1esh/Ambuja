'use-client';
import { FaqTabs, Faqs } from '@components';
import { IFaqData, IFaqItemData, IFaqPageContent, IFaqTab } from '@interfaces';
import { useEffect, useState } from 'react';

const FaqsPageContent = (props: IFaqPageContent) => {
  const { faqs } = props;
  const [faqData, setFaqData] = useState<IFaqData>(faqs);
  const [activeTab, setActiveTab] = useState<string | undefined>(faqs?.data?.[0]?.categoryID);

  const setTabs = () => {
    const tabsList: IFaqTab[] = [];
    faqs?.data?.forEach((item: IFaqItemData) => {
      !tabsList.find((tab: IFaqTab) => tab?.categoryID === item?.categoryID) &&
        tabsList.push({ categoryID: item?.categoryID ?? '', categoryLabel: item?.categoryLabel });
    });
    return tabsList;
  };

  const tabs = setTabs();

  const handleCategoryChange = (category?: string) => {
    setActiveTab(category);
    const data = faqs?.data?.filter((item: IFaqItemData) => item?.categoryID === category);
    setFaqData((faqData: IFaqData) => ({
      ...faqData,
      data,
    }));
  };

  useEffect(() => {
    handleCategoryChange(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {tabs && <FaqTabs compData={tabs} handleTabChange={handleCategoryChange} activeTab={activeTab} />}
      {faqData && (
        <div className="container">
          <Faqs compData={faqData} isExpandable={true} />
        </div>
      )}
    </>
  );
};

export default FaqsPageContent;
