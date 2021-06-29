import { Table } from 'semantic-ui-react';
import { CartType } from "../../App";
import { toUSD } from '../../utilities/helpers';

type CartProps = {
  cart: CartType;
};

export const Cart = (props: CartProps) => {
  const { cart } = props;

  const tableBody = Object.keys(cart).length > 0 ? Object.keys(cart).map(key => {
    const item = cart[key];
    return (
      <Table.Row key={`${item.id}-${item.name}`}>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{toUSD(item.price)}</Table.Cell>
        <Table.Cell>{item.qty}</Table.Cell>
        <Table.Cell>{toUSD(item.qty * item.price)}</Table.Cell>
      </Table.Row>
    )
  }) : (<Table.Row><Table.Cell>No items in cart</Table.Cell></Table.Row>)

  return (
    <Table inverted style={{ marginTop: 0 }}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Unit Price</Table.HeaderCell>
          <Table.HeaderCell>Qty</Table.HeaderCell>
          <Table.HeaderCell>Total</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableBody}
      </Table.Body>
    </Table>
  );
};
