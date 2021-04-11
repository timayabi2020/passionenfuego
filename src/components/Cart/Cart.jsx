/* eslint-disable */ 
import React from 'react';
import { Container,Typography,Grid, Button } from '@material-ui/core';
import useStyles from './styles';
import CartItem from './CartItem/CartItem';
import { Link, useLocation } from 'react-router-dom';
const Cart = ({ cart,handleUpdateCartQty,removeFromCart,handleEmptyCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant="subtitle1">You have no items in your shopping cart.
        <Link to='/shop' className={classes.link}> Start adding some!</Link>
        </Typography>
    );
    const FilledCart =() =>(
        <React.Fragment>
        <Grid container spacing={3}>
            {cart.line_items.map((item) => (
                <Grid item xs={12} sm={4} key={item.id}>
                    <CartItem item={item} onUpdateCardQty={handleUpdateCartQty} onRemoveFromCart={removeFromCart}/>
                </Grid>
            ))}
        </Grid>
        <div className={classes.cardDetails}>
            <Typography variant="h4">
                Subtotal: { cart.subtotal.formatted_with_symbol}
            </Typography>
            <div>
                <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={handleEmptyCart}>Empty Cart</Button>
                <Button component={Link} to='/checkout' className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
            </div>
        </div>
        </React.Fragment>
       
    );
    if(!cart.line_items) return 'Loading....'
    return (
        <Container>
            <div className={classes.toolBar}/>
            <Typography className={classes.title} variant="h3" gutterBottom>Your shopping cart</Typography>
            { !cart.line_items.length ? <EmptyCart/>: <FilledCart/>}
        </Container>
    )
}

export default Cart
