import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';



const Permission =  ({ authority, authorities,children}) => {

    return (
        <React.Fragment>
            {authorities.includes(authority) ? children : null}
        </React.Fragment>
    );
}
const mapStateToProps = (state) => {
    const {isLoggedIn, authorities} = state.auth;
    return {isLoggedIn, authorities};
}
export default connect(mapStateToProps, {})(Permission);;