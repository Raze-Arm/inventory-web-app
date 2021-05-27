import React from 'react';
import {
    Grid,
    Icon,
    Menu,
    Sidebar,
} from 'semantic-ui-react'



const TRANSACTION = 'transaction';
const INVOICE = 'invoice';
const SALE_INVOICE  = 'sale-invoice';
const PURCHASE_INVOICE  = 'purchase-invoice';
const PRODUCT  = 'product';
const SUPPLIER  = 'supplier';
const CUSTOMER  = 'customer';
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
                        <Menu.Item name={TRANSACTION} active={selectedItem === TRANSACTION} as='a' onClick={onClickHandler} >
                            <Icon size={"small"} name='clipboard list' />
                            Transaction
                        </Menu.Item>
                        <Menu.Item name={INVOICE} active={selectedItem === INVOICE} as='a' onClick={onClickHandler} >
                            <Icon size={"tiny"} name='warehouse' />
                            Invoice
                        </Menu.Item>
                        <Menu.Item name={PRODUCT} active={selectedItem === PRODUCT} as='a' onClick={onClickHandler}>
                            <Icon  size={"small"} name='box' />
                            Product
                        </Menu.Item>
                        <Menu.Item name={CUSTOMER} active={selectedItem === CUSTOMER} as='a' onClick={onClickHandler}>
                            <Icon size={"small"}  name='user' />
                            Customer
                        </Menu.Item>
                        <Menu.Item name={SUPPLIER} active={selectedItem === SUPPLIER} as='a' onClick={onClickHandler}>
                          <Icon>
                              <Icon.Group>
                                  <Icon   name={'user'} color={"grey"}/>
                                  <Icon  name={'shopping cart'} corner={"bottom right"}/>
                              </Icon.Group>
                          </Icon>
                            Supplier
                        </Menu.Item>
                    </Sidebar>


            </Grid.Column>
        </Grid>
    )
}


export default AppSidebar;