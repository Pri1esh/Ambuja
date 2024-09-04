import { IHomeBuilderCards } from '@interfaces';
import CardItem from './CardItem';
import styles from './homeBuilderCards.module.scss';
import Image from "next/image";
import rightarrow from "../../assets/icons/arrowrighttail.svg"



const HomeBuilderCards = (props: { compData: IHomeBuilderCards }) => {
  const { compData } = props;
  const { heading = '', cardData } = compData;
  return (
    <div className={styles.wrapper}>
      <div className="container">
        {heading && <h1 className={styles.heading}>{heading}</h1>}
        <div className="row">
          <div className="col-md-4">
            <ul className={styles.hbgMenu}>
              {[...Array(7)].map((item,index)=>(
                <li>
                <a>
                  <div className={styles.menuTab}>
                  <Image src={rightarrow} alt='->'/>
                    <p className=''>Choosing the Right Land for</p>
                  </div>
                </a>
              </li>
              ))} 
              
            </ul>
          </div>
          <div className="col-md-8 hbg-Container">
            <div className="row">
              {cardData?.map((item, index) => <CardItem key={`${heading + index}`} compData={item} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBuilderCards;
