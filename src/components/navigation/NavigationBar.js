import React , {useState, useEffect} from 'react';
import {Icon, Menu, Dropdown} from "semantic-ui-react";
import RightNavigationBar from "./RightNavigationBar";
import AppSidebar from "./AppSidebar";
import history from "../../history";

const HOME = 'home';
const BARS = 'bars'
const TRANSACTION = 'transaction';
const INVOICE = 'invoice';
const SALE_INVOICE  = 'sale-invoice';
const PURCHASE_INVOICE  = 'purchase-invoice';
const PRODUCT  = 'product';
const SUPPLIER  = 'supplier';
const CUSTOMER  = 'customer';

const NavigationBar = (props) => {
    const [activeItem, setActiveItem] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);


    const pathname = history.location.pathname;
    useEffect(() => {
        if(pathname.includes(`/${HOME}`)) setActiveItem(HOME);
        if(pathname.includes(`/${BARS}`)) setActiveItem(BARS);
        if(pathname.includes(`/${TRANSACTION}`)) setActiveItem(TRANSACTION);
        if(pathname.includes(`/${INVOICE}`)) setActiveItem(INVOICE);
        if(pathname.includes(`/${SALE_INVOICE}`)) setActiveItem('invoice');
        if(pathname.includes(`/${PURCHASE_INVOICE}` )) setActiveItem('invoice');
        if(pathname.includes(`/${PRODUCT}`)) setActiveItem(PRODUCT);
        if(pathname.includes(`/${SUPPLIER}`)) setActiveItem(SUPPLIER);
        if(pathname.includes(`/${CUSTOMER}`)) setActiveItem(CUSTOMER);
    }, []);

    useEffect(() => {
        if(activeItem === HOME ) history.push(`/${HOME}`);
        if(activeItem === BARS ) history.push(`/${BARS}`);
        if(activeItem === TRANSACTION ) history.push(`/${TRANSACTION}`);
        if(activeItem === INVOICE ) history.push(`/${INVOICE}`);
        if(activeItem === SALE_INVOICE ) history.push(`/${SALE_INVOICE}`);
        if(activeItem === PURCHASE_INVOICE ) history.push(`/${PURCHASE_INVOICE}`);
        if(activeItem === PRODUCT ) history.push(`/${PRODUCT}`);
        if(activeItem === SUPPLIER ) history.push(`/${SUPPLIER}`);
        if(activeItem === CUSTOMER ) history.push(`/${CUSTOMER}`);
    }, [activeItem]);




    const onClickHandler = (e, {name}) => {
         setActiveItem(name);
    }

    const onLogout = () => {
        history.push('/logout');
    }
    const onProfileClick = () => {
        history.push('/profile');
    }

    return (
      <React.Fragment>
          <Menu color={"blue"} inverted  style={{paddingTop: '7px',direction: 'rtl', position: 'fixed', zIndex: '1000', margin: '0', width: '100%', height: '63px'}}  >
              <Menu.Item name={BARS}  active={showSidebar } onClick={() => setShowSidebar(!showSidebar)}  >
                  <Icon name={'bars'} size={"large"}/>
              </Menu.Item>
              <Menu.Item name={HOME} active={activeItem === HOME} onClick={onClickHandler} >
                  Home
              </Menu.Item>

              <Menu.Item  position={'left'}>
                  <Dropdown  icon={{name: 'user circle', size: 'big'}} >
                      <Dropdown.Menu>
                          <Dropdown.Item onClick={onProfileClick} text='Profile' as={'a'} />
                          <Dropdown.Divider   />
                          <Dropdown.Item as={'a'} onClick={onLogout}><Icon name={'log out'}  color={'red'}   /><b>Log out</b><span
                              className={'description'}>ctrl + o</span> </Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>

                  {/*<Icon name={"user circle"} size={"big"} link />*/}
              </Menu.Item>

          </Menu>
          <RightNavigationBar  selectedItem={activeItem} setSelectedItem={setActiveItem} />
          <AppSidebar visible={showSidebar} setVisible={() => setShowSidebar(false)}  selectedItem={activeItem} setSelectedItem={setActiveItem}/>
      </React.Fragment>
    );

}

export default NavigationBar;