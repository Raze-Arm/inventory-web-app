import React from "react";
import {connect} from 'react-redux';








export  default (ChildComponent, authority = '') => {
    class  ComposedComponent extends React.Component {
        state ={renderChild: false};





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
            } else
            if(!this.props.authorities.includes(authority) && authority) {
                this.props.history.push('/');
                return ;
            } else {
                if(!this.state.renderChild)this.setState({renderChild: true});
            }


        }

        render() {
          if(this.state.renderChild)  return <ChildComponent {...this.props} />;
          else return  <div/>;
        }

    }

    const mapStateToProps = (state) => {
        const {isLoggedIn, authorities} = state.auth;
        return {isLoggedIn, authorities};
    }

    return connect(mapStateToProps,{}) (ComposedComponent);

}


