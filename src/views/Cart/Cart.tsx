import { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import { CartType } from "../../App";
import { toUSD } from '../../utilities/helpers';

type CartProps = {
  cart: CartType;
};

export const Cart = (props: CartProps) => {
  const [cartTotal, setCartTotal] = useState<number>()
  const { cart } = props;

  useEffect(() => {
    setCartTotal(Object.keys(cart).reduce((total, key) => (cart[key].price * cart[key].qty) + total, 0));
  }, [cart])

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
  }) : (<Table.Row><Table.Cell colSpan='4'>No items in cart</Table.Cell></Table.Row>)

  return (
    <Table inverted textAlign="center" style={{ marginTop: 0 }}>
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
      <Table.Footer>
        <Table.Row>
          {cartTotal ? <><Table.HeaderCell></Table.HeaderCell><Table.HeaderCell></Table.HeaderCell><Table.HeaderCell><span style={{ float: 'right', paddingRight: 0 }}>Total:</span></Table.HeaderCell><Table.HeaderCell>{toUSD(cartTotal)}</Table.HeaderCell></> : <></>}
        </Table.Row>
      </Table.Footer>
    </Table>
  );
};
