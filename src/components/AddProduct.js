import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCompany, setProductCompany] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const addProduct = async () => {
    if (!productName || !productPrice || !productCategory || !productCompany) {
      setError(true);
      return false;
    }

    console.warn(productName, productPrice, productCategory, productCompany);

    const userId = localStorage.getItem("user")._id;

    let result = await fetch("http://localhost:5005/add-product", {
      method: "post",
      body: JSON.stringify({
        name: productName,
        price: productPrice,
        category: productCategory,
        company: productCompany,
        userId: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    navigate("/");
  };
  return (
    <div>
      <h1>Add Product</h1>
      <input
        className="input-box"
        type="text"
        placeholder="Enter product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      {error && !productName && (
        <span className="invalid-input">Enter valid name</span>
      )}
      <input
        className="input-box"
        type="text"
        placeholder="Enter product price"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />
      {error && !productPrice && (
        <span className="invalid-input">Enter valid price</span>
      )}

      <input
        className="input-box"
        type="text"
        placeholder="Enter product category"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
      />
      {error && !productCategory && (
        <span className="invalid-input">Enter valid category</span>
      )}
      <input
        className="input-box"
        type="text"
        placeholder="Enter product company"
        value={productCompany}
        onChange={(e) => setProductCompany(e.target.value)}
      />
      {error && !productCompany && (
        <span className="invalid-input">Enter valid company</span>
      )}
      <button className="app-button" type="button" onClick={addProduct}>
        Add product
      </button>
    </div>
  );
};

export default AddProduct;
