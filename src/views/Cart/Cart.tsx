import { CartType } from "../../App";

type CartProps = {
  cart: CartType;
  setCart: (cart: CartType) => void;
};

export const Cart = (props: CartProps) => {
  return <div>Cart</div>;
};
