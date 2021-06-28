import { useState, useEffect } from "react";
import { Grocery, useGroceryList } from "./useGroceryList";
import { Table } from "semantic-ui-react";
import { CartType } from "../../App";

type GroceryListProps = {
  searchKey: string;
};

const containsStr = (str1: string, str2: string) => {
  if (str1 === "") return false;
  if (str2 === "") return true;
  for (let i = 0; i + str2.length <= str1.length; i++) {
    let str2Pos = 0;
    while (str2Pos < str2.length) {
      if (str1[i + str2Pos] !== str2[str2Pos]) break;
      str2Pos++;
    }

    if (str2Pos === str2.length) return true;
  }
  return false;
};

export const GroceryList = ({ searchKey }: GroceryListProps) => {
  const { groceries } = useGroceryList();
  const [filteredGroceries, setFilteredGroceries] =
    useState<Grocery[]>(groceries);
  const setCart = () => {};
  const cart: CartType = {};

  const addToCart = (grocery: Grocery) => {
    cart[grocery.id] = {
      ...grocery,
      quantity: cart[grocery.id] ? 0 : cart[grocery.id].quantity + 1,
    };
  };

  useEffect(
    () =>
      setFilteredGroceries(
        searchKey.length < 1
          ? groceries
          : groceries.filter((grocery) => {
              const name = containsStr(grocery.name, searchKey);
              const type = containsStr(grocery.type, searchKey);
              const price = containsStr(grocery.price.toString(), searchKey);
              return name || type || price;
            })
      ),
    [searchKey, groceries]
  );

  const tableBody = filteredGroceries ? (
    filteredGroceries.map((grocery) => (
      <Table.Row key={`${grocery.name}-${grocery.id}`}>
        <Table.Cell>{grocery.name}</Table.Cell>
        <Table.Cell>{grocery.type}</Table.Cell>
        <Table.Cell>{grocery.price}</Table.Cell>
      </Table.Row>
    ))
  ) : (
    <Table.Row>
      <Table.Cell>loading...</Table.Cell>
    </Table.Row>
  );

  return (
    <Table style={{ marginTop: 0 }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Category</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{tableBody}</Table.Body>
    </Table>
  );
};
