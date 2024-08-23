import { CustomImage } from '@components';
import { IAchievementItem, IAchievements } from '@interfaces';
import Countup from './CountUp';
import styles from './achievements.module.scss';

const Achievements = (props: IAchievements) => {
  return (
    <div itemScope itemType="https://schema.org/Thing" className={styles.achievements}>
      <ul>
        {props?.data?.map((item: IAchievementItem, index: number) => (
          <li itemType="identifier" key={`${item.count + index}`}>
            {item?.icon && (
              <div className={styles.imageWrapper}>
                <CustomImage
                  loader="false"
                  src={{
                    defaultSource: item?.icon,
                  }}
                />
              </div>
            )}
            <Countup start={item.start} endCount={item.count} delay={item.delay ? item.delay : '2.5'} />
            <small itemType="description">{item.desc}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Achievements;
