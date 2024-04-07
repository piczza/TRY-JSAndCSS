import React from "react";
import styles from "../MainPage.module.css";
import useProductCallStore from "../../../app/productCallStore/productCallStore";
import useCartStore from "../../../app/cartStore/cartStore";
import useDetailStore from "../../../app/detailStore/detailStore";
import { Link } from "react-router-dom";

function Products() {
  const { productInfo, setProductInfo } = useProductCallStore();
  const { setCarts } = useCartStore();
  const { setSelectedProduct } = useDetailStore();

  const cartItemsId = useCartStore((state) => state.cartItems);

  return (
    <div>
      <div className={styles.products_section}>
        {productInfo.map((product) => (
          <Link
            to="/detail"
            className={styles.product_container}
            key={product.id}
            onClick={(e) => {
              setSelectedProduct(product.id);
            }}
          >
            <div className={styles.product_picture}>
              <img
                className={styles.img}
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className={styles.product_title_container}>
              <div className={styles.product_title}>{product.title}</div>
            </div>
            <div className={styles.product_container_bottom}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setCarts(product);
                }}
                className={styles.addToCartButton}
              >
                {cartItemsId
                  .map((cartItem) => cartItem.id)
                  .includes(product.id) ? (
                  <div style={{ color: "orange" }}>담긴 상품</div>
                ) : (
                  "장바구니에 담기"
                )}
              </button>
              <div className={styles.product_price}>${product.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
