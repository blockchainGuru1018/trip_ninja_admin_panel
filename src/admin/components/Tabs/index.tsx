import React from 'react';
import { Tabs as ReactTabs, Tab, TabsProps } from '@material-ui/core';

import './styles.css';

export interface ITabsProps extends Omit<TabsProps, 'onChange'> {
  tabs: string[],
  onChange?: (event: React.ChangeEvent<{}>, value: number) => void;
}

const Tabs:React.FC<ITabsProps> = ({ tabs, children, ...props }) => (
  <ReactTabs
    {...props}
    TabIndicatorProps={{
      style: {
        top: 0,
        bottom: 'unset',
        backgroundColor: '#45565E'
      }
    }}
  >
    {tabs.map((el, idx) => (
      <Tab key={idx} label={el} />
    ))}
  </ReactTabs>
);

export default Tabs;