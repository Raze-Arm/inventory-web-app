import React from "react";
import {connect} from 'react-redux';








export  default (ChildComponent) => {
    class  ComposedComponent extends React.Component {
        componentDidMount() {
            this.shouldNavigateAway();
        }
        componentDidUpdate(prevProps, prevState, snapshot) {
            this.shouldNavigateAway();
        }

        onDismissError() {
            this.props.history.goBack();
        }



        shouldNavigateAway() {
            if(!this.props.isLoggedIn ) {
                console.log('navigated away ...');
                this.props.history.push('/login');
                return ;
            }

        }

        render() {
            return <ChildComponent {...this.props} />;
        }

    }

    const mapStateToProps = (state) => {
        const {isLoggedIn, authorities} = state.auth;
        return {isLoggedIn, authorities};
    }

    return connect(mapStateToProps,{}) (ComposedComponent);

}


