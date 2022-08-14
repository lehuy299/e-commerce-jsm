import { Button, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';
import FormInput from './FormInput';

const AddressForm = ({ checkoutToken, next }) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();
  const options = shippingOptions.map(option => ({ id: option.id, label: `${option.description} - ${option.price.formatted_with_symbol}` }))

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (country_code) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(country_code);
    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region });
    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) {
      fetchSubdivisions(shippingCountry);
    }
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) {
      fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({ ...data, shippingCountry, shippingSubdivision, setShippingOption }))}>
          <Grid container spacing={3}>
            <FormInput required name='firstName' label='First name' />
            <FormInput required name='lastName' label='Last name' />
            <FormInput required name='address1' label='Address' />
            <FormInput required name='email' label='Email' />
            <FormInput required name='city' label='City' />
            <FormInput required name='zip' label='ZIP / Postal code' />
            
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select value={shippingCountry} onChange={(e) => setShippingCountry(e.target.value)} fullWidth>
                {Object.entries(shippingCountries).map(([id, label]) => {
                  return <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>;
                })}
                
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivisions</InputLabel>
              <Select value={shippingSubdivision} onChange={(e) => setShippingSubdivision(e.target.value)} fullWidth>
                {Object.entries(shippingSubdivisions).map(([id, label]) => {
                  return <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>;
                })}
                
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select value={shippingOption} onChange={(e) => setShippingOption(e.target.value)} fullWidth>
                {options.map(({id, label}) => {
                  return <MenuItem key={id} value={id}>
                    {label}
                  </MenuItem>;
                })}
                
              </Select>
            </Grid>
          </Grid>
          <br />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
            <Button type='submit' variant='contained' color='primary'>Next</Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;