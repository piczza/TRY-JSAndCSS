import React, { useState, useEffect } from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../models/firebase";
import { useNavigate } from "react-router-dom";
import useCartStore from "../../app/cartStore/cartStore";

function Header() {
  const [authUser, setAuthUser] = useState(null);

  const { cartItems } = useCartStore();

  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  });

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        alert("로그아웃 되었습니다.");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <header className="header">
        <div className="header_left">
          <Link to="/" className="shop">
            Shop
          </Link>
        </div>
        <div className="header_right">
          {/* {authUser ? <div>{`${authUser.email}`}</div> : null} */}
          <div className="cart_container">
            <Link to="/cart" className="material-icons cart">
              shopping_cart
            </Link>
            {cartItems.length > 0 ? (
              <div className="cart_count">{cartItems.length}</div>
            ) : null}
          </div>

          {authUser ? (
            <div onClick={userSignOut} className="material-icons logout">
              logout
            </div>
          ) : (
            <Link to="/login" className="material-icons user-profile">
              person
            </Link>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
