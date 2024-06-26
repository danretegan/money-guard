import { useEffect, useRef, useState } from "react";
import styles from "./StatisticsDashboard.module.css";
import { useDispatch } from "react-redux";
import {
  Months_OPTIONS,
  YEARS_OPTIONS,
} from "../../constants/TransactionConstants";
import { fetchTransactionsSummary } from "../../redux/transactions/operations";

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const monthRef = useRef();
  const yearRef = useRef();

  useEffect(() => {
    dispatch(
      fetchTransactionsSummary({
        month: monthRef.current.value,
        year: yearRef.current.value,
      })
    );
  }, [currentMonth, currentYear, dispatch]);

  useEffect(() => {
    monthRef.current.value = currentMonth;
  }, [currentMonth]);

  return (
    <div className={styles.dropdownsWrapper}>
      <select
        onChange={() => setCurrentMonth(parseInt(monthRef.current.value))}
        ref={monthRef}
      >
        {Months_OPTIONS.map((item) => (
          <option
            key={item.value}
            value={item.value}
            label={item.label}
          ></option>
        ))}
      </select>
      <select
        onChange={() => setCurrentYear(parseInt(yearRef.current.value))}
        ref={yearRef}
      >
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
