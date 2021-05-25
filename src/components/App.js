import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';

import history from "../history";
import PurchaseInvoice from './purchase-invoice/index';
import NavigationBar from "./navigation-bar";
import PurchaseInvoiceSave from "./purchase-invoice/PrucahseInvoiceSave";
import SaleInvoiceSave from "./sale-invoice/SaleInvoiceSave";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";

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
                            <Route exact path={'/sale-invoice/save'} component={SaleInvoiceSave} />
                        </Switch>
                    </Router>
                </div>
            </React.Fragment>
        );
    }
}


export default App;