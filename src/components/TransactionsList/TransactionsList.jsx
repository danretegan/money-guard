import PropTypes from "prop-types";
import TransactionItem from "../../components/TransactionItem/TransactionItem";
import styles from "./TransactionsList.module.css";

const TransactionsList = ({ data, openDeleteModal, openEditModal }) => {
  return (
    <ul className={styles.TransactionList}>
      {data.map((item) => (
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
