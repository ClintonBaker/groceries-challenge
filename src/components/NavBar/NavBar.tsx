import React, { useEffect, useState } from "react";
import CSS from 'csstype';
import { Menu, Input, Button, Icon, Dropdown, DropdownProps } from "semantic-ui-react";

type NavProps = {
  showCart: boolean;
  cartLen: number;
  toggleCart: () => void;
  categories: string[];
  selectedCategory: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedCategory: (category: string) => void;
};

const cartCounter: CSS.Properties = {
  background: 'red',
  borderRadius: '20px',
  width: '15px',
  position: 'absolute',
  bottom: '5px',
  left: '32px',
  fontSize: '12px',
  color: 'white',
  zIndex: 1
}

export const NavBar = (props: NavProps) => {
  const { onChange, toggleCart, categories, selectedCategory, setSelectedCategory, cartLen, showCart } = props;
  const [options, setOptions] = useState<{ key: string, text: string, value: string }[]>();

  useEffect(() => {
    setOptions(categories.map(category => ({ key: category, text: category, value: category })));
  }, [categories])

  const handleDropdownChange = (e: React.SyntheticEvent<HTMLElement>, { value }: DropdownProps) => {
    setSelectedCategory(`${value}`);
  }

  const homeLeftNav = (
    <>
      <Menu.Item>
        <Input
          onChange={onChange}
          className="icon"
          icon="search"
          placeholder="Search..."
        />
      </Menu.Item>
      <Menu.Item>
        <Dropdown placeholder="Category" options={options} clearable selection value={selectedCategory} onChange={handleDropdownChange} />
      </Menu.Item>
    </>
  )

  const cartLeftNav = (
    <Menu.Item>
      <Button onClick={toggleCart}>
        <Button.Content>
          <Icon name="arrow left" />
        </Button.Content>
      </Button>
    </Menu.Item>
  )

  return (
    <Menu inverted style={{ marginBottom: 0 }}>
      {showCart ? cartLeftNav : homeLeftNav}

      <Menu.Item position="right">
        <Button style={{ margin: '8px 0' }} onClick={toggleCart}>
          <Button.Content>
            {cartLen ? <span style={cartCounter}>{cartLen}</span> : <></>}
            <Icon name="shop" />
          </Button.Content>
        </Button>
      </Menu.Item>
    </Menu>
  );
};
