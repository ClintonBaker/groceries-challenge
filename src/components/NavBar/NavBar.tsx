import React, { useEffect, useState } from "react";
import { Menu, Input, Button, Icon, Dropdown, DropdownProps } from "semantic-ui-react";

type NavProps = {
  toggleCart: () => void;
  categories: string[];
  selectedCategory: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setSelectedCategory: (category: string) => void;
};

export const NavBar = (props: NavProps) => {
  const { onChange, toggleCart, categories, selectedCategory, setSelectedCategory } = props;
  const [options, setOptions] = useState<{key: string, text: string, value: string}[]>();

  useEffect(()=>{
    setOptions(categories.map(category => ({key: category,text: category,value: category})));
  }, [categories])

  const handleDropdownChange = (e:React.SyntheticEvent<HTMLElement>, {value}: DropdownProps) => {
    setSelectedCategory(`${value}`);
  }

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
      <Menu.Item>
        <Dropdown placeholder="Category" options={options} clearable selection value={selectedCategory} onChange={handleDropdownChange}/>
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
