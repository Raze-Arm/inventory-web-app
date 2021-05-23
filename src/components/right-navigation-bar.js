import React, {useState} from 'react';
import {Icon, Menu, Popup} from "semantic-ui-react";

const RightNavigationBar = (props) => {
    const [activeItem, setActiveItem] = useState('');


    const onClickHandler = (e, {name}) => {
        setActiveItem(name);
    }

    const color = '#576573';
    return (
        <Menu icon vertical floated={'right'}  style={{height: '100vh' }} size={"huge"} compact >
            <Menu.Item name={'transaction'} active={activeItem === 'transaction'} onClick={setActiveItem}>
                <Popup position={"left center"} content={'Transactions'}
                       trigger={<Icon style={{color: color}} name={"clipboard list"}/>}/>
            </Menu.Item>
            <Menu.Item name={'invoice'} active={activeItem === 'invoice'} onClick={setActiveItem}>
                <Popup position={"left center"} content={'Invoices'}
                       trigger={<Icon style={{color: color}} name={"warehouse"}/>}/>
            </Menu.Item>
            <Menu.Item name={'product'} active={activeItem === 'product'} onClick={setActiveItem}>
                <Popup position={"left center"} content={'Products'}
                       trigger={<Icon style={{color: color}} name={"box"}/>}/>
            </Menu.Item>
            <Menu.Item name={'customer'} active={activeItem === 'customer'} onClick={setActiveItem}>
                <Popup position={"left center"} content={'Customers'}
                       trigger={<Icon style={{color: color}} name={"user"}/>}/>
            </Menu.Item>
            <Menu.Item name={'supplier'} active={activeItem === 'supplier'} onClick={setActiveItem}>
                <Popup position={"left center"} content={'Suppliers'} trigger={
                    <Icon.Group>
                        <Icon name={'user'} color={"grey"}/>
                        <Icon name={'shopping cart'} corner={"bottom right"}/>
                    </Icon.Group>
                }/>

            </Menu.Item>
        </Menu>
    );

}

export default RightNavigationBar;
