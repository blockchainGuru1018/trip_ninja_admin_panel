import React, { forwardRef } from 'react';
import { NavLink, NavLinkProps } from "react-router-dom";
import { Drawer, List, ListItem } from "@material-ui/core";

import menuItems from './items';

import "./styles.css";

const SideMenu: React.FC = () => {
  let menu: any[] = [];
  try {
    const user = JSON.parse(localStorage.getItem('authInfo')!);
    let access_level = 0;
    if (!user.user.is_agent) {
      access_level = 1;
    }
    if (user.user.is_superuser) {
      access_level = 2;
    }
    menu = menuItems.map((el) => ({
      ...el,
      children: el.children.filter((e) => e.access_level <= access_level)
    })).filter((el) => el.children.length > 0);
  } catch (e) { }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: 'sideMenu-Component',
      }}
    >
      <div className="menuContainer">
        {menu.map((item, idx) => (
          <div key={idx} className="menuList">
            <p className="title">{item.title}</p>
            <List component="nav" className="subMenuList" disablePadding>
              {item.children.map((el: any, i: number) => (
                <ListItem
                  key={i}
                  button
                  className="menuItem"
                  children={<p className="menuText">{el.name}</p>}
                  component={forwardRef((props: NavLinkProps, ref: any) => <NavLink exact {...props} innerRef={ref} />)}
                  to={el.link}
                />
              ))}
            </List>
          </div>
        ))}
      </div>
    </Drawer>
  )
};

export default SideMenu;
