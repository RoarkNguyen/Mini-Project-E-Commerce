import React from "react";
import PropTypes from "prop-types";
import useStyles from "./styles";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import CartItem from "./CartItem/CartItem";
import { Link } from "react-router-dom";

Cart.propTypes = {};

function Cart(props) {
  const {
    cart,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart,
  } = props;

  const classes = useStyles();

  // const isEmpty = true;
  const EmptyCart = () => (
    <Typography variant="subtitle1">
      You have no items in your shopping cart,
      <Link to="/">start adding some!</Link>
    </Typography>
  );
  const FilledCart = () => (
    <div>
      <Grid container spacing={3}>
        {cart.line_items.map((item) => (
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem
              item={item}
              onUpdateCartQty={handleUpdateCartQty}
              onRemoveFromCart={handleRemoveFromCart}
            ></CartItem>
          </Grid>
        ))}
      </Grid>
      <div>File cart !!</div>
      <div className={classes.cardDetails}>
        <Typography variant="h4">
          Subtotal: {cart.subtotal.formatted}
        </Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size="large"
            type="button"
            variant="contained"
            color="secondary"
            onClick={handleEmptyCart}
          >
            Empty Card
          </Button>
          <Button
            component={Link}
            to="/checkout"
            className={classes.checkoutButton}
            size="large"
            type="button"
            variant="contained"
            color="primary"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
  if (!cart.line_items) return "Loading....";
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h3" gutterBottom>
        Your Shopping Cart
      </Typography>
      {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
    </Container>
  );
}

export default Cart;
