import { useRef } from "react";

import CartModal from "./CartModal.jsx";
import { useContext } from "react";
import { ShopingCartContext } from "../store/shoping-cart-context.jsx";
import { ThemeContext } from "../store/ThemeContextProvider.jsx";

export default function Header({ cart }) {
  const { toggleTheme } = useContext(ThemeContext);
  const modal = useRef();
  const { onUpdateCartItemQuantity } = useContext(ShopingCartContext);

  const cartQuantity = cart.items.length;

  function handleOpenCartClick() {
    modal.current.open();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        cartItems={cart.items}
        onUpdateCartItemQuantity={onUpdateCartItemQuantity}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
        <p>
          <button onClick={toggleTheme}>Toggle Theme</button>
        </p>
      </header>
    </>
  );
}
