import React from "react";
import {connect} from 'react-redux';
import _ from 'lodash';
import {SubmissionError} from "redux-form";

import UserForm from './UserForm';
import {getUser, updateUser} from "../../actions/user";
import Loading from "../Loading";



class UserUpdate extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getUser(id);
    }


    onUpdate = formValues => {
        if (formValues.password && !formValues?.confirmPassword) {
            throw new SubmissionError({confirmPassword: 'Please enter the password again'});
        }
        if(formValues.confirmPassword && !formValues.password)
            throw new SubmissionError({password: 'Please enter the password'})
        if(formValues?.password && formValues?.confirmPassword &&  formValues?.password !== formValues?.confirmPassword ) {
            throw {password: 'Password Doesnt Match', confirmPassword: true};
        }
        const id = this.props.match.params.id;
        const updatedUser = {id , ..._.omit(formValues, 'confirmPassword')};
        console.log('formValues', updatedUser);
        this.props.updateUser(updatedUser)

    }

    render() {
        const user  = this.props.user;
        if(!user) return <Loading />;
        return (
            <UserForm initialValues = {_.omit(user, 'id')} onSubmit = {this.onUpdate} type={'Update'} />
        );
    }


}


const mapStateToProps = (state, props) => {
    const id = props.match.params.id;
    return {user: state.user.items[id]};
}


export default connect(mapStateToProps, {getUser, updateUser})(UserUpdate);