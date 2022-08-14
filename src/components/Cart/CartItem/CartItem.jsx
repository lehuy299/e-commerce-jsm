import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
  return (
    <Card>
        <CardMedia
            sx={{
                height: 260
            }} 
            image={item.image.url} alt={item.name}  
        />
        <CardContent
            sx={{
                display: 'flex',
                justifyContent: 'space-between'
            }}
        >
            <Typography variant='h4'>{item.name}</Typography>
            <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
        </CardContent>
        <CardActions sx={{
            justifyContent: 'space-between'
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center'
                }}
            >
                <Button onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)} type='button' size='small'>-</Button>
                <Typography>{item.quantity}</Typography>
                <Button onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)} type='button' size='small'>+</Button>
            </Box>
            <Button onClick={() => handleRemoveFromCart(item.id)} type='button' color='error' variant='contained'>Remove</Button>
        </CardActions>
    </Card>
  );
};

export default CartItem;