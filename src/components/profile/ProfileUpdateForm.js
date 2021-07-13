import React from "react";
import _ from "lodash";
import {Field, Form, reduxForm} from "redux-form";

import * as validator from '../../utility/formValidators';
import {Button, Container, FormField,  Input} from "semantic-ui-react";
import ImageInput from "../inputs/ImageInput";
import PasswordStrengthBar from "react-password-strength-bar";
import PasswordInput from "../inputs/PasswordInput";

const FIELDS = {
    photo: {
        name: 'photo',
        render({input, meta, initialValues, ...props}) {
            return (
                <ImageInput input={input}  imageAvailable={initialValues?.imageAvailable} username={initialValues?.username} {...props} />
            );
        }
    },
    firstName: {
        name: 'firstName',
        render({input, meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input } required {...input} fluid icon={'user'} iconPosition={'left'} placeholder={'نام'} label={'نام'} error={hasError ? meta.error : null}  />
            );
        },
        validate: [
            validator.required,
            validator.minLength(3),
            validator.maxLength(30),
        ]
    },
    lastName: {
        name: 'lastName',
        render({input, meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input }  required {...input} fluid  iconPosition={'left'} placeholder={'نام خانوادگی'}  label={'نام خانوادگی'} error={hasError ? meta.error : null} />
            );
        },
        validate: [
            validator.required,
            validator.minLength(3),
            validator.maxLength(30),
        ]
    },
    email: {
        name: 'email',
        render({input, meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input } required {...input} fluid icon={'mail'} iconPosition={'left'} placeholder={'ایمیل'} label={'ایمیل'} error={hasError ? meta.error : null}  />
            );
        },
        validate: [
            validator.required,
            validator.email,
            validator.minLength(3),
            validator.maxLength(30),
        ]
    },
    password: {
        name: 'password',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <React.Fragment>
                    <PasswordInput {...input}  error={hasError ? meta.error : null}/>
                    <PasswordStrengthBar password={input.value} style={{width: '300px'}} />
                </React.Fragment>

            );
        },
        validate: [
            validator.minLength(4),
            validator.maxLength(30)
        ]
    },
    confirmPassword: {
        name: 'confirmPassword',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <React.Fragment>
                    <FormField control={Input}   {...input} fluid  iconPosition={'left'} placeholder={'تکرار رمز عبور'} label={'تکرار رمز عبور'} type={'password'} error={hasError ? meta.error : null} />
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
                        <Field key={name} name={name} component={render} validate={validate} initialValues={props.initialValues}/>
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
            throw {password: 'رمز عبور مطابقت ندارد', confirmPassword: true};
        }

        if(values?.password && values.password.length > 0 &&  values?.confirmPassword?.length === 0) throw { confirmPassword: 'لطفاً دوباره رمز ورود را وارد کنید'};
    })

}

const form = reduxForm({
    form: 'profileForm',
    asyncValidate,
    enableReinitialize: true,
    destroyOnUnmount: true,
})(ProfileUpdateForm);

export default form;