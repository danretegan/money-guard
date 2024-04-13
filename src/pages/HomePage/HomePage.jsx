import { useEffect, useState } from "react";

import { ButtonAddTransactions } from "../../components/ButtonAddTransactions/ButtonAddTransactions";

import TransactionsList from "../../components/TransactionsList/TransactionsList";
import TransactionsTable from "../../components/TransactionsTable/TransactionsTable";
import { useMediaQuery } from "react-responsive";
import styles from "./HomePage.module.css";

import { useDispatch, useSelector } from "react-redux";
import { selectAllTransactions } from "../../redux/transactions/selectors";
import { fetchAllTransactions } from "../../redux/transactions/operations";

import ModalDeleteTransaction from "../../components/ModalDeleteTransaction/ModalDeleteTransaction";
import ModalAddTransactionNew from "../../components/ModalAddTransaction/ModalAddTransaction";
import ModalEditTransaction from "../../components/ModalEditTransaction/ModalEditTransaction";

import LoadingScreenSharedLayoutPages from "../../components/common/LoadingScreenSharedLayoutPages/LoadingScreenSharedLayoutPages";
import Balance from "../../components/Balance/Balance";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  const data = useSelector(selectAllTransactions);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);

  const screenCondition = useMediaQuery({ query: "(min-width: 768px)" });

  const [forcedLoading, setForcedLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setForcedLoading(false), 1500);
  }, [forcedLoading]);

  if (forcedLoading) {
    return <LoadingScreenSharedLayoutPages />;
  }

  const animation = "animate__animated  animate__fadeIn animate__slow";

  return (
    <>
      <div className={`${styles.HomePage} ${animation}`}>
        {!screenCondition && <Balance />}

        {screenCondition && (
          <div className={styles.tableContainer}>
            <TransactionsTable
              data={data}
              openDeleteModal={() => setIsDeleteModalOpen(true)}
              openEditModal={() => setisEditModalOpen(true)}
            />
          </div>
        )}

        {!screenCondition && (
          <TransactionsList
            data={data}
            openDeleteModal={() => setIsDeleteModalOpen(true)}
            openEditModal={() => setisEditModalOpen(true)}
          />
        )}

        <ButtonAddTransactions onClick={() => setIsAddModalOpen(true)} />
      </div>

      <>
        {isAddModalOpen && (
          <ModalAddTransactionNew closeModal={() => setIsAddModalOpen(false)} />
        )}

        {isDeleteModalOpen && (
          <ModalDeleteTransaction
            closeModal={() => setIsDeleteModalOpen(false)}
          />
        )}

        {isEditModalOpen && (
          <ModalEditTransaction closeModal={() => setisEditModalOpen(false)} />
        )}
      </>
    </>
  );
};

export default HomePage;
