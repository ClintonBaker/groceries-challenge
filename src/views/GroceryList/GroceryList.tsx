import { useState, useEffect } from "react";
import { Grocery, useGroceryList } from "./useGroceryList";
import { Table, Button } from "semantic-ui-react";
import { CartType } from "../../App";
import { containsStr, toUSD } from "../../utilities/helpers";

type GroceryListProps = {
  searchKey: string;
  cart: CartType;
  selectedCategory: string;
  setCart: (cart: CartType) => void;
  setCategories: (categories: string[]) => void;
};

export const GroceryList = (props: GroceryListProps) => {
  const { searchKey, cart, setCart, setCategories, selectedCategory } = props;
  const { groceries } = useGroceryList();
  const [filteredGroceries, setFilteredGroceries] =
    useState<Grocery[]>(groceries);

  const addToCart = (grocery: Grocery) => {
    const tempCart = { ...cart };
    tempCart[grocery.id] = {
      ...grocery,
      qty: tempCart[grocery.id] ? tempCart[grocery.id].qty + 1 : 1,
    };
    setCart(tempCart);
  };

  const removeFromCart = (grocery: Grocery) => {
    const tempCart = { ...cart };
    const qty = tempCart[grocery.id] ? tempCart[grocery.id].qty - 1 : 0;
    if (qty) {
      tempCart[grocery.id] = {
        ...grocery,
        qty: qty
      }
    } else {
      delete tempCart[grocery.id];
    }
    setCart(tempCart);
  }



  useEffect(() => {
    const categories: { [key: string]: 1 } = {};
    groceries.forEach(grocery => {
      categories[grocery.type] = 1;
    })
    setCategories(Object.keys(categories));
  }, [groceries])

  useEffect(() => {
    setFilteredGroceries(
      groceries.filter((grocery) => {
        const categoryFilter = selectedCategory ? grocery.type === selectedCategory : true;
        const name = containsStr(grocery.name, searchKey);
        const type = containsStr(grocery.type, searchKey);
        const price = containsStr(`${grocery.price}`, searchKey);
        return categoryFilter && (name || type || price);
      })
    )
  },
    [searchKey, selectedCategory, groceries]
  );

  const tableBody = filteredGroceries ? (
    filteredGroceries.map((grocery) => (
      <Table.Row key={`${grocery.name}-${grocery.id}`}>
        <Table.Cell>{grocery.name}</Table.Cell>
        <Table.Cell>{grocery.type}</Table.Cell>
        <Table.Cell>{toUSD(grocery.price)}</Table.Cell>
        <Table.Cell><Button icon="add" color="green" size="mini" onClick={() => { addToCart(grocery) }} /><Button icon="minus" color="red" size="mini" onClick={() => { removeFromCart(grocery) }} /></Table.Cell>
      </Table.Row>
    ))
  ) : (
    <Table.Row>
      <Table.Cell>loading...</Table.Cell>
    </Table.Row>
  );

  return (
    <Table inverted style={{ marginTop: 0 }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Add/Remove</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{tableBody}</Table.Body>
    </Table>
  );
};
