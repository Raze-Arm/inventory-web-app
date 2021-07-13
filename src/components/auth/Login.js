import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import _ from 'lodash';
import {Button, Container, Form, Grid, Input,} from "semantic-ui-react";

import * as validator from '../../utility/formValidators';
import {login} from "../../actions/auth";
import Loading from "../Loading";
import logo from '../../images/logo192.png'

import './Login.css';
import PasswordInput from "../inputs/PasswordInput";
import {Link} from "react-router-dom";


const FIELDS  = {
    username: {
        name: 'username',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <Form.Field   control={Input }{...input}  icon={'user'} iconPosition={'left'} label={'نام کاربری'} placeholder={'نام کاربری'} error={hasError ? meta.error : null} />
            );
        },
        validate: [
            validator.required,
            validator.minLength(4),
            validator.maxLength(30)
        ]
    },
    password: {
        name: 'password',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <PasswordInput {...input}  error={hasError ? meta.error : null}/>

            );
        },
        validate: [
            validator.required,
            validator.minLength(4),
            validator.maxLength(30)
        ]
    }
}


class Login extends React.Component{
    body = document.querySelector('body');

    componentDidMount() {
        // const colors = [
        //     "#dbabf5",
        //     "#FFE066",
        //     "#247BA0",
        //     "#70C1B3",
        //     "#00b1fc",
        //     "#00e7fc",
        //     "#32936F"
        // ];
        // const rand = Math.floor(Math.random() * colors.length);
        //
        // this.body.style.backgroundColor = colors[rand];
    }

    componentWillUnmount() {
        // this.body.style.backgroundColor = 'white';

    }

    onSubmit = ({username, password}) => {
        this.props.login({username, password});
    }




    render() {
        const {isLoading, handleSubmit}  = this.props;
        if(isLoading) return <Loading />;

        return (
            <React.Fragment>
                <LoginBackground />
                <Container style={{marginTop: '%5', width: '100vw', position: 'fixed', top: '0', zIndex: '1'}}>
                    <Grid centered  className="aligned" style={{height: '80vh', margin: 'auto'}} verticalAlign={"middle"}>
                        <div className="row">
                            <div className="sixteen wide tablet six wide computer column ">
                                <div className="ui left aligned segment">

                                    <Form  onSubmit={handleSubmit(this.onSubmit)} >

                                        <h2 className="ui header center aligned loginbox">

                                            <img src={logo}
                                                 className="ui small image"/>
                                            <div className="content">
                                                وارد حساب کاربری خود شوید
                                            </div>
                                        </h2>

                                        {_.map(FIELDS, ({name,render,validate,normalize},index) => {
                                            return <Field key={index} name={name} component={render} validate={validate} normalize={normalize} />;
                                        })}

                                        <Button type={'submit'}  id="LinkButton1" className="ui field teal right labeled icon button fluid"
                                        >ورود <i className="icon sign in"/></Button>


                                    </Form>
                                    <div style={{marginTop: '8px', textAlign: "center"}}>
                                        <Link  to={'/login/passwordrecovery'}><b>رمز عبور خود را فراموش کرده اید؟</b></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Container>
            </React.Fragment>
        );
    }



}

const LoginBackground = () => {
    return (
        <main style={{border: '0', margin: '0', padding: '0', boxSizing: 'border-box', minHeight: '100vh', zIndex: '0'}} >
            <div className="sky"></div>
            <div className="ocean"></div>
            <div className="beach"></div>
            <div className="beach-container">
                {/*<div className="beach__ball"></div>*/}
                {/*<div className="beach__umbrella">*/}
                {/*    <div className="umbrella__handle"></div>*/}
                {/*    <div className="umbrella__fabric"></div>*/}
                {/*</div>*/}
                {/*<div className="beach__bucket">*/}
                {/*    <div className="sand__shuffle"></div>*/}
                {/*    <div className="bucket__handle"></div>*/}
                {/*</div>*/}
            </div>
        </main>
    );
}




const form = reduxForm({
    form: 'loginForm',
    destroyOnUnmount: true,
})(Login);


const mapStateToProps = (state) => {
    const {isLoading} = state.auth;
    return {isLoading};
}

export default connect(mapStateToProps, {login})(form);

