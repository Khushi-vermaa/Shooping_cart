import { createContext } from "react";
export const ShopingCartContext = createContext({
  items: [],
  AddTOCart: () => {},
  onUpdateCartItemQuantity: () => {},
});
