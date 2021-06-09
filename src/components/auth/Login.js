import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import _ from 'lodash';
import {Button, Container, Form, Grid, Header, Segment} from "semantic-ui-react";

import * as validator from '../../utility/formValidators';
import {login} from "../../actions/auth";
import Loading from "../Loading";


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


const Login = ({ handleSubmit, login, isLoading}) => {

    const onSubmit = ({username, password}) => {
        login({username, password});
    }


    if(isLoading) return <Loading />;

    return (
        <Container>
            <Grid textAlign={'center'} style={{height: '100vh'}}  verticalAlign={"middle"}>
                <Grid.Column style={{maxWidth: '450'}}>
                    <Header>وارد حساب کاربری خود شوید</Header>
                    <Form onSubmit={handleSubmit(onSubmit)} size={'large'}>
                        <Segment stacked>
                            {_.map(FIELDS, ({name,render,validate,normalize},index) => {
                                return <Field key={index} name={name} component={render} validate={validate} normalize={normalize} />;
                            })}
                            <Button type={'submit'} color={'facebook'} fluid size={'large'} >ورود</Button>
                        </Segment>

                    </Form>
                </Grid.Column>

            </Grid>
        </Container>
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

