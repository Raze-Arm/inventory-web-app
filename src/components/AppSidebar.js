import React , {useState} from 'react';
import {
    Grid,
    Icon,
    Menu,
    Sidebar,
} from 'semantic-ui-react'

const AppSidebar = ({visible, setVisible}) => {


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
                        style={{ minWidth: '6em', maxWidth: '13%'}}

                    >
                        <Menu.Item as='a' >
                            <Icon size={"small"} name='clipboard list' />
                            Transaction
                        </Menu.Item>
                        <Menu.Item as='a'  >
                            <Icon size={"tiny"} name='warehouse' />
                            Invoice
                        </Menu.Item>
                        <Menu.Item as='a' >
                            <Icon  size={"small"} name='box' />
                            Product
                        </Menu.Item>
                        <Menu.Item as='a' >
                            <Icon size={"small"}  name='user' />
                            Customer
                        </Menu.Item>
                        <Menu.Item as='a' >
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