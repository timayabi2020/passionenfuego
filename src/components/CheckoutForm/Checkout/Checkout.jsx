/* eslint-disable */ 
import React, { useState,useEffect } from 'react';
import { CssBaseline,Paper, Stepper, Step,StepLabel, Typography, CircularProgress, Divider, Button} from '@material-ui/core';
import { commerce } from '../../../lib/commerce';
import { Link, useHistory } from 'react-router-dom';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
const steps = ['Shipping address','Payment details'];
import useStyles from './styles';
const Checkout = ({cart,order,onCaptureCheckout,error}) => {
    console.log("Error log ", error);
    const [activeStep, setActiveStep]=useState(0);
    const [checkoutToken, setCheckOutToken] = useState(null);
    const [shippingData,setShippingData] = useState({});
    const classes = useStyles();
    const history = useHistory();
    useEffect(()=>{
        const generateToken = async()=>{
            try{
                const token = await commerce.checkout.generateToken(cart.id,{ type: 'cart'});
                console.log('Token ',token);
                setCheckOutToken(token);
            }catch(error){
                if (activeStep !== steps.length) history.push('/');
            }
        }
        generateToken();
    },[cart]);
    const nextStep =()=>setActiveStep((previousActiveStep)=>previousActiveStep+1);
    const backStep =()=>setActiveStep((previousActiveStep)=>previousActiveStep-1);
    const next = (data)=>{
        setShippingData(data);
        nextStep();
    }

    let Confirmation = () => (order.customer ? (
        <React.Fragment>
          <div>
            <Typography variant="h5">Thank you for your purchase, {order.customer.firstname} {order.customer.lastname}!</Typography>
            <Divider className={classes.divider} />
            <Typography variant="subtitle2">Order ref: {order.customer_reference}</Typography>
          </div>
          <br />
          <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
        </React.Fragment>
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      ));
    
      if (error) {
        Confirmation = () => (
          <React.Fragment>
            <Typography variant="h5">Error: {error}</Typography>
            <br />
            <Button component={Link} variant="outlined" type="button" to="/">Back to home</Button>
          </React.Fragment>
        );
      }

    const Form = () => activeStep === 0
    ? <AddressForm checkoutToken={checkoutToken} next={next}/>
    :<PaymentForm shippingData={shippingData} checkoutToken = {checkoutToken} nextStep={nextStep} backStep={backStep} onCaptureCheckout={onCaptureCheckout} />
    return (
        <React.Fragment>
             <CssBaseline />
            <div className={classes.toolbar}/>
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant="h4" align="center">Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map((step)=>(
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation />: checkoutToken && <Form />}
                </Paper>
            </main>
        </React.Fragment>
    )
}

export default Checkout
