import React from 'react';
import {
    Divider,
    Grid,
    Icon,
    Menu,
    Sidebar,
} from 'semantic-ui-react'
import history from "../../history";
import Permission from "../hoc/Permission";

const TRANSACTION = 'transaction';
const INVOICE = 'invoice';
const SALE_INVOICE  = 'sale-invoice';
const PURCHASE_INVOICE  = 'purchase-invoice';
const PRODUCT  = 'product';
const SUPPLIER  = 'supplier';
const CUSTOMER  = 'customer';
const USER  = 'user';
const ACTIVITY = 'profile/activity';


const AppSidebar = ({visible, setVisible, selectedItem, setSelectedItem}) => {

    const onClickHandler = (e, {name}) => {
        setSelectedItem(name);
    }

    return (
        <Grid columns={1}>

            <Grid.Column>

                    <Sidebar
                        as={Menu}
                        direction={"right"}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={() => setVisible(false)}
                        vertical
                        visible={visible}
                        width='thin'
                        style={{ minWidth: '6em', maxWidth: '13%', zIndex: '1001'}}

                    >

                        <Menu.Item name={ACTIVITY} active={selectedItem === ACTIVITY} as='a' onClick={onClickHandler} >
                            <Icon size={"small"} name='history' />
                            تاریخچه
                        </Menu.Item>
                        <Menu.Item name={TRANSACTION} active={selectedItem === TRANSACTION} as='a' onClick={onClickHandler} >
                            <Icon size={"small"} name='clipboard list' />
                            تراکنش
                        </Menu.Item>
                        <Menu.Item name={INVOICE} active={selectedItem === INVOICE} as='a' onClick={onClickHandler} >
                            <Icon size={"tiny"} name='warehouse' />
                            صورتحساب
                        </Menu.Item>
                        <Menu.Item name={PRODUCT} active={selectedItem === PRODUCT} as='a' onClick={onClickHandler}>
                            <Icon  size={"small"} name='box' />
                            محصول
                        </Menu.Item>
                        <Menu.Item name={CUSTOMER} active={selectedItem === CUSTOMER} as='a' onClick={onClickHandler}>
                            <Icon size={"small"}  name='user' />
                            مشتری
                        </Menu.Item>
                        <Menu.Item name={SUPPLIER} active={selectedItem === SUPPLIER} as='a' onClick={onClickHandler}>
                          <Icon>
                              <Icon.Group>
                                  <Icon   name={'user'} color={"grey"}/>
                                  <Icon  name={'shopping cart'} corner={"bottom right"}/>
                              </Icon.Group>
                          </Icon>
                            تامین کننده
                        </Menu.Item>
                        <Permission authority={'ROLE_ADMIN'}>
                            <Menu.Item name={USER} active={selectedItem === USER} as='a' onClick={onClickHandler}>
                                <Icon size={"small"}  name='users' />
                                کاربر
                            </Menu.Item>
                        </Permission>
                        <Menu.Item name={'logout'} style={{borderTop: '1px solid grey'}} as='a' onClick={() => history.push('/logout')}>
                            <Icon size={"small"}  name='log out' />
                            خروج
                        </Menu.Item>
                    </Sidebar>


            </Grid.Column>
        </Grid>
    )
}


export default AppSidebar;