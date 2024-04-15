import PropTypes from "prop-types";
import TransactionTableRow from "../../components/TransactionTableRow/TransactionTableRow";
import styles from "./TransactionsTable.module.css";

const TransactionsTable = ({ data, openDeleteModal, openEditModal }) => {
  // Definim funcția de comparație pentru sortare:
  const compareTransactions = (a, b) => {
    const dateComparison =
      new Date(a.transactionDate) - new Date(b.transactionDate);
    // Verificăm dacă tranzacțiile au aceeași dată:
    if (dateComparison === 0) {
      // Dacă tranzacția A este de tip "Income", o afișăm înaintea celei de tip "Expense":
      if (a.type === "INCOME" && b.type !== "INCOME") {
        return -1;
      }
      // Dacă tranzacția B este de tip "Income", o afișăm înaintea celei de tip "Expense":
      if (a.type !== "INCOME" && b.type === "INCOME") {
        return 1;
      }
    }
    // Returnăm rezultatul comparării datelor:
    return dateComparison;
  };

  // Sortăm datele utilizând funcția de comparație definită mai sus:
  const sortedData = [...data].sort(compareTransactions);

  return (
    <div className={styles.TransactionsTable}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableHeadRow}>
            <th className={styles.dateColumn}>Date</th>
            <th className={styles.typeColumn}>Type</th>
            <th className={styles.categoryColumn}>Category</th>
            <th className={styles.commentColumn}>Comment</th>
            <th className={styles.sumColumn}>Sum</th>
            <th className={styles.editColumn}></th>
            <th className={styles.deleteColumn}></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {sortedData.map((item) => (
            <TransactionTableRow
              key={item.id}
              transaction={item}
              openDeleteModal={openDeleteModal}
              openEditModal={openEditModal}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

TransactionsTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};

export default TransactionsTable;
