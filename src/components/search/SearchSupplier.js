import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import _ from 'lodash';

import {getSupplierPage, getSupplier} from '../../actions/supplier';
import CustomSearch from "../inputs/CustomSearch";




const SearchSupplier = ({suppliers,supplier,getSupplierPage,getSupplier,input,hasError,defaultSearchQuery,onSelect}) => {
    const [defaultValue,setDefaultValue] = useState(defaultSearchQuery);
    useEffect(() => {

        if(typeof input.value === 'number' && !supplier ) {
            getSupplier(input.value);
        }
    }, [input.value]);

    useEffect(() => {
        if(supplier) {
            setDefaultValue(`${supplier.firstName}  ${supplier.lastName}`);
            onSelect(supplier);
        }
    }, [supplier]);
    return (
        <React.Fragment>
            <div style={{width: "220px", marginRight: "5px"}}>
                <CustomSearch key={suppliers} input={input} onSelect={onSelect} label={'فروشنده'} hasError={hasError} options={_.map(suppliers, (value, key) => ({
                    title: value.firstName + " " + value.lastName,
                    ...value
                }))} getSearchedSources={(search) => getSupplierPage({page: 0, size: 5, search})}/>
            </div>
        </React.Fragment>
    );

}


const mapStateToProps = (state,props) => {
    const suppliers = state.supplier.items;
    let supplier = null;
    if(typeof props.input.value === 'number')  supplier = suppliers[props.input.value];
    return {suppliers,supplier};
}

export default connect(mapStateToProps, {getSupplierPage, getSupplier})(SearchSupplier);
