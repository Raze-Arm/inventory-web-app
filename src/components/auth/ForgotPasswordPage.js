import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import  _ from 'lodash';
import {Dimmer, Form, Header, Icon, Image, Input, Label, Loader} from "semantic-ui-react";
import forgotPwImg from "../../images/forgot-password.jpg";
import {Field, reduxForm} from "redux-form";
import {Link} from "react-router-dom";
import * as validator from "../../utility/formValidators";

import {forgotPasswordRequest} from "../../actions/auth";
import history from "../../history";
import {convertToPersianNumber} from "../../utility/numberConverter";

const FIELDS = {
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
    email: {
        name: 'email',
        render({input , meta}) {
            const hasError = !!(meta.error && meta.touched);
            return (
                <Form.Field    control={Input }{...input}   icon={'mail'} iconPosition={'left'} label={'ایمیل'} placeholder={'ایمیل'} error={hasError ? meta.error : null} />
            );
        },
        validate: [
            validator.required,
            validator.email,
            validator.minLength(4),
            validator.maxLength(30)
        ]
    }
}



const ForgotPassword =  ({handleSubmit, forgotPasswordRequest}) => {
    const [loading, setLoading] = useState(false);


    const onSubmit = ({username, email}) => {
        console.log('form values', username, email)
        forgotPasswordRequest({username, email});
        setLoading(true);
    }
    return (
        <React.Fragment>
            {loading ? <Dimmer   active inverted ><Loader  /></Dimmer> : ''}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Image src={forgotPwImg} size={"small"}  style={{margin: 'auto'}}/>
                <Header textAlign={"center"} style={{margin: 0, padding: 0}}>رمز عبور را فراموش کرده اید</Header>
                <div  style={{fontSize: 'x-small' , fontWeight: 'lighter', textAlign: 'center'}}>نام کاربری و ایمیل خود را وارد کنید و ما برای بازنشانی گذرواژه شما ایمیل با کد امنیتی ارسال خواهیم کرد</div>
                {_.map(FIELDS, ({name,render,validate,normalize}, i) =>
                    (<Field key={i} name={name} component={render}  validate={validate} normalize={normalize} />)
                )}


                <Form.Button style={{marginTop: '8px'}} fluid color={"green"}>ارسال</Form.Button>

                <Link to={'/login'}  ><div style={{textAlign: 'center'}} >بازگشت به صفحه ورود <Icon size={"small"} name={'chevron left'} /></div></Link>
            </Form>
        </React.Fragment>
    );
}

const forgotPasswordForm = reduxForm({
    form: 'forgotpassword',
    destroyOnUnmount: true,
})(ForgotPassword);



export default connect(null, {forgotPasswordRequest})(forgotPasswordForm)