import { Box, Grid } from '@mui/material';
import React from 'react';
import Product from './Product/Product';

const Products = ({ products, onAddToCart }) => {
    return (
        <Box sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        })}>
            <Box 
                sx={(theme) => ({
                    ...theme.mixins.toolbar
                })} 
            />
            <Grid container justifyContent='center' spacing={4}>
                {products.length && products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid >
                ))}
            </Grid>
        </Box>
    );
};

export default Products;
