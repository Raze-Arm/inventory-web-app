import React  from "react";
import _ from "lodash";
import {Field, Form, reduxForm} from "redux-form";
import * as validator from '../../utility/formValidators';
import {Button, Container, FormField, Input, Grid} from "semantic-ui-react";
import ImageInput from "../inputs/ImageInput";

import  './UserForm.css';
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
        ],

    },
    username: {
        name: 'username',
        render({input, meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <FormField control={Input } required {...input} fluid icon={'user circle'} iconPosition={'left'} placeholder={'نام کاربری'} label={'نام کاربری'} error={hasError ? meta.error : null}  />
            );
        },
        validate: [
            validator.required,
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
                    <FormField control={Input}   {...input} fluid icon={'lock'} iconPosition={'left'} placeholder={'رمز عبور'} label={'رمز عبور'} type={'password'} error={hasError ? meta.error : null} />
                    <PasswordStrengthBar password={input.value} style={{width: '300px'}} />
                </React.Fragment>

             );
        },
        validate: [
            validator.minLength(8),
            validator.maxLength(35)
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
    role: {
        name: 'role',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);

            if(!input.value)input.onChange('BASIC');
            return (
                <React.Fragment>
                    <select  className={`ui field selection  dropdown item ${hasError}`} {...input}>
                        <option value={'BASIC'}>ساده</option>
                        <option value={'USER'}>کاربر</option>
                        <option value={'ADMIN'}>ادمین</option>
                    </select>
                    {hasError ? <div className="ui pointing red basic label">{meta.error}</div> : null}
                </React.Fragment>
            );
        },
        validate: [
            validator.required,
        ]
    }
}


const UserUpdateForm = (props) => {

    return (
        <Container>
            <Grid textAlign={'center'}   >
               <Grid.Column style={{maxWidth: '700px'}}>
                   <Form className={'ui form error'} onSubmit={props.handleSubmit}>
                       {_.map(FIELDS, ({name ,render ,validate}) => {
                           return (
                               <Field key={name} name={name} component={render}   validate={validate}/>
                           );
                       })}
                       <Button primary  type={'submit'}  style={{marginTop: '1rem'}}>{props.type || 'Save'}</Button>
                   </Form>
               </Grid.Column>
           </Grid>
        </Container>
    );
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
    return  sleep(0).then(async ()  => {

                // if(values?.password && values?.confirmPassword &&  values?.password !== values?.confirmPassword ) {
                //     await sleep(2000);
                //     throw {password: 'Password Doesnt Match', confirmPassword: true};
                // }
                if(values?.password &&  values?.confirmPassword?.length === 0) throw { confirmPassword: 'لطفاً دوباره رمز ورود را وارد کنید'};
    })

}


const form = reduxForm({
    form: 'userForm',
    enableReinitialize: true,
    asyncValidate,
    destroyOnUnmount: true
})(UserUpdateForm);


export default form;