import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';
import {Dimmer, Loader} from "semantic-ui-react";

import SupplierForm from './SupplierForm';
import {getSupplier, updateSupplier} from "../../actions/supplier";


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
        if(!supplier) return  <Dimmer><Loader /></Dimmer>;
        return  (
            <SupplierForm initialValues = {_.omit(supplier, 'id')} onSubmit = {this.onUpdate} type={'Update'} />
         );
    }
}


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {supplier: state.supplier.items[id]};
}

export default connect(mapStateToProps, {getSupplier, updateSupplier})(SupplierUpdate);