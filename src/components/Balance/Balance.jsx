import { useEffect } from "react";

import { selectBalance } from "../../redux/auth/selectors";
import styles from "./Balance.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../../redux/auth/operations";
import { formatNumberWithSpaces } from "../../components/common/formatNumberWithSpaces";

function Balance() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
  }, [dispatch]);

  const balance = useSelector(selectBalance);

  return (
    <div className={styles.balance}>
      <h3>Your balance</h3>
      <p>
        ₴ <span>{balance ? formatNumberWithSpaces(balance) : "0.00"}</span>
      </p>
    </div>
  );
}

export default Balance;
