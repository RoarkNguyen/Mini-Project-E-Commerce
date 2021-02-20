import React, { useEffect, useState } from "react";
import { Navbar, Products } from "./componets";
import { commerce } from "./lib/commerce";
function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  console.log("products ne", products);
  return (
    <div className="app">
      <Navbar />
      <Products products={products} />
    </div>
  );
}

export default App;
