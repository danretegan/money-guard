import PropTypes from "prop-types";
import TransactionItem from "../../components/TransactionItem/TransactionItem";
import styles from "./TransactionsList.module.css";

const TransactionsList = ({ data, openDeleteModal, openEditModal }) => {
  // Sortează array-ul de tranzacții
  const sortedData = [...data].sort((a, b) => {
    // Sortare după dată
    if (a.transactionDate < b.transactionDate) return -1;
    if (a.transactionDate > b.transactionDate) return 1;
    // Sortare după tipul de tranzacție (Income va fi primul)
    if (a.type === "INCOME" && b.type === "EXPENSE") return -1;
    if (a.type === "EXPENSE" && b.type === "INCOME") return 1;
    // Dacă sunt la aceeași dată și același tip de tranzacție, nu se schimbă ordinea
    return 0;
  });

  return (
    <ul className={styles.TransactionList}>
      {sortedData.map((item) => (
        <TransactionItem
          key={item.id}
          transaction={item}
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
        />
      ))}
    </ul>
  );
};

TransactionsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};

export default TransactionsList;
