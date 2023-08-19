import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SingleProduct(props) {
  const [product, setProduct] = useState({}); //server output
  const [name, setName] = useState(""); //user input 
  const [price, setPrice] = useState(1); //user input
  const [error, setError] = useState(null);

  const getProduct = async () => { //get server data
    let response = await axios.get(
      `${process.env.REACT_APP_API_SERVER}/products/${props.id}`
    );
    setProduct(response.data); //set the response
  };

  const updateProduct = async (name, price) => { //updating product
    try
    {
    let upProduct = { //variable to be updated based on new inputs
      name,
      price,
    };
    let response = await axios.put(
      `${process.env.REACT_APP_API_SERVER}/products/${props.id}`,
      upProduct
    );
    setProduct(response.data); //update the product details (from server)
    }
    catch (error) {
      if (error.response) {
        setError('Error updating product: ' + error.response.data.error);
        console.error('PUT request error:', error.response.data);
      } else {
        setError('An error occurred while updating the product.');
        console.error('PUT request error:', error.message);
  };
}
  }

  //generic function
  const update = () => {
    updateProduct(name, price); //runs this function
    setName(""); //resets the sheet
    setPrice(""); //resets the sheet
  };


  useEffect(() => { //run once to get product details
    getProduct();
  }, []);

  return (
    <>
      <div>
      <h1>Single</h1>
      <h2>{product.name}</h2>
      <h3>{product.price}</h3>
      <h3>Add Product Form</h3>
      <label>Product Name:</label>
      <br />
      <input
        type="text"
        value={name}
        placeholder={product.name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <label>Product Price:</label>
      <br />
      <input
        type="number"
        onChange={(e) => setPrice(e.target.value)}
        placeholder={product.price}
        value={price}
      />
      <br />
      <button onClick={update}>Update Product</button>
      <button onClick={() => props.toggle(product)}>Go Back</button>
    </div>
    </>
  );
}
