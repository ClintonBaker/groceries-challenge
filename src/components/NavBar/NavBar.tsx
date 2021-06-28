import { useState } from "react";
import { Menu, Input, Button, Icon } from "semantic-ui-react";

type NavProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleCart: () => void;
};
export const NavBar = (props: NavProps) => {
  const { onChange, toggleCart } = props;
  return (
    <Menu style={{ marginBottom: 0 }}>
      <Menu.Item>
        <Input
          onChange={onChange}
          className="icon"
          icon="search"
          placeholder="Search..."
        />
      </Menu.Item>
      <Menu.Item position="right">
        <Button onClick={toggleCart}>
          <Button.Content>
            <Icon name="shop" />
          </Button.Content>
        </Button>
      </Menu.Item>
    </Menu>
  );
};
