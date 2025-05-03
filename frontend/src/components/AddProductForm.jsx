import React, { useState } from 'react';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('user_id');

    if (!token || !userId) {
      setMessage('You must be logged in to add a product.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('condition', condition);
    formData.append('price', price);
    formData.append('image', image);
    formData.append('user_id', userId);

    try {
      const response = await fetch('http://localhost:8000/api/add-product/', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Product added successfully!');
        setName('');
        setCondition('');
        setPrice('');
        setImage(null);
      } else {
        setMessage(`Error adding product: ${data.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong while adding the product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product name"
        required
      /><br />
      
      <select
        value={condition}
        onChange={(e) => setCondition(e.target.value)}
        required
      >
        <option value="">Select condition</option>
        <option value="new">New</option>
        <option value="used">Used</option>
      </select><br />
      
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
        required
      /><br />
      
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      /><br />
      
      <button type="submit">Add Product</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default AddProductForm;
