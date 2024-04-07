import React, { useEffect } from "react";
import useProductCallStore from "../../app/productCallStore/productCallStore";
import styles from "./MainPage.module.css";
import MPbtns from "./Buttons/MPbtns";
import Products from "./Products/Products";

function MainPage() {
  const { productInfo, setProductInfo } = useProductCallStore();

  useEffect(() => {
    setProductInfo("");
  }, []);

  return (
    <div>
      <section className={styles.section}>
        <div className={styles.page_title}>Products</div>
        <MPbtns />
        <div
          className={styles.product_length}
        >{`Showing : ${productInfo.length} items`}</div>
        <Products />
      </section>
    </div>
  );
}

export default MainPage;
