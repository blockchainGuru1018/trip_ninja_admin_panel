import React, { forwardRef } from 'react';
import { NavLink, NavLinkProps } from "react-router-dom";
import { Drawer, List, ListItem } from "@material-ui/core";

import menuItems from './items';

import "./styles.css";

const SideMenu: React.FC = () => {

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: 'sideMenu-Component',
      }}
    >
      <div className="menuContainer">
        {menuItems.map((item, idx) => (
          <div key={idx} className="menuList">
            <p className="title">{item.title}</p>
            <List component="nav" className="subMenuList" disablePadding>
              {item.children.map((el, i) => (
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
