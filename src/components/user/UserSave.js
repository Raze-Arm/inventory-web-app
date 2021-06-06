import React from "react";
import _ from 'lodash';
import {connect} from "react-redux";
import UserForm from './UserForm';

import {SubmissionError} from "redux-form";


import {saveUser} from "../../actions/user";

const UserSave = ({saveUser}) => {

    const onSubmit = formValues => {
        if (formValues.password && !formValues?.confirmPassword) {
            throw new SubmissionError({confirmPassword: 'Please enter the password again'});
        }
        if(formValues.confirmPassword && !formValues.password)
            throw new SubmissionError({password: 'Please enter the password'})
        if(formValues?.password && formValues?.confirmPassword &&  formValues?.password !== formValues?.confirmPassword ) {
            throw  new SubmissionError({ confirmPassword: 'Password Doesnt Match'});
        }
        const user = _.omit(formValues, 'confirmPassword');
        console.log('formValues', user);
        saveUser(user);
    }


    return (
        <UserForm onSubmit={onSubmit} />
    );

}

export default connect(null, {saveUser})(UserSave);