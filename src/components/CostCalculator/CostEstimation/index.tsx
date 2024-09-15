import { CustomIcon, FloatingInput, SelectDropdown } from '@components';
import { ICostEstimation, ICostSlab, IMaterialEstimateFilter, IMaterialSlab, ISelectDropdownOption } from '@interfaces';
import { getAmountDetail } from '@logic/costCalculator';
import { setFallBack, useDeviceType } from '@utils';
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
    setCostList
  } = props;

  const [enteredPrice, setEnteredPrice] = useState<string | number>(
    type === 'percentage' ? `${defaultPrice}%` : defaultPrice,
  );

  const budgetBtnRef = useRef<HTMLButtonElement>(null);
  const premiumBtnRef = useRef<HTMLButtonElement>(null);
  const budgetSlabRef = useRef<HTMLDivElement>(null);
  const premiumSlabRef = useRef<HTMLDivElement>(null);

  const [slabPrice,setSlabPrice] = useState<number>();

  const getProductPrice = (product:string)=>{
    return qty*data[0]?.[product];
  }


  useEffect(()=>{
    if(label==="Cement -bags"){

    }
    else{
    setCostList([...costList,{label:label,cost:getProductPrice('budget')}]);
    setSlabPrice(getProductPrice('budget'));
    }
  },[])

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

  return label.includes("bags") ?
  (
    <div className={styles.materialPriceWrapper}>
      <div className={styles.materialHead}>
        <CustomIcon iconName={icon} /> {label}
      </div>
      <div className={styles.quantityHead}>{qty}</div>

      <div ref={budgetSlabRef} className={styles.baseProductSlab}>

        <button  className={styles.budgetBtn}
        onClick={
          (event)=>{
            event.currentTarget.classList.add(styles.active);
            premiumBtnRef?.current?.classList.remove(styles.active);

            if(premiumSlabRef.current){
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

          }
        }
        >
          Budget
        </button>

        <button  className={styles.budgetBtn}
        onClick={
          (event)=>{
            event.currentTarget.classList.add(styles.active);
            premiumBtnRef?.current?.classList.remove(styles.active);

            if(premiumSlabRef.current){
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

          }
        }
        >
          Budget
        </button>

      </div>

      <div className={styles.premiumProductSlab} ref={premiumSlabRef}>
        <button className={styles.premiumBtn} 
        onClick={
          (event)=>{
            event.currentTarget.classList.add(styles.active);

            if(budgetSlabRef.current){
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
          }
        }>
          Premium
        </button>

        <button className={styles.premiumBtn} 
        onClick={
          (event)=>{
            event.currentTarget.classList.add(styles.active);

            if(budgetSlabRef.current){
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
          }
        }>
          Premiummm
        </button>
      </div>

      <div className={styles.BudgetPrice}>
          <p>10.71 Lakh</p>
      </div>

    </div>
  ):  
  (
    <div className={styles.materialPriceWrapper}>
      <div className={styles.materialHead}>
        <CustomIcon iconName={icon} /> {label}
      </div>
      <div className={styles.quantityHead}>{qty}</div>

      <div className={styles.baseProductSlab}>
        <button className={styles.budgetBtn} ref={budgetBtnRef} 
        onClick={
          (event)=>{
            event.currentTarget.classList.add(styles.active);
            premiumBtnRef?.current?.classList.remove(styles.active);
          }
        }
        >
          Budget
        </button>
      </div>

      <div className={styles.premiumProductSlab}>
        <button className={styles.premiumBtn} ref={premiumBtnRef}
        onClick={
          (event)=>{
            event.currentTarget.classList.add(styles.active);
            budgetBtnRef?.current?.classList.remove(styles.active);
          }
        }>
          Premium
        </button>
      </div>

      <div className={styles.BudgetPrice}>
          <p>{slabPrice}</p>
      </div>

    </div>
  )
  

  
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
  } = props;

  const [selectedFilter, setSelectedFilter] = useState<IMaterialEstimateFilter>();
  const [costList, setCostList] = useState<any>([]);
  const [totalCost, setTotalCost] = useState<any>([]);


  const { deviceType } = useDeviceType();

  useEffect(() => {
    if (selectedValues) {
      const selectedDropdownValue = materialData?.materialDropdownOptions?.options?.find(
        (option) => option.label === selectedValues?.dropdown,
      );
      setSelectedFilter({ constructionStage: selectedDropdownValue });
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("slabdata",materialData);
  }, []);

  useEffect(() => {
    if(costList){
      var totalCosting = 0;
    costList.forEach((item:any)=>{
      console.warn("777",item?.cost)
      totalCosting = totalCosting + item?.cost;
    });
    setTotalCost(totalCosting);
    }
  },[costList])

  return (
    <div className={styles.wrapper}>
      {/* <div className={styles.filterWrapper}>
        <SelectDropdown
          classname={styles.dropdown}
          options={materialData?.materialDropdownOptions?.options}
          placeholder={deviceType !== 'desktop' ? materialData?.materialDropdownOptions?.placeholder : ''}
          setSelected={(item: ISelectDropdownOption | null) =>
            handleFilterChange(materialData?.materialDropdownOptions?.type ?? '', item)
          }
          selected={setFallBack(selectedFilter?.constructionStage, materialData?.materialDropdownOptions?.options?.[0])}
          isClose={false}
        />
      </div> */}

      <div className={styles.materialWrapper}>
        <div className={styles.materialDetailsWrapper}>
          <h4 className={styles.materialHead}>{compData?.labels?.materialLabel}</h4>
          <h4 className={styles.quantityHead}>{compData?.labels?.quantitytLabel}</h4>
          <h4 className={styles.baseProductHead}>Base Product</h4>
          <h4 className={styles.premiumProduct}>Premium Product</h4>
          <h4 className={styles.Budget}>{compData?.labels?.pricePerUnitLabel}</h4>
        </div>
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
            {compData?.labels?.priceLabel} {totalCost}
          </span>
        </div>
      )}
    </div>
  );
};

export default CostEstimation;
