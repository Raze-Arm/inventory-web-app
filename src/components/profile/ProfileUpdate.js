import React from "react";
import _ from 'lodash';
import {connect} from "react-redux";
import {Dimmer, Loader} from "semantic-ui-react";


import ProfileUpdateForm from './ProfileUpdateForm';

import {getProfile, updateProfile} from "../../actions/profile";

import {SubmissionError} from "redux-form";


class ProfileUpdate extends React.Component {
    componentDidMount() {
        const username = this.props.username;
        if(username) {
            this.props.getProfile(username);
        }
    }

    onUpdate = formValues => {
        if (formValues.password && !formValues?.confirmPassword) {
            throw new SubmissionError({confirmPassword: 'لطفاً دوباره رمز ورود را وارد کنید'});
        }
        if(formValues.confirmPassword && !formValues.password)
            throw new SubmissionError({password: 'لطفا رمز عبور را وارد کنید'})
        if(formValues?.password && formValues?.confirmPassword &&  formValues?.password !== formValues?.confirmPassword ) {
            throw  new SubmissionError({ confirmPassword: 'رمز عبور مطابقت ندارد'});
        }
        const id = this.props.profile.id;
        const updatedProfile = {id, ..._.omit(formValues, 'confirmPassword') };
        console.log('form values', updatedProfile);
        this.props.updateProfile(updatedProfile);
    }


    render() {
        const profile = this.props.profile;
        if(!profile) return <Dimmer><Loader/></Dimmer>;
        return (
            <React.Fragment>

                <ProfileUpdateForm  initialValues = {_.omit(profile, 'id')}  onSubmit = {this.onUpdate}  />
            </React.Fragment>
        );
    }
}



const mapStateToProps =(state, props) => {
    const username = state.auth.username;
    const profile = state.profile.info;
    return {username , profile};
}


export default connect(mapStateToProps, {getProfile, updateProfile})(ProfileUpdate);