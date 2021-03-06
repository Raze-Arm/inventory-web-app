import React from "react";
import {connect} from 'react-redux';
import {Button} from "semantic-ui-react";

import Modal from "../Modal";
import {getSupplier, deleteSupplier} from "../../actions/supplier";
import Loading from "../Loading";


class SupplierDelete extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getSupplier(id);
    }

    onDelete = () => {
        const id = this.props.match.params.id;
        this.props.deleteSupplier(id);
    }
    onCancel = () => {
        this.props.history.push('/supplier');
    }
    renderActions = () => {
        return (
            <React.Fragment >
                <Button  onClick={() => this.onCancel()} >لغو</Button>
                <Button color={"red"} onClick={() => this.onDelete()} >حذف</Button>
            </React.Fragment>
        );
    }

    render() {
        const supplier = this.props.supplier;
        if(!supplier) return <Loading />;

        return  (
            <Modal
                redHeader={true}
                title={"حذف فروشنده"}
                content={`آیا مطمئن هستید ، می خواهید فروشنده را حذف کنید:${supplier.firstName} ${supplier.lastName || ''}`}
                actions={this.renderActions()}
                onDismiss={() => this.onCancel()}
            > </Modal>
        );
    }
}

const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {supplier: state.supplier.items[id]};
}

export default connect(mapStateToProps, {getSupplier, deleteSupplier})(SupplierDelete);