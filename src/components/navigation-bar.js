import React , {useState, useEffect} from 'react';
import {Icon, Menu} from "semantic-ui-react";
import RightNavigationBar from "./right-navigation-bar";
import AppSidebar from "./AppSidebar";


const NavigationBar = (props) => {
    const [activeItem, setActiveItem] = useState('');

    const [sidebarVisible, setSidebarVisible] = useState(false);


    const onClickHandler = (e, {name}) => {
        if(activeItem === 'bars') setSidebarVisible(true);
        else setActiveItem(name);
    }



    return (
      <React.Fragment>
          <Menu color={"blue"} inverted  style={{margin: 0, direction: 'rtl'}}  >
              <Menu.Item name={'bars'}  active={activeItem === 'bars' && sidebarVisible === true} onClick={onClickHandler} >
                  <Icon name={'bars'} size={"large"}/>
              </Menu.Item>
              <Menu.Item name={'home'} active={activeItem === 'home'} onClick={onClickHandler} >
                  Home
              </Menu.Item>


              <Menu.Item position={'left'}>
                  <Icon name={"user circle"} size={"big"}  link />
                  {/*<Icon name={"user circle"} size={"big"} link />*/}

              </Menu.Item>

          </Menu>
          <RightNavigationBar  />
          <AppSidebar visible={sidebarVisible} setVisible={setSidebarVisible} />
      </React.Fragment>
    );

}

export default NavigationBar;