import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import _ from 'lodash';

import {getCustomerPage, getCustomer} from "../../actions/customer";
import CustomSearch from "../inputs/CustomSearch";

const SearchCustomer = ({customers,customer,getCustomerPage,getCustomer,input,hasError,defaultSearchQuery,onSelect}) => {
    const [defaultValue,setDefaultValue] = useState(defaultSearchQuery);
    useEffect(() => {

        if(typeof input.value === 'number' && !customer ) {
            getCustomer(input.value);
        }
    }, [input.value]);

    useEffect(() => {
        if(customer) {
            setDefaultValue(`${customer.firstName}  ${customer.lastName}`);
            onSelect(customer);
        }
    }, [customer]);
    return (
        <React.Fragment>
                <div style={{width: "220px", marginRight: "5px"}}>
                    <CustomSearch key={customers} input={input} onSelect={onSelect} label={'خریدار'} hasError={hasError} options={_.map(customers, (value, key) => ({
                        title: value.firstName + " " + value.lastName,
                        ...value
                    }))} getSearchedSources={(search) => getCustomerPage({page: 0, size: 5, search})}/>
                </div>
        </React.Fragment>
    );

}


const mapStateToProps = (state,props) => {
    const customers = state.customer.items;
    let customer = null;
    if(typeof props.input.value === 'number')  customer = customers[props.input.value];
    return {customers,customer};
}

export default connect(mapStateToProps, {getCustomerPage, getCustomer})(SearchCustomer);
