import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5005/get-products");
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    console.log(id);
    let result = await fetch(`http://localhost:5005/delete-product/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    if (result) getProducts();
  };

  const onSearchChange = async (event) => {
    let key = event.target.value.toString();
    if (key) {
      if (key.length < 3) return;

      let result = await fetch(`http://localhost:5005/search-product/${key}`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });

      result = await result.json();

      console.log(result);
      // set products with the search result
      if (result) setProducts(result);
      // for the above it can be optimized with react-query as store for that data
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Product List</h3>
      <div className="product-search">
        <input
          type="text"
          className="product-search-input"
          placeholder="Search product by key..."
          onChange={onSearchChange}
        />
        <span className="product-search-helper">
          It is case sensitive. Enter at least 3 signs.
        </span>
      </div>
      <ul>
        <li>S. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Action</li>
      </ul>
      {products.map((item, index) => (
        <ul key={item._id}>
          <li>{index + 1}</li>
          <li>{item.name}</li>
          <li>{item.price}</li>
          <li>{item.category}</li>
          <li>
            <button
              onClick={() => {
                deleteProduct(item._id);
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                navigate(`/update/${item._id}`);
              }}
            >
              Update
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default ProductList;
