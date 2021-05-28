import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import history from "../history";
import PurchaseInvoice from './purchase-invoice/index';
import NavigationBar from "./navigation-bar";
import PurchaseInvoiceSave from "./purchase-invoice/PrucahseInvoiceSave";
import SaleInvoicePage from './sale-invoice';
import SaleInvoiceSave from "./sale-invoice/SaleInvoiceSave";
import SaleInvoiceDelete from "./sale-invoice/SaleInvoiceDelete";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import ProductSave from "./product/ProductSave";
import ProductUpdate from "./product/ProductUpdate";
import ProductDelete from "./product/ProductDelete";
import ProductShow from "./product/ProductShow";
import ProductPage from './product';
import CustomerSave from "./customer/CustomerSave";
import CustomerUpdate from "./customer/CustomerUpdate";
import CustomerDelete from "./customer/CustomerDelete";
import CustomerShow from "./customer/CustomerShow";
import CustomerPage from './customer';
import SupplierSave from "./supplier/SupplierSave";
import SupplierUpdate from "./supplier/SupplierUpdate";
import SupplierDelete from "./supplier/SupplierDelete";
import SupplierShow from "./supplier/SupplierShow";
import SupplierPage from './supplier';
import PurchaseInvoiceDelete from "./purchase-invoice/PurchaseInvoiceDelete";
import PurchaseInvoiceShow from "./purchase-invoice/PurchaseInvoiceShow";
import SaleInvoiceShow from "./sale-invoice/SaleInvoiceShow";

class App extends React.Component {


    render() {
        return (
            <React.Fragment>
                <SuccessMessage />
                <ErrorMessage />
                <NavigationBar />
                {/*<PurchaseInvoice />*/}
                <div style={{margin: '75px 60px 0 0', }}>
                    {/*<PurchaseInvoiceSave />*/}
                    <Router history={history}>
                        <Switch>
                            <Route exact path={'/purchase-invoice'} component={PurchaseInvoice} />
                            <Route exact path={'/purchase-invoice/save'} component={PurchaseInvoiceSave} />
                            <Route exact path={'/purchase-invoice/delete/:id'} component={PurchaseInvoiceDelete} />
                            <Route exact path={'/purchase-invoice/show/:id'} component={PurchaseInvoiceShow} />

                            <Route exact path={'/sale-invoice'} component={SaleInvoicePage} />
                            <Route exact path={'/sale-invoice/save'} component={SaleInvoiceSave} />
                            <Route exact path={'/sale-invoice/delete/:id'} component={SaleInvoiceDelete} />
                            <Route exact path={'/sale-invoice/show/:id'} component={SaleInvoiceShow} />

                            <Route exact path={'/product'} component={ProductPage} />
                            <Route exact path={'/product/save'} component={ProductSave} />
                            <Route exact path={'/product/update/:id'} component={ProductUpdate} />
                            <Route exact path={'/product/delete/:id'} component={ProductDelete} />
                            <Route exact path={'/product/show/:id'} component={ProductShow} />

                            <Route exact path={'/customer'} component={CustomerPage} />
                            <Route exact path={'/customer/save'} component={CustomerSave} />
                            <Route exact path={'/customer/update/:id'} component={CustomerUpdate} />
                            <Route exact path={'/customer/delete/:id'} component={CustomerDelete} />
                            <Route exact path={'/customer/show/:id'} component={CustomerShow} />

                            <Route exact path={'/supplier'} component={SupplierPage} />
                            <Route exact path={'/supplier/save'} component={SupplierSave} />
                            <Route exact path={'/supplier/update/:id'} component={SupplierUpdate} />
                            <Route exact path={'/supplier/delete/:id'} component={SupplierDelete} />
                            <Route exact path={'/supplier/show/:id'} component={SupplierShow} />

                        </Switch>
                    </Router>
                </div>
            </React.Fragment>
        );
    }
}


export default App;