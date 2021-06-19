import React, {useState} from "react";
import {FormField, Input} from "semantic-ui-react";



const PasswordInput = (props) => {
    const [isPw, setIsPW] = useState(true)
    return (
        <FormField control={Input} {...props} type={isPw ? 'password' : 'text'} fluid
                   icon={{name: isPw ? 'eye slash' : 'eye', link: true, onClick: () => setIsPW(!isPw)}}
                   iconPosition={'left'} placeholder={'رمز عبور'} label={'رمز عبور'}/>
    );
}



export default PasswordInput;