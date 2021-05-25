import React , {useState, useEffect} from 'react';
import {Icon, Menu} from "semantic-ui-react";
import RightNavigationBar from "./right-navigation-bar";
import AppSidebar from "./AppSidebar";


const NavigationBar = (props) => {
    const [activeItem, setActiveItem] = useState('');



    const onClickHandler = (e, {name}) => {
         setActiveItem(name);
    }



    return (
      <React.Fragment>
          <Menu color={"blue"} inverted  style={{paddingTop: '7px',direction: 'rtl', position: 'fixed', zIndex: '1000', width: '100%', height: '63px'}}  >
              <Menu.Item name={'bars'}  active={activeItem === 'bars' } onClick={onClickHandler}  >
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
          <AppSidebar visible={activeItem === 'bars'} setVisible={() => setActiveItem('')} />
      </React.Fragment>
    );

}

export default NavigationBar;