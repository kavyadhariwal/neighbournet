// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Homepage from './pages/homepage';
import Landing from './pages/landing';
import ProductsPage from './pages/productsPage';
import ComplaintForm from './pages/Complaint_Form';
import About from './pages/About';
import Logout from './pages/Logout';
import Layout from './components/Layout'; 
import AuthorityDashboard from './pages/AuthorityDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/homepage" element={<Layout><Homepage /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/products" element={<Layout><ProductsPage /></Layout>} />
        <Route path="/complaint" element={<Layout><ComplaintForm /></Layout>} />
        <Route path="/about" element={<About />} />
        <Route path="/logout" element={<Layout><Logout /></Layout>} />
        <Route path="/authority-dashboard" element={<Layout><AuthorityDashboard /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
