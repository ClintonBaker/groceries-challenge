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
  background: '#50C878',
  borderRadius: '20px',
  width: '15px',
  position: 'absolute',
  bottom: '5px',
  left: '32px',
  fontSize: '12px',
  color: 'white',
  zIndex: 1
}

const menuHeader: CSS.Properties = {
  position: 'absolute',
  left: '50%',
  top: '58px',
  fontSize: '22px'
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
    <Menu inverted borderless style={{ marginBottom: 0 }}>
      {showCart ? cartLeftNav : homeLeftNav}
      <Menu.Item className="MenuHeader" style={menuHeader} header position="right">
        {showCart ? 'Cart' : 'Shop'}
      </Menu.Item>
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
