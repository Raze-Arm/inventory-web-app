import React from 'react';
import {connect} from "react-redux";
import  { Loader} from "semantic-ui-react";



const Loading  = ({isLoading}) => {

    return (
        <Loader style={{display: `${isLoading? 'block' : 'none'}` , position: 'fixed' , width: '100%', height: '100%'}}>Loading</Loader>
        // <Dimmer style={{display: `${isLoading? 'block' : 'none'}`}}><Loading /></Dimmer>
    );
}



const mapStateToProps = (state) => {
    const isLoading = state.message.isLoading;
    return {isLoading}
}

export default connect(mapStateToProps, {})(Loading);