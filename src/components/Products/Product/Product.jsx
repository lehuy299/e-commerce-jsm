import { AddShoppingCart } from '@mui/icons-material'
import { Box, Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'

const Product = ({ product, onAddToCart }) => {

  return (
    <Card sx={{
      maxWidth: '100%'
    }}
    >
      <CardMedia
        sx={{
          height: 0,
          paddingTop: '56.25%'
        }}
        image={product.image.url}
        title={product.name}
      />
      <CardContent>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
        >
          <Typography variant='h5' gutterBottom>
            {product.name}
          </Typography>
          <Typography variant='h5'>
            {product.price.formatted_with_symbol}
          </Typography>
        </Box>

        <Typography dangerouslySetInnerHTML={{ __html: product.description }} variant='body2' color='text.secondary' />
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(product.id, 1)}>
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product