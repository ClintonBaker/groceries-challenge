import { useState } from "react";
import { Container, Transition } from "semantic-ui-react";

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
  const [searchKey, setSearchKey] = useState<string>('');
  const [cart, setCart] = useState<CartType>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  return (
    <Container style={{ margin: 0, paddingTop: 50, background: '#222', height: '100%', width: '100%' }}>
      <Container style={{ margin: '0 50px 0 50px', boxShadow: '#111 0 0 6px' }}>
        <NavBar
          showCart={showCart}
          cartLen={Object.keys(cart).reduce((a, b) => a + cart[b].qty, 0)}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          toggleCart={() => {
            setShowCart(!showCart);
          }}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={(category) => { setSelectedCategory(category) }}
        />
        <Transition animation={"slide right"} duration={{ hide: 0, show: 300 }} visible={!showCart}>
          <div>
            <GroceryList searchKey={searchKey} selectedCategory={selectedCategory} cart={cart} setCart={(cart: CartType) => {
              setCart(cart);
            }}
              setCategories={(categories) => {
                setCategories(categories)
              }} />
          </div>
        </Transition>
        <Transition animation={"slide left"} duration={{ hide: 0, show: 300 }} visible={showCart}>
          <div>
            <Cart cart={cart} />
          </div>
        </Transition>

      </Container>
    </Container>
  );
}

export default App;
