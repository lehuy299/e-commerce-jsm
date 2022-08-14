import { Container, Typography, Grid, Button, Box } from '@mui/material';
import React from 'react';
import CartItem from './CartItem/CartItem';
import { Link } from "react-router-dom";

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {

    const EmptyCart = () => {
        return (
            <Typography variant='subtitle1'>You have no items in your shopping cart, 
                <Link to='/'>start adding some</Link>
            </Typography>
        );
    };
    const FiltedCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    { cart.line_items?.map((item) => (
                        <Grid item xs={12} sm={4} key={item.id}>
                            <CartItem 
                                item={item} 
                                handleUpdateCartQty={handleUpdateCartQty} 
                                handleRemoveFromCart={handleRemoveFromCart}
                            />
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{
                        display: 'flex',
                        marginTop: '10%',
                        width: '100%',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant='h4'>Subtotal: {cart.subtotal.formatted_with_symbol}</Typography>
                    <div>
                        <Button 
                            sx={theme => ({
                                minWidth: '150px',
                                [theme.breakpoints.down('xs')]: {
                                    marginBottom: '5px',
                                },
                                [theme.breakpoints.up('xs')]: {
                                    marginRight: '20px',
                                },
                            })}
                            onClick={handleEmptyCart}
                            size='large' type='button' variant='contained' color='secondary'>Empty Cart</Button>
                        <Button component={Link} to='/checkout' size='large' type='button' variant='contained' color='primary'>Checkout</Button>
                    </div>
                </Box>
            </>
        );
    };

    if (!cart.line_items) {
        return 'Loading...';
    }

    return (
        <Container>
            <Box sx={theme => ({
                    ...theme.mixins.toolbar
                })}
            />
            <Typography 
                sx={{
                    marginTop: '5%'
                }}
                variant='h3' gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart/> : <FiltedCart/>}
        </Container>
    );
};

export default Cart;