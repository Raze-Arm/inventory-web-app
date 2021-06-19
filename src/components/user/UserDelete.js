import React from "react";
import {connect} from 'react-redux';
import {Button} from "semantic-ui-react";

import Modal from "../Modal";
import {getUser , deleteUser} from "../../actions/user";
import Loading from "../Loading";


class UserDelete extends React.Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getUser(id);
    }

    onDelete = () => {
        const id = this.props.match.params.id;
        this.props.deleteUser(id);
    }
    onCancel = () => {
        this.props.history.push('/user');
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
        const user = this.props.user;
        if(!user)  return <Loading />;


        return  (
            <Modal
                redHeader={true}
                title={"حذف کاربر"}
                content={`آیا مطمئن هستید ، می خواهید کاربر را حذف کنید:${user.firstName} ${user.lastName || ''}`}
                actions={this.renderActions()}
                onDismiss={() => this.onCancel()}
            > </Modal>
        );
    }

}


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {user: state.user.items[id]};
}

export default connect(mapStateToProps, {getUser, deleteUser})(UserDelete);
