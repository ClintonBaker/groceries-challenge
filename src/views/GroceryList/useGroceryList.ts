import { useState, useEffect } from "react";

export type Grocery = {
  id: number;
  name: string;
  type: string;
  price: number;
};

export const useGroceryList = () => {
  const [groceries, setGroceries] = useState<Grocery[]>([]);

  useEffect(() => {
    const fetchGroceries = async () => {
      const res = await fetch(
        "https://muigrocery.free.beeceptor.com/groceries"
      );
      const data = await res.json();
      setGroceries(data.products);
    };
    fetchGroceries();
  }, []);

  return { groceries };
};
