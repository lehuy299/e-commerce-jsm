import { List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'

const Review = ({ checkoutToken }) => {
  console.log('checkoutToken', checkoutToken);
  return (
    <>
      <Typography variant='h6' gutterBottom>Order summary</Typography>
      <List disablePadding>
        {checkoutToken.line_items.map((product) => (
          <ListItem sx={{ padding: '10px 0' }} key={product.name}>
            <ListItemText primary={product.name} secondary={`Quantity ${product.quantity}`} />
            <Typography variant='body2'>{product.line_total.formatted_with_symbol}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ padding: '10px 0' }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' sx={{ fontWeight: '700' }}>
            {checkoutToken.subtotal.formatted_with_symbol}
          </Typography>
        </ListItem>
      </List>
    </>
  )
}

export default Review