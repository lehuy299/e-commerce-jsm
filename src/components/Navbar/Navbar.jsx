import { ShoppingCart } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography, Badge, Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/commerce.png';

const drawerWidth = 0;

const Navbar = ({ total_items }) => {

    return (
        <>
            <AppBar 
                position='fixed' 
                sx={(theme) => ({
                    boxShadow: 'none',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                    [theme.breakpoints.up('sm')]: {
                      width: `calc(100% - ${drawerWidth}px)`,
                      marginLeft: drawerWidth,
                    },
                })}
                color='inherit'
            >
                <Toolbar>
                    <Typography variant='h6' color='inherit'
                        sx={{
                            flexGrow: 1,
                            alignItems: 'center',
                            display: 'flex',
                            textDecoration: 'none'
                        }}
                    >
                        <Box component='img' src={logo} alt='Commerce.js' height='25px' 
                            sx={{
                                marginRight: '10px'
                            }}
                        />
                        Commerce.js
                    </Typography>
                    <Box sx={{
                            flexGrow: 1
                        }} 
                    />
                    <div>
                        <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                            <Badge badgeContent={total_items} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;