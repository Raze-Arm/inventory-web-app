import React from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from 'react-redux';
import _ from 'lodash';
import {Button, Container, Form, Grid, Header, Segment} from "semantic-ui-react";

import * as validator from '../../utility/formValidators';
import {login} from "../../actions/auth";


const FIELDS  = {
    username: {
        name: 'username',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <Form.Input required {...input} fluid icon={'user'} iconPosition={'left'} placeholder={'username'} error={hasError ? meta.error : null} />
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
                <Form.Input required {...input} fluid icon={'lock'} iconPosition={'left'} placeholder={'password'} type={'password'} error={hasError ? meta.error : null} />
            );
        },
        validate: [
            validator.required,
            validator.minLength(4),
            validator.maxLength(25)
        ]
    }
}


const Login = ({ handleSubmit, login}) => {

    const onSubmit = ({username, password}) => {
        login({username, password});
    }

    return (
        <Container>
            <Grid textAlign={'center'} style={{height: '100vh'}}  verticalAlign={"middle"}>
                <Grid.Column style={{maxWidth: '450'}}>
                    <Header>Log in to your account</Header>
                    <Form onSubmit={handleSubmit(onSubmit)} size={'large'}>
                        <Segment stacked>
                            {_.map(FIELDS, ({name,render,validate,normalize},index) => {
                                return <Field key={index} name={name} component={render} validate={validate} normalize={normalize} />;
                            })}
                            <Button type={'submit'} color={'facebook'} fluid size={'large'} >Login</Button>
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


export default connect(null, {login})(form);

