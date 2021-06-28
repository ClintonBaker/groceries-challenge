import { useState, useEffect } from "react";

export type Grocery = {
  id: string;
  name: string;
  type: string;
  price: number;
};

export const useGroceryList = () => {
  const [groceries, setGroceries] = useState<Grocery[]>([]);

  useEffect(() => {
    const fetchGroceries = async () => {
      // const res = await fetch(
      //   "https://muigrocery.free.beeceptor.com/groceries"
      // );
      // const data = await res.json();
      const products: Grocery[] = [
        { id: "0", name: "Brown Egg", type: "bakery", price: 4.07 },
        { id: "1", name: "Blue Egg", type: "bakery", price: 6.07 },
        { id: "2", name: "Bread", type: "bakery", price: 1.99 },
        { id: "3", name: "Ham", type: "deli", price: 3.49 },
        { id: "4", name: "Turkey", type: "deli", price: 3.29 },
        { id: "5", name: "Ketchup", type: "grocery", price: 1.99 },
        { id: "6", name: "Mayo", type: "grocery", price: 1.99 },
      ];
      setGroceries(products);
    };
    fetchGroceries();
  }, []);

  return { groceries };
};
