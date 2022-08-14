import { Button, Divider, Typography } from '@mui/material';
import { CardElement, Elements, ElementsConsumer, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import Review from './Review';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ checkoutToken, backStep, shipping_data, onCaptureCheckout, nextStep }) => {

  const handleSubmit = async (e, stripe, elements) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card: cardElement });
    if (error) {
      console.log(error);
    } else {
      const order_data = {
        line_items: checkoutToken.line_items,
        customer: { 
          firstname: shipping_data.firstName,
          lastname: shipping_data.lastName,
          email: shipping_data.email
        },
        shipping: {
          name: 'Primary',
          street: shipping_data.address1,
          town_city: shipping_data.city,
          county_state: shipping_data.shippingSubdivision,
          postal_zip_code: shipping_data.zip,
          country: shipping_data.shippingCountry
        },
        fulfillment: { shipping_method: shipping_data.shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id
          }
        }
      }
      onCaptureCheckout(checkoutToken.id, order_data);
      nextStep();
    }

  };

  return (
    <div>
      <Review checkoutToken={checkoutToken}/>
      <Divider/>
      <Typography variant='h6' gutterBottom sx={{ margin: '10px 0' }}>Payment method</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ stripe, elements }) => (
            <form onSubmit={(e) => handleSubmit(e, stripe, elements)}>
              <CardElement />
              <br/><br/>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='outlined' onClick={backStep}>Back</Button>
                <Button variant='contained' color='primary' disabled={!stripe} type='submit'>
                  Pay { checkoutToken.subtotal.formatted_with_symbol }
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  );
};

export default PaymentForm;