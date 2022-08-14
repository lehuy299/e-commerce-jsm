import { Paper, Box, Typography, Stepper, Step, StepLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { commerce } from '../../../lib/commerce';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ order, onCaptureCheckout, error, cart }) => {
  const [active_step, setActiveStep] = useState(0);
  const [checkoutToken, setCheckoutToken] = useState(null);
  const [shipping_data, setShippingData] = useState(null);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
        console.log('token', token);
        setCheckoutToken(token);
      } catch (error) {
        console.log(error);
      }
    };
    generateToken();
  }, [cart]);

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  const Form = () => active_step === 0 ? <AddressForm next={next} checkoutToken={checkoutToken}/> : <PaymentForm onCaptureCheckout={onCaptureCheckout} checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep}/>;

  const Confirmation = () => (
    <div>
      Confirmation
    </div>
  );

  return (
    <>
      <Box sx={theme => ({
        ...theme.mixins.toolbar
      })}
      />
      <Box sx={theme => ({
        marginTop: '5%',
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600)]: {
          width: 600,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      })}
      >
        <Paper sx={theme => ({
          marginTop: theme.spacing(3),
          marginBottom: theme.spacing(3),
          padding: theme.spacing(2),
          [theme.breakpoints.down('xs')]: {
            width: '100%',
            marginTop: 60,
          },
          [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
          },
        })}
        >
          <Typography variant='h4' align='center'>Checkout</Typography>
          <Stepper 
            activeStep={active_step} 
            sx={theme => ({
              padding: theme.spacing(3, 0, 5)
            })}
          >
            {steps.map((step) => (
              <Step>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {active_step === steps.length ? <Confirmation/> : checkoutToken && <Form/>}
        </Paper>
      </Box>

    </>
  );
};

export default Checkout;