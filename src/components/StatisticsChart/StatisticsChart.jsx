import "animate.css";

import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

import { useSelector } from "react-redux";
import styles from "./StatisticsChart.module.css";
import {
  selectFilteredCategories,
  selectIsLoading,
  selectTransactionsSummary,
} from "../../redux/transactions/selectors";
import { getTrasactionCategoryColor } from "../../constants/TransactionConstants";
import LoadingSpinner from "../../components/common/LoadingSpinner/Loader";
import { formatNumberWithSpaces } from "../common/formatNumberWithSpaces";

const StatisticsChart = () => {
  const isLoading = useSelector(selectIsLoading);

  const balanceForSpecificPeriod = useSelector(
    selectTransactionsSummary
  )?.periodTotal;

  const filteredCategories = useSelector(selectFilteredCategories);

  const chartLabels =
    filteredCategories?.length > 0
      ? filteredCategories?.map((item) => item.name)
      : ["There is no data for selected date"];

  const chartValues =
    filteredCategories?.length > 0
      ? filteredCategories?.map((item) => item.total * -1)
      : [100];

  const chartBackgroundColors =
    filteredCategories?.length > 0
      ? filteredCategories?.map((item) => getTrasactionCategoryColor(item.name))
      : ["rgba(255, 255, 255, 0.6"];

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: chartBackgroundColors,
        borderWidth: 0,
        hoverOffset: 5,
        // hoverBorderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        // enabled: false,
      },
    },
    elements: {
      arc: {
        hoverOffset: 4,
      },
    },
  };

  const textAnimatioClasses =
    "animate__animated  animate__zoomIn animate__slow";

  return (
    <div className={styles.chartContainer}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Doughnut data={chartData} options={chartOptions} />
          <div
            className={`${styles.balance} ${textAnimatioClasses}`}
          >{`₴ ${formatNumberWithSpaces(balanceForSpecificPeriod)}`}</div>
        </>
      )}
      {/* 
      <Doughnut data={chartData} options={chartOptions} />
      <div className={styles.balance}>{`₴ ${balanceForSpecificPeriod.toFixed(2)}`}</div> */}
    </div>
  );
};

export default StatisticsChart;
