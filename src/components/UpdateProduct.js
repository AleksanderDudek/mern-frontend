import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productCompany, setProductCompany] = useState("");

  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getProduct(params.id);
  }, []);

  const getProduct = async (_id) => {
    let result = await fetch(`http://localhost:5005/get-product/${_id}`);
    result = await result.json();
    console.warn(result);
    setProductName(result.name);
    setProductPrice(result.price);
    setProductCategory(result.category);
    setProductCompany(result.company);
  };

  const updateProduct = async () => {
    if (!productName || !productPrice || !productCategory || !productCompany) {
      setError(true);
      return false;
    }

    console.warn(productName, productPrice, productCategory, productCompany);

    const userId = localStorage.getItem("user")._id;

    let result = await fetch(
      `http://localhost:5005/update-product/${params.id}`,
      {
        method: "put",
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
      }
    );
    console.log(result);
    navigate("/");
  };
  return (
    <div>
      <h1>Update Product</h1>
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
      <button className="app-button" type="button" onClick={updateProduct}>
        Update product
      </button>
    </div>
  );
};

export default UpdateProduct;
