import React from "react";
import styles from "./DetailPage.module.css";
import useDetailStore from "../../app/detailStore/detailStore";
import useCartStore from "../../app/cartStore/cartStore";
import { Link } from "react-router-dom";

function DetailPage() {
  const { detailProduct } = useDetailStore();
  const { setCarts } = useCartStore();

  const cartItemsId = useCartStore((state) => state.cartItems);

  return (
    <div className={styles.body}>
      <div className={styles.subheading}>상품 페이지</div>
      <div key={detailProduct.id} className={styles.product_space}>
        <div className={styles.section_left}>
          <div className={styles.image_frame}>
            <img className={styles.image} src={detailProduct.image} alt="img" />
          </div>
        </div>
        <div className={styles.section_right}>
          <div className={styles.category}>{detailProduct.category}</div>
          <div className={styles.title}>{detailProduct.title}</div>
          <div className={styles.description}>{detailProduct.description}</div>
          <div className={styles.price}>${detailProduct.price}</div>
          <div className={styles.buttons_space}>
            <button
              onClick={(e) => {
                e.preventDefault();
                setCarts(detailProduct);
              }}
              className={styles.buttons}
            >
              {cartItemsId
                .map((cartItem) => cartItem.id)
                .includes(detailProduct.id) ? (
                <div style={{ color: "orange", cursor: "notAllowed" }}>
                  담긴 상품
                </div>
              ) : (
                "장바구니에 담기"
              )}
            </button>
            <Link to="/cart">
              <button className={styles.buttons}>장바구니로 이동</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
