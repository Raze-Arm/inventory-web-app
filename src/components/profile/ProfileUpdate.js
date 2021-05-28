import React from "react";
import {connect} from "react-redux";
import {Dimmer, Loader} from "semantic-ui-react";


import ProfileUpdateForm from './ProfileUpdateForm';

import {getUserProfile, updateUserProfile} from "../../actions/profile";
import _ from "lodash";



class ProfileUpdate extends React.Component {
    componentDidMount() {
        const username = this.props.username;
        if(username)
            this.props.getUserProfile(username);
    }

    onUpdate = formValues => {
        const id = this.props.profile.id;
        console.log('form values', {id, ...formValues});
        this.props.updateUserProfile({id, ...formValues});
    }

    render() {
        const profile = this.props.profile;
        if(!profile) return <Dimmer><Loader/></Dimmer>;
        return (
            <ProfileUpdateForm  initialValues = {_.omit(profile, 'id')}  onSubmit = {this.onUpdate}  />
        );
    }
}



const mapStateToProps =(state, props) => {
    const username = state.auth.username;
    const profile = state.profile.items[username];
    return {username , profile};
}


export default connect(mapStateToProps, {getUserProfile, updateUserProfile})(ProfileUpdate);