import React from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Product from "./Product/Product";
import useStyles from "./styles";

Products.propTypes = {};
// const products = [
//   {
//     id: 1,
//     name: "Shoes",
//     description: "Running shoes.",
//     price: "$5",
//     image: "https://picsum.photos/id/103/500/300",
//   },
//   {
//     id: 2,
//     name: "Macbook",
//     description: "Apple Macbook.",
//     price: "$10",
//     image: "https://picsum.photos/id/2/500/300",
//   },
// ];

function Products(props) {
  const { products, onAddToCart } = props;
  console.log("products ne ne:", products);
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <div className={classes.toolbar}></div>
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={products.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} onAddToCart={onAddToCart} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Products;
