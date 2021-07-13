import React from 'react';


import { useParams} from 'react-router-dom';

import {Container, Grid, Segment} from "semantic-ui-react";

import './PasswordRecoveryPage.css';


import { reduxForm} from "redux-form";
import ForgotPasswordPage from "./ForgotPasswordPage";
import SuccessPage from "./SuccessPage";



const PasswordRecovery = () => {


    const {success} = useParams();
    console.log('#SUCCESS###', success)




    return (
     <div id={'page'}>
         <div id={'blue_segment'} />
         <Container style={{marginTop: '10%',}}>

             <Grid centered padded className="aligned"  verticalAlign={"middle"} >
                 <Grid.Row >
                     <Grid.Column mobile={16} tablet={10} computer={6}>
                         <Segment>
                             {!success ? <ForgotPasswordPage /> : <SuccessPage /> }

                         </Segment>
                     </Grid.Column>
                 </Grid.Row>
             </Grid>
         </Container>
     </div>
    );
}




const form = reduxForm({
    form: 'passwordrecovery',
    destroyOnUnmount: true,
})(PasswordRecovery);

export default form;