import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    user_id: '', // initialize as empty
    name: '',
    condition: 'New',
    price: '',
    image: null
  });

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      setFormData(prev => ({ ...prev, user_id: userId }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.user_id) {
      alert('User not logged in!');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post('http://localhost:8000/add-product/', data);
      alert('Product added!');
    } catch (err) {
      console.error('Upload error:', err.response || err.message);
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" type="text" placeholder="Product Name" onChange={handleChange} required /><br />
      <select name="condition" onChange={handleChange} required>
        <option value="New">New</option>
        <option value="Used">Used</option>
      </select><br />
      <input name="price" type="number" placeholder="Price" onChange={handleChange} required /><br />
      <input name="image" type="file" onChange={handleFileChange} required /><br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProductForm;
