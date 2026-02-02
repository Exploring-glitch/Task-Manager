import React, { useState } from 'react'
import AuthLayout from '../../components/layout/AuthLayout.jsx'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  //handle login form submit
  const handleLogin = async(e) => {
    e.preventDefault();
  }

  return (
    <AuthLayout>
      
      <div>
        <h2>Welcome Back</h2>
        <h1>Please enter your details to Log in </h1>
      </div>


    </AuthLayout>
  )
}

export default Login