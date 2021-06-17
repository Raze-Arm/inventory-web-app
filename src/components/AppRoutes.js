import React from 'react';
import {Switch, Route} from 'react-router-dom';
import requireAuth from "./hoc/requireAuth";
import InvoicePage from "./invoice";
import TransactionPage from "./transaction";
import PurchaseInvoice from "./purchase-invoice";
import PurchaseInvoiceSave from "./purchase-invoice/PrucahseInvoiceSave";
import PurchaseInvoiceDelete from "./purchase-invoice/PurchaseInvoiceDelete";
import PurchaseInvoiceShow from "./purchase-invoice/PurchaseInvoiceShow";
import SaleInvoicePage from "./sale-invoice";
import SaleInvoiceSave from "./sale-invoice/SaleInvoiceSave";
import SaleInvoiceDelete from "./sale-invoice/SaleInvoiceDelete";
import SaleInvoiceShow from "./sale-invoice/SaleInvoiceShow";
import ProductPage from "./product";
import ProductSave from "./product/ProductSave";
import ProductUpdate from "./product/ProductUpdate";
import ProductDelete from "./product/ProductDelete";
import ProductShow from "./product/ProductShow";
import CustomerPage from "./customer";
import CustomerSave from "./customer/CustomerSave";
import CustomerUpdate from "./customer/CustomerUpdate";
import CustomerDelete from "./customer/CustomerDelete";
import CustomerShow from "./customer/CustomerShow";
import SupplierPage from "./supplier";
import SupplierSave from "./supplier/SupplierSave";
import SupplierUpdate from "./supplier/SupplierUpdate";
import SupplierDelete from "./supplier/SupplierDelete";
import SupplierShow from "./supplier/SupplierShow";

import NavigationBar from './navigation';
import Home from "./Home";
import ProfileUpdate from "./profile/ProfileUpdate";
import AppBreadcrumb from "./AppBreadcrumb";

import UserPage from './user';
import UserSave from "./user/UserSave";
import UserUpdate from "./user/UserUpdate";
import UserDelete from "./user/UserDelete";
import UserShow from "./user/UserShow";

import UserActivityPage from "./activity";

import Chat from './chat';

import './App.css';
import {Header} from "semantic-ui-react";

const AppRoutes = () => {




    return (
        <React.Fragment>
            <NavigationBar />

            <div id={'app'} style={{margin: '83px 60px 0 0', paddingRight: '25px'}}>
                <Chat />
                <AppBreadcrumb   />
                <Switch>
                    <Route exact path={'/'} component={requireAuth(Home)} />

                    <Route exact path={'/profile/history'} component={requireAuth(UserActivityPage)} />


                    <Route exact path={'/profile'} component={requireAuth(ProfileUpdate)} />
                    <Route exact path={'/user'} component={requireAuth(UserPage, 'ROLE_ADMIN')} />
                    <Route exact path={'/user/save'} component={requireAuth(UserSave, 'ROLE_ADMIN')} />
                    <Route exact path={'/user/update/:id'} component={requireAuth(UserUpdate, 'ROLE_ADMIN')} />
                    <Route exact path={'/user/delete/:id'} component={requireAuth(UserDelete, 'ROLE_ADMIN')} />
                    <Route exact path={'/user/show/:id'} component={requireAuth(UserShow, 'ROLE_ADMIN')} />
                    <Route exact path={'/user/show'} component={requireAuth(UserShow, 'ROLE_ADMIN')} />

                    <Route exact path={'/invoice'} component={requireAuth(InvoicePage)} />

                    <Route exact path={'/transaction'} component={requireAuth(TransactionPage)} />

                    <Route exact path={'/purchase-invoice'} component={requireAuth(PurchaseInvoice)} />
                    <Route exact path={'/purchase-invoice/save'} component={requireAuth(PurchaseInvoiceSave)} />
                    <Route exact path={'/purchase-invoice/delete/:id'} component={requireAuth(PurchaseInvoiceDelete)} />
                    <Route exact path={'/purchase-invoice/show/:id'} component={requireAuth(PurchaseInvoiceShow)} />

                    <Route exact path={'/sale-invoice'} component={requireAuth(SaleInvoicePage)} />
                    <Route exact path={'/sale-invoice/save'} component={requireAuth(SaleInvoiceSave)} />
                    <Route exact path={'/sale-invoice/delete/:id'} component={requireAuth(SaleInvoiceDelete)} />
                    <Route exact path={'/sale-invoice/show/:id'} component={requireAuth(SaleInvoiceShow)} />

                    <Route exact path={'/product'} component={requireAuth(ProductPage)} />
                    <Route exact path={'/product/save'} component={requireAuth(ProductSave)} />
                    <Route exact path={'/product/update/:id'} component={requireAuth(ProductUpdate)} />
                    <Route exact path={'/product/delete/:id'} component={requireAuth(ProductDelete)} />
                    <Route exact path={'/product/show/:id'} component={requireAuth(ProductShow)} />

                    <Route exact path={'/customer'} component={requireAuth(CustomerPage)} />
                    <Route exact path={'/customer/save'} component={requireAuth(CustomerSave)} />
                    <Route exact path={'/customer/update/:id'} component={requireAuth(CustomerUpdate)} />
                    <Route exact path={'/customer/delete/:id'} component={requireAuth(CustomerDelete)} />
                    <Route exact path={'/customer/show/:id'} component={requireAuth(CustomerShow)} />

                    <Route exact path={'/supplier'} component={requireAuth(SupplierPage)} />
                    <Route exact path={'/supplier/save'} component={requireAuth(SupplierSave)} />
                    <Route exact path={'/supplier/update/:id'} component={requireAuth(SupplierUpdate)} />
                    <Route exact path={'/supplier/delete/:id'} component={requireAuth(SupplierDelete)} />
                    <Route exact path={'/supplier/show/:id'} component={requireAuth(SupplierShow)} />
                    <Route  path={'/'} >
                        <Header size={"large"} textAlign={"center"}> صفحه یافت نشد</Header>
                    </Route>
                </Switch>
            </div>
        </React.Fragment>
    );
}

export default AppRoutes;