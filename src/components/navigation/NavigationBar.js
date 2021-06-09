import React , {useState, useEffect} from 'react';
import {withRouter} from  'react-router-dom';
import {connect}  from "react-redux";
import {Icon, Menu, Dropdown, Image} from "semantic-ui-react";
import RightNavigationBar from "./RightNavigationBar";
import AppSidebar from "./AppSidebar";


const HOME = '';
const PROFILE = 'profile';
const BARS = 'bars'
const TRANSACTION = 'transaction';
const INVOICE = 'invoice';
const SALE_INVOICE  = 'sale-invoice';
const PURCHASE_INVOICE  = 'purchase-invoice';
const PRODUCT  = 'product';
const SUPPLIER  = 'supplier';
const CUSTOMER  = 'customer';
const USER  = 'user';
const ACTIVITY = 'profile/history';
const NavigationBar = ({username, profile, history}) => {
    const [activeItem, setActiveItem] = useState('');
    const [showSidebar, setShowSidebar] = useState(false);

    const pathname = history.location.pathname;

    useEffect(() => {

        if(pathname === '/') setActiveItem('');
        if(pathname.includes(`/${HOME}`)) setActiveItem(HOME);
        if(pathname.includes(`/${BARS}`)) setActiveItem(BARS);
        if(pathname.includes(`/${TRANSACTION}`)) setActiveItem(TRANSACTION);
        if(pathname.includes(`/${INVOICE}`)) setActiveItem(INVOICE);
        if(pathname.includes(`/${SALE_INVOICE}`)) setActiveItem('invoice');
        if(pathname.includes(`/${PURCHASE_INVOICE}` )) setActiveItem('invoice');
        if(pathname.includes(`/${PRODUCT}`)) setActiveItem(PRODUCT);
        if(pathname.includes(`/${SUPPLIER}`)) setActiveItem(SUPPLIER);
        if(pathname.includes(`/${CUSTOMER}`)) setActiveItem(CUSTOMER);
        if(pathname.includes(`/${ACTIVITY}`)) setActiveItem(ACTIVITY);
        if(pathname.includes(`/${USER}`)) setActiveItem(USER);
    }, [pathname]);



    const navigate = (name) => {
        setActiveItem(name);
        history.push(`/`+ name);
    }

    const onClickHandler = (e, {name}) => {
        navigate(name);
    }

    const onLogout = () => {
        history.push('/logout');
    }
    const onProfileClick = () => {
        history.push('/profile');
        setActiveItem(PROFILE);
    }

    const renderProfileImage= () => {
        const photo = profile?.photo;
            return (
                <React.Fragment>
                    {username}
                    {photo ? <Image avatar src={URL.createObjectURL(profile.photo)}/> :
                        <Icon size={"big"} name={'user circle'}/>}
                </React.Fragment>
            );

    }

    return (
      <React.Fragment>
          <Menu  inverted  style={{backgroundColor: '#2496ed' ,paddingTop: '7px',direction: 'rtl', position: 'fixed', zIndex: '1000', margin: '0', width: '100%', height: '63px'}}  >
              <Menu.Item name={BARS} style={{width: '80.7px'}}  active={showSidebar } onClick={() => setShowSidebar(!showSidebar)}  >
                  <Icon name={'bars'} size={"large"}/>
              </Menu.Item>
              <Menu.Item name={HOME} active={activeItem === HOME} onClick={onClickHandler} >
                  خانه
              </Menu.Item>

              <Menu.Item  position={'left'}>
                  <Dropdown trigger={renderProfileImage()} inline>
                      <Dropdown.Menu>
                          <Dropdown.Item onClick={onProfileClick} text='مشخصات' as={'a'}/>
                          <Dropdown.Divider/>
                          <Dropdown.Item as={'a'} onClick={onLogout}><Icon name={'log out'} color={'red'}/><b>خروج</b><span
                              className={'description'}>ctrl + o</span> </Dropdown.Item>
                      </Dropdown.Menu>
                  </Dropdown>

                  {/*<Icon name={"user circle"} size={"big"} link />*/}
              </Menu.Item>

          </Menu>
          <RightNavigationBar  selectedItem={activeItem} setSelectedItem={navigate } />
          <AppSidebar visible={showSidebar} setVisible={() => setShowSidebar(false)}  selectedItem={activeItem} setSelectedItem={navigate}/>
      </React.Fragment>
    );

}

const mapStateToProps = (state) => {
    const username = state.auth.username;
    const profile = state.profile.info;
    return { username, profile};
}
const NavBar = withRouter(NavigationBar);

export default connect(mapStateToProps, {})(NavBar);