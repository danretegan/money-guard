import { useEffect, useState } from "react";
import styles from "./AddTransactionForm.module.css";
import FormButton from "../../components/common/FormButton/FormButton";
import icons from "../../images/icons/sprite.svg";
import { useMediaQuery } from "react-responsive";

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import enUS from "date-fns/locale/en-US"; // Importăm localizarea pentru engleză
import {
  transactionCategories,
  getTransactionId,
} from "../../constants/TransactionConstants";

import { addTransaction } from "../../redux/transactions/operations";
import { getUserInfo } from "../../redux/auth/operations";

import { FiCalendar } from "react-icons/fi";
import PropTypes from "prop-types";

// Înregistram localizarea pentru utilizarea în componenta ReactDatePicker
registerLocale("en-US", enUS);

const AddTransactionFormNew = ({ closeModal }) => {
  const [isOnIncomeTab, setIsOnIncomeTab] = useState(false); // Setăm inițial pe false pentru tab-ul "Expense"
  useEffect(() => {}, [isOnIncomeTab]);

  const screenCondition = useMediaQuery({ query: "(min-width: 768px)" });

  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());

  const initialValues = {
    amount: "",
    comment: "",
  };

  const validationSchema = isOnIncomeTab
    ? Yup.object({
        amount: Yup.string()
          .matches(/^\d+(\.\d{1,2})?$/, "Invalid amount") // Permite un număr întreg sau cu maxim 2 zecimale
          .required("Required*"),
        comment: Yup.string().required("Required*"),
      })
    : Yup.object({
        amount: Yup.string()
          .matches(/^\d+(\.\d{1,2})?$/, "Invalid amount") // Permite un număr întreg sau cu maxim 2 zecimale
          .required("Required*"),
        comment: Yup.string().required("Required*"),
        category: Yup.string().required("Required*"),
      });

  const handleSubmit = (values, { setSubmitting, setStatus }) => {
    setSubmitting(true);

    dispatch(
      addTransaction({
        transactionDate: startDate,
        type: isOnIncomeTab ? "INCOME" : "EXPENSE",
        categoryId: getTransactionId(values.category || "Income"),
        comment: values.comment,
        amount: isOnIncomeTab ? values.amount : 0 - values.amount,
      })
    )
      .unwrap()
      .then(() => {
        closeModal();
        dispatch(getUserInfo());
      })
      .catch((error) => {
        setStatus({ success: false, error: error });
        setSubmitting(false);
      });
  };

  return (
    <div className={styles.modalContent}>
      {screenCondition && (
        <button className={styles.closeButton} onClick={() => closeModal()}>
          <svg>
            <use href={`${icons}#icon-close`}></use>
          </svg>
        </button>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className={styles.formTitle}>Add transaction</h2>

            <div className={styles.switcheWrapper}>
              <span className={`${isOnIncomeTab ? styles.income : null}`}>
                Income
              </span>

              <input
                type="checkbox"
                id="switcherButton"
                onChange={() => setIsOnIncomeTab(!isOnIncomeTab)}
                checked={!isOnIncomeTab}
              />
              <label htmlFor="switcherButton"></label>

              <span className={`${!isOnIncomeTab ? styles.expense : null}`}>
                Expense
              </span>
            </div>

            <div className={styles.inputWrapper}>
              {!isOnIncomeTab && (
                <div className={`${styles.inputField} ${styles.category}`}>
                  <Field as="select" name="category" autoFocus required>
                    <option value="">Select your category</option>
                    {transactionCategories.slice(0, -1).map((item) => (
                      <option key={item.id}>{item.name}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="category" component="p" />
                </div>
              )}

              <div className={`${styles.inputField} ${styles.amount}`}>
                <Field type="text" name="amount" placeholder="0.00" />
                <ErrorMessage name="amount" component="p" />
              </div>

              <div className={`${styles.inputField} ${styles.date}`}>
                <ReactDatePicker
                  dateFormat="dd.MM.yyyy"
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  locale="en-US" // Setăm localizarea la engleză
                  calendarStartDay={1} // Setăm începutul săptămânii la luni
                />
                <FiCalendar className={styles.icon} />
              </div>

              <div className={`${styles.inputField} ${styles.comment}`}>
                <Field type="text" name="comment" placeholder="Comment" />
                <ErrorMessage name="comment" component="p" />
              </div>
            </div>

            <div className={styles.buttonsWrapper}>
              <FormButton
                type={"submit"}
                text={"Add"}
                variant={"multiColorButtton"}
                isDisabled={isSubmitting}
              />
              <FormButton
                type={"button"}
                text={"cancel"}
                variant={"whiteButtton"}
                handlerFunction={() => closeModal()}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

AddTransactionFormNew.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default AddTransactionFormNew;
