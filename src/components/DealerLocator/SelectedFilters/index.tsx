import React from 'react'; 
import { ISelectedFilters } from '@interfaces';
import styles from './selectedFilters.module.scss';

const SelectedFilters = (props: ISelectedFilters) => {
  const { compData, onEditClick, selectedResultFilters } = props;
  const { stateLabel, cityLabel, areaLabel, editButtonLabel } = compData;

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <div className={styles.stateWrapper}>
          {selectedResultFilters?.selectedState && ( // Check if selectedState is not null or undefined
            <span className={styles.filterData}>
              {stateLabel}: {selectedResultFilters.selectedState.label}
            </span>
          )}
          {selectedResultFilters?.selectedCity && ( // Check if selectedCity is not null or undefined
            <span className={styles.filterData}>
              {cityLabel}: {selectedResultFilters.selectedCity.label}
            </span>
          )}
        </div>
        <div className={styles.areaWrapper}>
          {selectedResultFilters?.selectedArea && ( // Check if selectedArea is not null or undefined
            <span className={styles.filterData}>
              {areaLabel}: {selectedResultFilters.selectedArea.label}
            </span>
          )}
        </div>
      </div>

      <button
        className={styles.editButton}
        onClick={(e) => {
          e.preventDefault();
          onEditClick();
        }}
      >
        {editButtonLabel}
      </button>
    </div>
  );
};

export default SelectedFilters;
