import React from 'react';
import {Icon, Menu, Popup} from "semantic-ui-react";
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

const RightNavigationBar = ({selectedItem, setSelectedItem}) => {

    const onClickHandler = (e, {name}) => {
        setSelectedItem(name);
    }

    const color = '#576573';
    return (
        <Menu icon    vertical floated={'right'}  style={{height: '100vh', position: 'fixed'  , margin: '62px 0 0 0' ,right: '0' }}  size={"huge"} compact >
            <Menu.Item name={ACTIVITY} active={selectedItem === ACTIVITY} onClick={onClickHandler}>
                <Popup position={"left center"} content={'History'}
                       trigger={<Icon style={{color: color}} name={"history"}/>}/>
            </Menu.Item>
            <Menu.Item name={TRANSACTION} active={selectedItem === TRANSACTION} onClick={onClickHandler}>
                <Popup position={"left center"} content={'Transactions'}
                       trigger={<Icon style={{color: color}} name={"clipboard list"}/>}/>
            </Menu.Item>
            <Menu.Item name={INVOICE} active={selectedItem === INVOICE} onClick={onClickHandler}>
                <Popup position={"left center"} content={'Invoices'}
                       trigger={<Icon style={{color: color}} name={"warehouse"}/>}/>
            </Menu.Item>
            <Menu.Item name={PRODUCT} active={selectedItem === PRODUCT} onClick={onClickHandler}>
                <Popup position={"left center"} content={'Products'}
                       trigger={<Icon style={{color: color}} name={"box"}/>}/>
            </Menu.Item>
            <Menu.Item name={CUSTOMER} active={selectedItem === CUSTOMER} onClick={onClickHandler}>
                <Popup position={"left center"} content={'Customers'}
                       trigger={<Icon style={{color: color}} name={"user"}/>}/>
            </Menu.Item>
            <Menu.Item name={SUPPLIER} active={selectedItem === SUPPLIER} onClick={onClickHandler}>
                <Popup position={"left center"} content={'Suppliers'} trigger={
                    <Icon.Group>
                        <Icon name={'user'} color={"grey"}/>
                        <Icon name={'shopping cart'} corner={"bottom right"}/>
                    </Icon.Group>
                }/>
            </Menu.Item>
           <Permission authority={'ROLE_ADMIN'}>
               <Menu.Item name={USER} active={selectedItem === USER}  onClick={onClickHandler}>
                   <Popup position={"left center"} content={'User'}
                          trigger={<Icon style={{color: color}} name={"users"}/>}/>
               </Menu.Item>
           </Permission>
        </Menu>
    );

}

export default RightNavigationBar;
