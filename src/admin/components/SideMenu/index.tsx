import React, { forwardRef } from 'react';
import { NavLink, NavLinkProps } from "react-router-dom";
import { Drawer, List, ListItem } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/core/styles';

import menuItems from './items';

const SideMenu: React.FC = () => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.menuContainer}>
        {menuItems.map((item, idx) => (
          <div key={idx} className={classes.menuList}>
            <p className={classes.title}>{item.title}</p>
            <List component="nav" className={classes.subMenuList} disablePadding>
              {item.children.map((el, i) => (
                <ListItem
                  key={i}
                  button
                  className={classes.menuItem}
                  children={<p className={classes.menuText}>{el.name}</p>}
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

const useStyles = makeStyles(theme =>
  createStyles({
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      zIndex: 0,
      width: 240,
      paddingBottom: theme.spacing(4),
      background: '#45565E',
      color: '#fff',
    },
    menuContainer: {
      padding: '0px 25px'
    },
    menuList: {
      paddingBottom: 10,
      borderTop: '1px solid #ABB3B7',

      '&:first-child': {
        border: 'none'
      }
    },
    title: {
      fontSize: 16,
      fontFamily: 'NeuzitGrotesk',
      fontWeight: 'bold',
      paddingTop: 20,
    },
    subMenuList: {
      width: '100%',
    },
    menuItem: {
      '&.active': {
        background: 'rgba(0, 0, 0, 0.08)',

        '& .MuiListItemIcon-root': {
          color: '#fff',
        },
      },
      padding: 0,
    },
    menuText: {
      fontSize: '16px',
      fontFamily: 'NeuzitGrotesk',
      fontWeight: 'lighter',
      padding: '10px 5px',
      whiteSpace: 'pre-line',
      margin:0
    }
  }),
);

export default SideMenu;
