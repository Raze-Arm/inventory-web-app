import React from 'react';

import PurchaseInvoice from './purchase-invoice/index';
import NavigationBar from "./navigation-bar";

class App extends React.Component {


    render() {
        return (
            <React.Fragment>
                <NavigationBar />
                <PurchaseInvoice />
            </React.Fragment>
        );
    }
}


export default App;