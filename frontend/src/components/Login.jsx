import React from 'react'

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
    <div>
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
    </div>
  )
}

export default Login