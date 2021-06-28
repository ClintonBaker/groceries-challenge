import { useState } from "react";
import { Container } from "semantic-ui-react";
import "./App.css";

import { GroceryList, Cart } from "./views";

import { NavBar } from "./components";
import { Grocery } from "./views/GroceryList/useGroceryList";

export type CartType = {
  [id: string]: {
    id: string;
    name: string;
    type: string;
    price: number;
    quantity: number;
  };
};

function App() {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const [cart, setCart] = useState<CartType>({});
  return (
    <Container style={{ margin: 20 }}>
      <NavBar
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
        toggleCart={() => {
          setShowCart(!!showCart);
        }}
      />
      <GroceryList searchKey={searchKey} />
      <Cart
        cart={cart}
        setCart={(cart: CartType) => {
          setCart(cart);
        }}
      />
    </Container>
  );
}

export default App;
