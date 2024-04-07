import React from "react";
import useProductCallStore from "../../../app/productCallStore/productCallStore";
import useCartStore from "../../../app/cartStore/cartStore";
import useDetailStore from "../../../app/detailStore/detailStore";
import styles from "../MainPage.module.css";

function MPbtns() {
  const { productInfo, setProductInfo } = useProductCallStore();
  const { setCarts } = useCartStore();
  const { setSelectedProduct } = useDetailStore();

  return (
    <div>
      <div className={styles.buttons_section}>
        <button
          className={`${styles.all_button} ${styles.buttons}`}
          onClick={() => setProductInfo("")}
        >
          모두
        </button>
        <button
          className={`${styles.electronics} ${styles.buttons}`}
          onClick={() => setProductInfo("electronics")}
        >
          전자기기
        </button>
        <button
          className={`${styles.jewelery} ${styles.buttons}`}
          onClick={() => setProductInfo("jewelery")}
        >
          쥬얼리
        </button>
        <button
          className={`${styles.mens_clothing} ${styles.buttons}`}
          onClick={() => setProductInfo("men's clothing")}
        >
          남성의류
        </button>
        <button
          className={`${styles.womens_clothing} ${styles.buttons}`}
          onClick={() => setProductInfo("women's clothing")}
        >
          여성의류
        </button>
      </div>
    </div>
  );
}

export default MPbtns;
