import React from "react";
import _ from "lodash";
import {Field, Form, reduxForm} from "redux-form";

import * as validator from '../../utility/formValidators';
import {Button, Container, FormField, Grid, Header, Input, Segment} from "semantic-ui-react";

const FIELDS = {
    firstName: {
        name: 'firstName',
        render({input, meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input } required {...input} fluid icon={'user'} iconPosition={'left'} placeholder={'first name'} label={'First Name'} error={hasError ? meta.error : null}  />
            );
        },
        validate: [
            validator.required,
            validator.minLength(3),
            validator.maxLength(15),
        ]
    },
    lastName: {
        name: 'lastName',
        render({input, meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input }  required {...input} fluid  iconPosition={'left'} placeholder={'last name'}  label={'Last Name'} error={hasError ? meta.error : null} />
            );
        },
        validate: [
            validator.required,
            validator.minLength(3),
            validator.maxLength(15),
        ]
    },
    password: {
        name: 'password',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input }   {...input} fluid icon={'lock'} iconPosition={'left'} placeholder={'password'} label={'Password'} type={'password'} error={hasError ? meta.error : null} />
            );
        },
        validate: [
            validator.minLength(4),
            validator.maxLength(25)
        ]
    }
}


const ProfileUpdateForm  = (props) => {


    // const onSubmit = event => {
    //     event.preventDefault();
    //     console.log(props);
    // }


    return (
        <Container>
            <Form className={'ui form error'} onSubmit={props.handleSubmit}>
                {_.map(FIELDS, ({name ,render ,validate}) => {
                    return (
                        <Field key={name} name={name} component={render} validate={validate}/>
                    );
                })}
                <Button primary  type={'submit'}  style={{marginTop: '1rem'}}>Update</Button>
            </Form>
        </Container>
    );
}

const form = reduxForm({
    form: 'profileForm',
    enableReinitialize: true,
    destroyOnUnmount: true,
})(ProfileUpdateForm);

export default form;