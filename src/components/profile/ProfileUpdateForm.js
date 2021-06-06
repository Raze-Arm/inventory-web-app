import React from "react";
import _ from "lodash";
import {Field, Form, reduxForm} from "redux-form";

import * as validator from '../../utility/formValidators';
import {Button, Container, FormField,  Input} from "semantic-ui-react";
import ImageInput from "../inputs/ImageInput";
import PasswordStrengthBar from "react-password-strength-bar";

const FIELDS = {
    photo: {
        name: 'photo',
        render({input, meta}) {
            return (
                <ImageInput input={input} />
            );
        }
    },
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
                <React.Fragment>
                    <FormField control={Input}   {...input} fluid icon={'lock'} iconPosition={'left'} placeholder={'Password'} label={'Password'} type={'password'} error={hasError ? meta.error : null} />
                    <PasswordStrengthBar password={input.value} style={{width: '300px'}} />
                </React.Fragment>

            );
        },
        validate: [
            validator.minLength(4),
            validator.maxLength(25)
        ]
    },
    confirmPassword: {
        name: 'confirmPassword',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <React.Fragment>
                    <FormField control={Input}   {...input} fluid  iconPosition={'left'} placeholder={'Confirm Password'} label={'Confirm Password'} type={'password'} error={hasError ? meta.error : null} />
                </React.Fragment>

            );
        },
    },
}




const ProfileUpdateForm  = (props) => {




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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
    return  sleep(0).then(async ()  => {

        if(values?.password && values?.confirmPassword &&  values?.password !== values?.confirmPassword ) {
            await sleep(2000)
            throw {password: 'Password Doesnt Match', confirmPassword: true};
        }

        if(values?.password && values.password.length > 0 &&  values?.confirmPassword?.length === 0) throw { confirmPassword: 'Please enter the password again'};
    })

}

const form = reduxForm({
    form: 'profileForm',
    asyncValidate,
    enableReinitialize: true,
    destroyOnUnmount: true,
})(ProfileUpdateForm);

export default form;