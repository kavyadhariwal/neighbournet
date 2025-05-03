import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedCondition, setUpdatedCondition] = useState('new');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedImage, setUpdatedImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Please log in to view your profile.');
      return;
    }

    fetch('http://localhost:8000/api/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error('Unauthorized');
        return response.json();
      })
      .then(data => {
        setProfile(data);
      })
      .catch(err => {
        setError('Failed to fetch profile.');
      });
  }, []);

  const handleDeleteProduct = (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setMessage('You need to be logged in to delete products.');
      return;
    }

    fetch(`http://localhost:8000/api/products/${productId}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) throw new Error('Error deleting product.');
        setMessage('Product deleted successfully!');
        setProfile(prevState => ({
          ...prevState,
          products: prevState.products.filter(product => product.id !== productId),
        }));
      })
      .catch(error => {
        setMessage('Error deleting product.');
      });
  };

  const handleUpdateProduct = (productId) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('name', updatedName);
    formData.append('condition', updatedCondition);
    formData.append('price', updatedPrice);
    if (updatedImage) formData.append('image', updatedImage);

    fetch(`http://localhost:8000/api/products/${productId}/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${token}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          setMessage('Product updated successfully!');
          setProfile(prevState => ({
            ...prevState,
            products: prevState.products.map(product =>
              product.id === productId
                ? { ...product, name: updatedName, condition: updatedCondition, price: updatedPrice, image: data.image || product.image }
                : product
            ),
          }));
          setSelectedProduct(null);
        } else {
          setMessage('Updated successfully.');
        }
      });
  };

  const handleImageChange = (e) => {
    setUpdatedImage(e.target.files[0]);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setUpdatedName(product.name);
    setUpdatedCondition(product.condition);
    setUpdatedPrice(product.price);
    setUpdatedImage(null);
  };

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>User ID:</strong> {profile.id}</p>

      <h3>Uploaded Products</h3>
      {message && <p>{message}</p>}

      {selectedProduct && (
        <div className="update-form">
          <h4>Update Product</h4>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProduct(selectedProduct.id);
          }}>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Product Name"
              required
            />
            <select
              value={updatedCondition}
              onChange={(e) => setUpdatedCondition(e.target.value)}
              required
            >
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
            <input
              type="number"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
              placeholder="Price"
              required
            />
            <input
              type="file"
              onChange={handleImageChange}
            />
            <button type="submit">Update Product</button>
            <button type="button" onClick={() => setSelectedProduct(null)}>Cancel</button>
          </form>
        </div>
      )}

      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Price</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profile.products.length === 0 ? (
            <tr><td colSpan="5">No products uploaded</td></tr>
          ) : (
            profile.products.map((product) => {
              const imageUrl = product.image ? `http://localhost:8000${product.image}` : null;
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.condition}</td>
                  <td>{product.price}</td>
                  <td>
                    {imageUrl ? <img src={imageUrl} alt={product.name} width="100" /> : 'No Image'}
                  </td>
                  <td>
                    <button onClick={() => handleProductClick(product)}>Update</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
