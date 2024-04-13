import { useEffect, useRef } from "react";
import styles from "./StatisticsDashboard.module.css";
import { useDispatch } from "react-redux";
import {
  Months_OPTIONS,
  YEARS_OPTIONS,
} from "../../constants/TransactionConstants";
import { fetchTransactionsSummary } from "../../redux/transactions/operations";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();

  const mounthRef = useRef();
  const yearRef = useRef();

  const getTransactionSummary = () => {
    dispatch(
      fetchTransactionsSummary({
        mounth: mounthRef.current.value,
        year: yearRef.current.value,
      })
    );
  };

  useEffect(() => {
    getTransactionSummary();
  });

  return (
    <div className={styles.dropdownsWrapper}>
      <select onChange={getTransactionSummary} ref={mounthRef}>
        {Months_OPTIONS.map((item) => (
          <option
            key={item.value}
            value={item.value}
            label={item.label}
          ></option>
        ))}
      </select>
      <select onChange={getTransactionSummary} ref={yearRef}>
        {YEARS_OPTIONS.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatisticsDashboard;
