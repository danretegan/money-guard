import styles from "./SharedLayout.module.css";
import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Navigation from "../../components/Navigation/Navigation";
import Balance from "../../components/Balance/Balance";

import { useMediaQuery } from "react-responsive";
import Currency from "../../components/Currency/Currency";
import Footer from "../../components/Footer/Footer";
import { Suspense } from "react";

const SharedLayout = () => {
  const screenCondition = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <>
      <Header />

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sharedSectionElements}>
            <div className={styles.navAndBalanceContainer}>
              <Navigation />
              {screenCondition && <Balance />}
            </div>

            {screenCondition && <Currency />}
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default SharedLayout;
