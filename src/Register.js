import { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from './api';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/register', form);
      alert('User registered. You can now log in.');
      navigate("/login");
      // if (existingUser) {
      //   navigate("/login");
      // }
    } catch (err) {
      console.error(err); // 👈 Add this for debug
      alert(err.response.data.message || 'Error during registration');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-2">
      <h2 className="text-xl font-bold">Register</h2>
      <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">Register</button>
    </form>
  );
}

export default Register;
