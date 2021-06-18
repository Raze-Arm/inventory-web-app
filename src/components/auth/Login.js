import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import _ from 'lodash';
import {Button, Container, Form, Grid, Header, Icon, Input, Segment} from "semantic-ui-react";

import * as validator from '../../utility/formValidators';
import {login} from "../../actions/auth";
import Loading from "../Loading";
import logo from '../../images/logo192.png'

import './Login.css';


const FIELDS  = {
    username: {
        name: 'username',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <Form.Input required {...input} fluid icon={'user'} iconPosition={'left'} placeholder={'نام کاربری'} error={hasError ? meta.error : null} />
            );
        },
        validate: [
            validator.required,
            validator.minLength(4),
            validator.maxLength(15)
        ]
    },
    password: {
        name: 'password',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <Form.Input required {...input} fluid icon={'lock'} iconPosition={'left'} placeholder={'رمز عبور'} type={'password'} error={hasError ? meta.error : null} />
            );
        },
        validate: [
            validator.required,
            validator.minLength(4),
            validator.maxLength(25)
        ]
    }
}


class Login extends React.Component{
    body = document.querySelector('body');

    componentDidMount() {
        const colors = [
            "#dbabf5",
            "#FFE066",
            "#247BA0",
            "#70C1B3",
            "#00b1fc",
            "#00e7fc",
            "#32936F"
        ];
        const rand = Math.floor(Math.random() * colors.length);

        this.body.style.backgroundColor = colors[rand];
    }

    componentWillUnmount() {
        this.body.style.backgroundColor = 'white';

    }

    onSubmit = ({username, password}) => {
        this.props.login({username, password});
    }




    render() {
        console.log('props#', this.props)
        const {isLoading, handleSubmit}  = this.props;
        if(isLoading) return <Loading />;

        return (
            <Container style={{marginTop: '%5'}}>
                <Grid centered  className="aligned" style={{height: '80vh'}} verticalAlign={"middle"}>
                    <div className="row">
                        <div className="sixteen wide tablet six wide computer column catcpa">
                            <div className="ui left aligned segment">

                                <Form  onSubmit={handleSubmit(this.onSubmit)} >

                                    <h2 className="ui header center aligned loginbox">

                                        <img src={logo}
                                             className="ui small image"/>
                                        <div className="content">
                                            وارد حساب کاربری خود شوید
                                        </div>
                                        {/*<Header as={'h3'} textAlign={"center"}>وارد حساب کاربری خود شوید</Header>*/}
                                    </h2>

                                    {_.map(FIELDS, ({name,render,validate,normalize},index) => {
                                        return <Field key={index} name={name} component={render} validate={validate} normalize={normalize} />;
                                    })}

                                    <div  className={' field '} >
                                        <Button type={'submit'} id="LinkButton1" className="ui teal right labeled icon button fluid"
                                        >ورود <i className="icon sign in"/></Button>

                                    </div>

                                </Form>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Container>
        );
    }



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

