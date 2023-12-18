import React, { useEffect } from "react";
import styles from "./CartPage.module.css";
import useCartStore from "../../app/cartStore/cartStore";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, total, removeFromCart, updateQuantity, calculateTotal } =
    useCartStore();

  useEffect(() => {
    calculateTotal(useCartStore.getState());
  }, [cartItems]); // cartItems가 변경될 때마다 호출

  return (
    <div>
      <div className={styles.body}>
        <div className={styles.cart_title}>장바구니</div>
        {cartItems.length === 0 ? (
          <div className={styles.body_inner}>
            <div className="material-icons" style={{ fontSize: 300 + "px" }}>
              local_mall
            </div>
            <div className={styles.cart_state}>장바구니가 비어있습니다.</div>
            <Link to="/">
              <button className={styles.continue_shopping}>계속 쇼핑</button>
            </Link>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.product_space}>
                <div className={styles.img_space}>
                  <img
                    className={styles.imgs}
                    src={item.image}
                    alt="product_img"
                  ></img>
                </div>
                <div className={styles.product_info}>
                  <div className={styles.product_title}>{item.title}</div>
                  <div className={styles.product_description}>
                    {item.description}
                  </div>
                  <div className={styles.product_price}>
                    {`$${item.price} x ${item.quantity} = $${(
                      item.price * item.quantity
                    ).toFixed(2)}`}
                  </div>
                </div>
                <button
                  className={styles.quantity}
                  onClick={() => updateQuantity(item.id, 1)}
                >
                  +
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button
                  className={styles.quantity}
                  onClick={() => updateQuantity(item.id, -1)}
                >
                  -
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className={`${styles.delete} material-icons`}
                >
                  delete
                </button>
              </div>
            ))}
            <div className={styles.products_total} onChange={calculateTotal}>
              Total : ${total.toFixed(2)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
