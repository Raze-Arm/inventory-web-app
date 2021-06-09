import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import _ from 'lodash';

import {getSupplierPage, getSupplier} from '../../actions/supplier';
import SearchInput from "../inputs/SearchInput";




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
            <div className={"inline field"}>
                {/*<div className="ui left pointing red basic label">*/}
                {/*    That name is taken!*/}
                {/*</div>*/}

                <SearchInput key={"suppliers"} hasError={hasError} input={input}
                             placeholder={"نام فروشنده"}
                             label={"فروشنده"} options={_.map(suppliers, (value,key) => ({id: value.id , name: `${value.firstName}  ${value.lastName}`}))}
                             onSearchChange={(search) => getSupplierPage({page: 0,size: 5,search})}
                             defaultSearchQuery={defaultValue|| ''}
                />

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
