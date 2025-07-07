import { useState, useContext, useReducer } from "react";
import { ThemeContext } from "./store/ThemeContextProvider.jsx";

import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import Product from "./components/Product.jsx";
import { ShopingCartContext } from "./store/shoping-cart-context.jsx";
import TodoReducer from "./ps.jsx";
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const updatedItems = [...state.items];
      const existingCartItemIndex = updatedItems.findIndex(
        (item) => item.id === action.payload
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((p) => p.id === action.payload);
        updatedItems.push({
          id: product.id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return { items: updatedItems };

    case "UPDATE":
      const itemsCopy = [...state.items];
      const index = itemsCopy.findIndex(
        (item) => item.id === action.payload.id
      );
      const itemToUpdate = { ...itemsCopy[index] };

      itemToUpdate.quantity += action.payload.amount;

      if (itemToUpdate.quantity <= 0) {
        itemsCopy.splice(index, 1);
      } else {
        itemsCopy[index] = itemToUpdate;
      }

      return { items: itemsCopy };

    default:
      return state;
  }
}

function App() {
  //state
  // const [shoppingCart, setShoppingCart] = useState({
  //   items: [],
  // });
  //useReducer
  const [shoppingCart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  });
  const { theme } = useContext(ThemeContext);

  // function handleAddItemToCart(id) {
  //   setShoppingCart((prevShoppingCart) => {
  //     console.log(prevShoppingCart);

  //     const updatedItems = [...prevShoppingCart.items];

  //     const existingCartItemIndex = updatedItems.findIndex(
  //       (cartItem) => cartItem.id === id
  //     );
  //     console.log();
  //     const existingCartItem = updatedItems[existingCartItemIndex];

  //     if (existingCartItem) {
  //       const updatedItem = {
  //         ...existingCartItem,
  //         quantity: existingCartItem.quantity + 1,
  //       };
  //       updatedItems[existingCartItemIndex] = updatedItem;
  //     } else {
  //       const product = DUMMY_PRODUCTS.find((product) => product.id === id);
  //       updatedItems.push({
  //         id: id,
  //         name: product.title,
  //         price: product.price,
  //         quantity: 1,
  //       });
  //     }

  //     return {
  //       items: updatedItems,
  //     };
  //   });
  // }

  // function handleUpdateCartItemQuantity(productId, amount) {
  //   setShoppingCart((prevShoppingCart) => {
  //     const updatedItems = [...prevShoppingCart.items];
  //     const updatedItemIndex = updatedItems.findIndex(
  //       (item) => item.id === productId
  //     );

  //     const updatedItem = {
  //       ...updatedItems[updatedItemIndex],
  //     };

  //     updatedItem.quantity += amount;

  //     if (updatedItem.quantity <= 0) {
  //       updatedItems.splice(updatedItemIndex, 1);
  //     } else {
  //       updatedItems[updatedItemIndex] = updatedItem;
  //     }

  //     return {
  //       items: updatedItems,
  //     };
  //   });
  // }
  function handleAddItemToCart(id) {
    dispatchCartAction({ type: "ADD", payload: id });
  }
  function handleUpdateCartItemQuantity(productId, amount) {
    dispatchCartAction({ type: "UPDATE", payload: { id: productId, amount } });
  }

  const Cartxt = {
    items: shoppingCart.items,
    AddTOCart: handleAddItemToCart,
    onUpdateCartItemQuantity: handleUpdateCartItemQuantity,
  };
  return (
    <div id="app" className={theme}>
      <ShopingCartContext.Provider value={Cartxt}>
        <>
          <Header cart={shoppingCart} />
          <Shop>
            {DUMMY_PRODUCTS.map((product) => (
              <li key={product.id}>
                <Product {...product} />
              </li>
            ))}
          </Shop>
        </>
      </ShopingCartContext.Provider>
      {/* <TodoReducer /> */}
    </div>
  );
}

export default App;
