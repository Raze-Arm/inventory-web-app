import React from 'react';
import {Icon, Menu, Popup} from "semantic-ui-react";
import Permission from "../hoc/Permission";
import  './RightNavigationBar.css';

const TRANSACTION = 'transaction';
const INVOICE = 'invoice';
const SALE_INVOICE  = 'sale-invoice';
const PURCHASE_INVOICE  = 'purchase-invoice';
const PRODUCT  = 'product';
const SUPPLIER  = 'supplier';
const CUSTOMER  = 'customer';
const USER  = 'user';
const ACTIVITY = 'profile/history';

const RightNavigationBar = ({selectedItem, setSelectedItem}) => {

    const onClickHandler = (e, {name}) => {
        setSelectedItem(name);
    }

    const color = '#576573';
    const spanStyle = {fontWeight: 'lighter', fontSize: 'x-small' , color: 'grey'};
    return (
        <Menu icon id={'right-nav'}    vertical floated={'right'}  style={{height: '100vh', position: 'fixed'  , margin: '62px 0 0 10px' ,right: '0' }}  size={"huge"} compact >
            <Menu.Item name={ACTIVITY} active={selectedItem === ACTIVITY} onClick={onClickHandler}>
                <Popup position={"left center"} content={'تاریخچه'}
                       trigger={<Icon style={{color: color}} name={"history"}/>}/>
                       <span style={spanStyle}>تاریخچه</span>
            </Menu.Item>
            <Menu.Item name={TRANSACTION} active={selectedItem === TRANSACTION} onClick={onClickHandler}>
                <Popup position={"left center"} content={'تراکنش ها'}
                       trigger={<Icon style={{color: color}} name={"clipboard list"}/>}/>
                <span style={spanStyle}>تراکنش ها</span>
            </Menu.Item>
            <Menu.Item name={INVOICE} active={selectedItem === INVOICE} onClick={onClickHandler}>
                <Popup position={"left center"} content={'فاکتورها'}
                       trigger={<Icon style={{color: color}} name={"warehouse"}/>}/>
                <span style={spanStyle}>فاکتور</span>
            </Menu.Item>
            <Menu.Item name={PRODUCT} active={selectedItem === PRODUCT} onClick={onClickHandler}>
                <Popup position={"left center"} content={'محصولات'}
                       trigger={<Icon style={{color: color}} name={"box"}/>}/>
                <span style={spanStyle}>محصول</span>
            </Menu.Item>
            <Menu.Item name={CUSTOMER} active={selectedItem === CUSTOMER} onClick={onClickHandler}>
                <Popup position={"left center"} content={'مشتریان'}
                       trigger={<Icon style={{color: color}} name={"user"}/>}/>
                <span style={spanStyle}>مشتری</span>
            </Menu.Item>
            <Menu.Item name={SUPPLIER} active={selectedItem === SUPPLIER} onClick={onClickHandler}>
                <Popup position={"left center"} content={'فروششندگان'} trigger={
                    <Icon.Group>
                        <Icon name={'user'} color={"grey"}/>
                        <Icon name={'shopping cart'} corner={"bottom right"}/>
                    </Icon.Group>
                }/>
                <div style={spanStyle}>فروشنده</div>
            </Menu.Item>
           <Permission authority={'ROLE_ADMIN'}>
               <Menu.Item name={USER} active={selectedItem === USER}  onClick={onClickHandler}>
                   <Popup position={"left center"} content={'کاربر'}
                          trigger={<Icon style={{color: color}} name={"users"}/>}/>
                   <span style={spanStyle}>کاربر</span>
               </Menu.Item>
           </Permission>
        </Menu>
    );

}

export default RightNavigationBar;
