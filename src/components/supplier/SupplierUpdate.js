import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';

import SupplierForm from './SupplierForm';
import {getSupplier, updateSupplier} from "../../actions/supplier";
import Loading from "../Loading";


class SupplierUpdate extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getSupplier(id);
    }

    onUpdate = formValues => {
        const id = this.props.match.params.id;
        console.log('form values', {id, ...formValues});
        this.props.updateSupplier({id, ...formValues});
    }

    render() {
        const supplier = this.props.supplier;
        if(!supplier) return  <Loading />;
        return  (
            <SupplierForm initialValues = {_.omit(supplier, 'id')} onSubmit = {this.onUpdate} type={'ویرایش'} />
         );
    }
}


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {supplier: state.supplier.items[id]};
}

export default connect(mapStateToProps, {getSupplier, updateSupplier})(SupplierUpdate);