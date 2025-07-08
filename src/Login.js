import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from './api';


function Login() {
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending login request with:", form);
      const res = await api.post('/api/login', form);
      localStorage.setItem('token', res.data.token); // Save token
      alert('Login successful!');
      navigate("/");
    } catch (err) {
      console.error(err); // 👈 Add this for debug
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <h2 className="text-xl font-bold">Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
    </form>
  );
}

export default Login;
