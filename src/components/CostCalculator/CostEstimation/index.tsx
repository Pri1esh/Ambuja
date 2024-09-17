import React from 'react';
import { CustomIcon, FloatingInput, SelectDropdown } from '@components';
import { ICostEstimation, ICostSlab, IMaterialEstimateFilter, IMaterialSlab, ISelectDropdownOption } from '@interfaces';
import { getAmountDetail } from '@logic/costCalculator';
import { getIconByName, setFallBack, useDeviceType } from '@utils';
import { useEffect, useRef, useState } from 'react';
import styles from './costEstimation.module.scss';

const CostSlab = (props: any) => {
  const {
    label,
    qty,
    updateCost,
    icon,
    calculatorNum = 1,
    type = 'number',
    priceData,
    setPriceData,
    defaultPrice,
    data,
    costList,
    setCostList,
    deviceType,
  } = props;

  const [enteredPrice, setEnteredPrice] = useState<string | number>(
    type === 'percentage' ? `${defaultPrice}%` : defaultPrice,
  );

  const budgetBtnRef = useRef<HTMLButtonElement>(null);
  const premiumBtnRef = useRef<HTMLButtonElement>(null);
  const budgetSlabRef = useRef<HTMLDivElement>(null);
  const premiumSlabRef = useRef<HTMLDivElement>(null);

  const [slabPrice, setSlabPrice] = useState<number>();
  const [activeprod, setActiveprod] = useState<string>();
  const [activebag, setActivebag] = useState<string>();

  const getProductPrice = (product: string) => {
    return qty * data[0]?.[product];
  };

  const getBagPrice = (bagName: string) => {
    let bagRate = data[0]?.categorydata.find((item: any) => item.category === bagName)?.rate;
    if (bagRate === 'na') {
      bagRate = 0;
    }
    return qty * bagRate;
  };

  const updateCostList = (label: string, newCost: number) => {
    setCostList((prevList: any[]) => {
      const existingIndex = prevList.findIndex((item) => item.label === label);

      if (existingIndex !== -1) {
        return prevList.map((item, index) => (index === existingIndex ? { ...item, cost: newCost } : item));
      } else {
        return [...prevList, { label, cost: newCost }];
      }
    });
  };

  const formatIndianNumber = (num: number): string => {
    if (num < 100000) {
      // Numbers less than 100,000 are formatted as standard Indian number format
      return num.toLocaleString('en-IN');
    } else if (num < 10000000) {
      // Numbers between 100,000 and 10,000,000 are formatted in lakhs
      const lakhs = num / 100000;
      const formattedLakhs = lakhs.toFixed(2); // Format to 2 decimal places
      return `${formattedLakhs} lakh`;
    } else {
      // Numbers 10,000,000 and above are formatted in crores
      const crores = num / 10000000;
      const formattedCrores = crores.toFixed(2); // Format to 2 decimal places
      return `${formattedCrores} Cr`;
    }
  };

  useEffect(() => {
    if (label === 'Cement -bags') {
      let shouldActive = '';
      for (let i = 0; i < data[0]?.categorydata.length; i++) {
        const bag = data[0]?.categorydata[i];
        if (bag?.rate !== 'na') {
          shouldActive = bag?.category;
          break; // Exit loop when condition is met
        }
      }
      updateCostList(label, getBagPrice(shouldActive));
      setActivebag(shouldActive);
      setSlabPrice(getBagPrice(shouldActive));
    } else {
      updateCostList(label, getProductPrice('budget'));
      setSlabPrice(getProductPrice('budget'));
      setActiveprod('budget');
    }
  }, []);

  useEffect(() => {
    console.log('list', costList);
  }, [costList]);

  useEffect(() => {
    const idx = priceData?.findIndex((i: any) => i?.label === label);

    if (idx === -1) {
      setPriceData([...priceData, { label: label, price: enteredPrice }]);
    } else {
      const arr = priceData;
      if (type === 'percentage') {
        arr.splice(idx, 1);
        arr.push({ label: label, price: enteredPrice });
      } else {
        arr[idx] = { label: label, price: enteredPrice };
      }
      setPriceData(arr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enteredPrice]);

  if (deviceType === 'mobile') {
    return label.includes('bags') ? (
      <div
        className={styles.materialMobileWrapper}
        onClick={(e) => {
          if (e.currentTarget.classList.contains(styles.droped)) {
            e.currentTarget.classList.remove(styles.droped);
          } else {
            e.currentTarget.classList.add(styles.droped);
          }
        }}
      >
        <div className={styles.mainSlab}>
          <div className={styles.slabLeft}>
            <h5>{label}</h5>
            <p>Quantity : {qty}</p>
          </div>
          <div className={styles.slabRight}>
            <div className={styles.arrowSpan}>
              <p>{formatIndianNumber(slabPrice || 0)}</p>
              {getIconByName('arrowdown')}
            </div>
          </div>
        </div>
        <div className={styles.slabDropdown}>
          <div className={styles.bagSlab}>
            <p>Base Product</p>
            <div ref={budgetSlabRef} className={styles.baseProductSlab}>
              {data?.[0]?.categorydata.map((bagButton: any) => (
                <React.Fragment key={bagButton?.category}>
                  {bagButton?.type.toLowerCase() === 'budget' && (
                    <button
                      className={`${styles.budgetBtn} ${activebag === bagButton?.category ? styles.active : ''}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        event.currentTarget.classList.add(styles.active);
                        premiumBtnRef?.current?.classList.remove(styles.active);
                        updateCostList(label, getBagPrice(bagButton?.category));
                        setSlabPrice(getBagPrice(bagButton?.category));

                        if (premiumSlabRef.current) {
                          Array.from(premiumSlabRef.current.children).forEach((child) => {
                            if (child instanceof HTMLButtonElement && child !== event.currentTarget) {
                              child.classList.remove(styles.active);
                            }
                          });
                        }

                        // Get the parent element
                        const parent = event.currentTarget.parentElement;

                        if (parent) {
                          Array.from(parent.children).forEach((child) => {
                            if (child instanceof HTMLButtonElement && child !== event.currentTarget) {
                              child.classList.remove(styles.active);
                            }
                          });
                        }
                      }}
                    >
                      {bagButton?.category}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className={styles.bagSlab}>
            <p>Premium Product</p>
            <div className={styles.premiumProductSlab} ref={premiumSlabRef}>
              {data?.[0]?.categorydata.map((bagButton: any) => (
                <>
                  {bagButton?.type.toLowerCase() === 'premium' && (
                    <button
                      className={`${styles.premiumBtn} ${activebag === bagButton?.category ? styles.active : ''}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        event.currentTarget.classList.add(styles.active);
                        budgetBtnRef?.current?.classList.remove(styles.active);
                        updateCostList(label, getBagPrice(bagButton?.category));
                        setSlabPrice(getBagPrice(bagButton?.category));

                        if (budgetSlabRef.current) {
                          Array.from(budgetSlabRef.current.children).forEach((child) => {
                            if (child instanceof HTMLButtonElement && child !== event.currentTarget) {
                              child.classList.remove(styles.active);
                            }
                          });
                        }

                        // Get the parent element
                        const parent = event.currentTarget.parentElement;

                        if (parent) {
                          Array.from(parent.children).forEach((child) => {
                            if (child instanceof HTMLButtonElement && child !== event.currentTarget) {
                              child.classList.remove(styles.active);
                            }
                          });
                        }
                      }}
                    >
                      {bagButton?.category}
                    </button>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    ) : (
      // <div className={styles.materialPriceWrapper}>
      //   <div className={styles.materialHead}>
      //     <CustomIcon iconName={icon} /> {label}
      //   </div>
      //   <div className={styles.quantityHead}>{qty}</div>

      //   <div className={styles.baseProductSlab}>
      //     <button
      //       className={`${styles.budgetBtn} ${activeprod === 'budget' ? styles.active : ''}`}
      //       ref={budgetBtnRef}
      //       onClick={(event) => {
      //         event.currentTarget.classList.add(styles.active);
      //         premiumBtnRef?.current?.classList.remove(styles.active);
      //         updateCostList(label, getProductPrice('budget'));
      //         setSlabPrice(getProductPrice('budget'));
      //       }}
      //     >
      //       Budget
      //     </button>
      //   </div>

      //   <div className={styles.premiumProductSlab}>
      //     <button
      //       className={`${styles.premiumBtn} ${activeprod === 'premium' ? styles.active : ''}`}
      //       ref={premiumBtnRef}
      //       onClick={(event) => {
      //         event.currentTarget.classList.add(styles.active);
      //         budgetBtnRef?.current?.classList.remove(styles.active);
      //         updateCostList(label, getProductPrice('premium'));
      //         setSlabPrice(getProductPrice('premium'));
      //       }}
      //     >
      //       Premium
      //     </button>
      //   </div>

      //   <div className={styles.BudgetPrice}>
      //     <p>{formatIndianNumber(slabPrice || 0)}</p>
      //   </div>
      // </div>

      <div
        className={styles.materialMobileWrapper}
        onClick={(e) => {
          if (e.currentTarget.classList.contains(styles.droped)) {
            e.currentTarget.classList.remove(styles.droped);
          } else {
            e.currentTarget.classList.add(styles.droped);
          }
        }}
      >
        <div className={styles.mainSlab}>
          <div className={styles.slabLeft}>
            <h5>{label}</h5>
            <p>Quantity : {qty}</p>
          </div>
          <div className={styles.slabRight}>
            <div className={styles.arrowSpan}>
              <p>{formatIndianNumber(slabPrice || 0)}</p>
              {getIconByName('arrowdown')}
            </div>
          </div>
        </div>
        <div className={styles.slabDropdown}>
          <div className={styles.prodSlab}>
            <button
              className={`${styles.budgetBtn} ${activeprod === 'budget' ? styles.active : ''}`}
              ref={budgetBtnRef}
              onClick={(event) => {
                event.stopPropagation();
                event.currentTarget.classList.add(styles.active);
                premiumBtnRef?.current?.classList.remove(styles.active);
                updateCostList(label, getProductPrice('budget'));
                setSlabPrice(getProductPrice('budget'));
              }}
            >
              Budget
            </button>
            <button
              className={`${styles.premiumBtn} ${activeprod === 'premium' ? styles.active : ''}`}
              ref={premiumBtnRef}
              onClick={(event) => {
                event.stopPropagation();
                event.currentTarget.classList.add(styles.active);
                budgetBtnRef?.current?.classList.remove(styles.active);
                updateCostList(label, getProductPrice('premium'));
                setSlabPrice(getProductPrice('premium'));
              }}
            >
              Premium
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return label.includes('bags') ? (
      <div className={styles.materialPriceWrapper}>
        <div className={styles.materialHead}>
          <CustomIcon iconName={icon} /> {label}
        </div>
        <div className={styles.quantityHead}>{qty}</div>

        <div ref={budgetSlabRef} className={styles.baseProductSlab}>
          {data?.[0]?.categorydata.map((bagButton: any) => (
            <React.Fragment key={bagButton?.category}>
              {bagButton?.type.toLowerCase() === 'budget' && (
                <button
                  className={`${styles.budgetBtn} ${activebag === bagButton?.category ? styles.active : ''}`}
                  onClick={(event) => {
                    event.currentTarget.classList.add(styles.active);
                    premiumBtnRef?.current?.classList.remove(styles.active);
                    updateCostList(label, getBagPrice(bagButton?.category));
                    setSlabPrice(getBagPrice(bagButton?.category));

                    if (premiumSlabRef.current) {
                      Array.from(premiumSlabRef.current.children).forEach((child) => {
                        if (child instanceof HTMLButtonElement && child !== event.currentTarget) {
                          child.classList.remove(styles.active);
                        }
                      });
                    }

                    // Get the parent element
                    const parent = event.currentTarget.parentElement;

                    if (parent) {
                      Array.from(parent.children).forEach((child) => {
                        if (child instanceof HTMLButtonElement && child !== event.currentTarget) {
                          child.classList.remove(styles.active);
                        }
                      });
                    }
                  }}
                >
                  {bagButton?.category}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className={styles.premiumProductSlab} ref={premiumSlabRef}>
          {data?.[0]?.categorydata.map((bagButton: any) => (
            <React.Fragment key={bagButton?.category}>
              {bagButton?.type.toLowerCase() === 'premium' && (
                <button
                  className={`${styles.premiumBtn} ${activebag === bagButton?.category ? styles.active : ''}`}
                  onClick={(event) => {
                    event.currentTarget.classList.add(styles.active);
                    budgetBtnRef?.current?.classList.remove(styles.active);
                    updateCostList(label, getBagPrice(bagButton?.category));
                    setSlabPrice(getBagPrice(bagButton?.category));

                    if (budgetSlabRef.current) {
                      Array.from(budgetSlabRef.current.children).forEach((child) => {
                        if (child instanceof HTMLButtonElement && child !== event.currentTarget) {
                          child.classList.remove(styles.active);
                        }
                      });
                    }

                    // Get the parent element
                    const parent = event.currentTarget.parentElement;

                    if (parent) {
                      Array.from(parent.children).forEach((child) => {
                        if (child instanceof HTMLButtonElement && child !== event.currentTarget) {
                          child.classList.remove(styles.active);
                        }
                      });
                    }
                  }}
                >
                  {bagButton?.category}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className={styles.BudgetPrice}>
          <p>{formatIndianNumber(slabPrice || 0)}</p>
        </div>
      </div>
    ) : (
      <div className={styles.materialPriceWrapper}>
        <div className={styles.materialHead}>
          <CustomIcon iconName={icon} /> {label}
        </div>
        <div className={styles.quantityHead}>{qty}</div>

        <div className={styles.baseProductSlab}>
          <button
            className={`${styles.budgetBtn} ${activeprod === 'budget' ? styles.active : ''}`}
            ref={budgetBtnRef}
            onClick={(event) => {
              event.currentTarget.classList.add(styles.active);
              premiumBtnRef?.current?.classList.remove(styles.active);
              updateCostList(label, getProductPrice('budget'));
              setSlabPrice(getProductPrice('budget'));
            }}
          >
            Budget
          </button>
        </div>

        <div className={styles.premiumProductSlab}>
          <button
            className={`${styles.premiumBtn} ${activeprod === 'premium' ? styles.active : ''}`}
            ref={premiumBtnRef}
            onClick={(event) => {
              event.currentTarget.classList.add(styles.active);
              budgetBtnRef?.current?.classList.remove(styles.active);
              updateCostList(label, getProductPrice('premium'));
              setSlabPrice(getProductPrice('premium'));
            }}
          >
            Premium
          </button>
        </div>

        <div className={styles.BudgetPrice}>
          <p>{formatIndianNumber(slabPrice || 0)}</p>
        </div>
      </div>
    );
  }
};

const CostEstimation = (props: ICostEstimation) => {
  const {
    materialData,
    compData,
    handleFilterChange,
    updateCost,
    totalAmount,
    selectedValues = null,
    priceData,
    setPriceData,
    setTotalAmount
  } = props;

  const [selectedFilter, setSelectedFilter] = useState<IMaterialEstimateFilter>();
  const [costList, setCostList] = useState<any>([]);
  const [totalCost, setTotalCost] = useState<any>([]);

  const { deviceType } = useDeviceType();

  const formatIndianNumber = (num: number): string => {
    if (num < 100000) {
      // Numbers less than 100,000 are formatted as standard Indian number format
      return num.toLocaleString('en-IN');
    } else if (num < 10000000) {
      // Numbers between 100,000 and 10,000,000 are formatted in lakhs
      const lakhs = num / 100000;
      const formattedLakhs = lakhs.toFixed(2); // Format to 2 decimal places
      return `${formattedLakhs} lakh`;
    } else {
      // Numbers 10,000,000 and above are formatted in crores
      const crores = num / 10000000;
      const formattedCrores = crores.toFixed(2); // Format to 2 decimal places
      return `${formattedCrores} Cr`;
    }
  };

  useEffect(() => {
    if (selectedValues) {
      const selectedDropdownValue = materialData?.materialDropdownOptions?.options?.find(
        (option) => option.label === selectedValues?.dropdown,
      );
      setSelectedFilter({ constructionStage: selectedDropdownValue });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log('slabdata', materialData);
  }, []);

  useEffect(() => {
    if (costList) {
      var totalCosting = 0;
      costList.forEach((item: any) => {
        console.warn('777', item?.cost);
        totalCosting = totalCosting + item?.cost;
      });
      setTotalCost(totalCosting);
      setTotalAmount(totalCosting);
    }
  }, [costList]);

  return (
    <div className={styles.wrapper}>

      

      <div className={styles.materialWrapper}>

        {deviceType !== "mobile"  && (
          <div className={styles.materialDetailsWrapper}>
          <h4 className={styles.materialHead}>{compData?.labels?.materialLabel}</h4>
          <h4 className={styles.quantityHead}>{compData?.labels?.quantitytLabel}</h4>
          <h4 className={styles.baseProductHead}>Base Product</h4>
          <h4 className={styles.premiumProduct}>Premium Product</h4>
          <h4 className={styles.Budget}>{compData?.labels?.pricePerUnitLabel}</h4>
        </div>
        )}

        <div className={styles.fields} key={materialData?.materialInfo?.toString()}>
          {materialData?.materialInfo?.map((data: IMaterialSlab, index: number) => (
            <div key={`${data?.label + index}`}>
              <CostSlab
                label={data?.label}
                qty={data?.qty}
                updateCost={updateCost}
                icon={data?.icon}
                calculatorNum={setFallBack(data?.calculatorNum, 1)}
                type={data?.type}
                setPriceData={setPriceData}
                priceData={priceData}
                costList={costList}
                setCostList={setCostList}
                data={data?.data}
                deviceType={deviceType}
                defaultPrice={
                  priceData?.findIndex((i: any) => i?.label === data?.label) === -1
                    ? 0
                    : priceData?.[priceData?.findIndex((i: any) => i?.label === data?.label)]?.price
                }
              />
            </div>
          ))}
        </div>
      </div>

      {deviceType === 'desktop' && (
        <div className={`${styles.materialPriceWrapper} ${styles.totalCost}`}>
          <span>{compData?.labels?.totalCostLabel}</span>
          <span>
            {compData?.labels?.priceLabel} {formatIndianNumber(totalCost || 0)}
          </span>
        </div>
      )}
    </div>
  );
};

export default CostEstimation;
