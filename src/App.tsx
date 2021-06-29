import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import "./App.css";

import { GroceryList, Cart } from "./views";

import { NavBar } from "./components";

export type CartType = {
  [id: string]: {
    id: string;
    name: string;
    type: string;
    price: number;
    qty: number;
  };
};

function App() {
  const [showCart, setShowCart] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>("");
  const [cart, setCart] = useState<CartType>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  useEffect(() => {
  }, [selectedCategory])
  return (
    <Container style={{ margin: 20 }}>
      <NavBar
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
        toggleCart={() => {
          setShowCart(!!showCart);
        }}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={(category) => {setSelectedCategory(category)}}
      />
      <GroceryList searchKey={searchKey} selectedCategory={selectedCategory} cart={cart} setCart={(cart: CartType) => {
          setCart(cart);
        }}
        setCategories={(categories) => {
          setCategories(categories)
        }}/>
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
