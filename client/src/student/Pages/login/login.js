import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import './login.css'
import PasswordInput from "../../Component/PasswordInput";


function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const[prevPageMsg ,setPrevPageMsg] = useState('')

  useEffect(() => {
    console.log(location.state, location);
    if(location.state && location.state.message){
      setPrevPageMsg(location.state.message)
    }
  }, [location]);

   const passwordStyle = {
    width:"300px",
    height:"44px"
   }

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:9002/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
        // Get the previous location from the location object
        const { state } = location;
       // Check if the previous location is in the list of exceptions
       const exceptions = ["/student/login", "/student/register" ,"/student/change_password"];
      if (data.status === 200) {
        localStorage.setItem("token", data.user);
        alert(`login successful`);
        if (!exceptions.includes(state.from) && state!==null) {
          navigate(-1)
        } else {
          window.location.href = '/student/home'
        }
      } else {
        setError(data.statusMsg);
      }
    } catch (e) {
      setError("Something went wrong");
    }
  };
  return (
    <div className="login-cn">
      <h3>{prevPageMsg}</h3>
      <h1>Login</h1>
      <form onSubmit={loginSubmitHandler} className="login-form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="abc@gmail.com"
        />
        <br />
        <PasswordInput value={password} handlePasswordChange={(e)=>setPassword(e.target.value)} placeholder='Password' passwordStyle={passwordStyle}/>
        <br />
        <button  className='login-btn'>Login</button>
      </form>
      <p className="error-p">{error}</p>
      <Link to={{ pathname: "/student/change_password" }}>Forgot Password</Link>
    </div>
  );
}

export default Login;
