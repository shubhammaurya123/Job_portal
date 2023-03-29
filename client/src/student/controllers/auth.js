import { useState ,useEffect } from "react";
import { decodeToken, isExpired } from "react-jwt";

const useAuth = ()=>{
  const [tokenData ,setTokenData] = useState();
  const [isTokenExpired ,setIsTokenExpired] = useState();
  const [isLogin ,setIsLogin] = useState();
  const token = localStorage.getItem('token')
  useEffect(()=>{
    if(token){
      setTokenData(decodeToken(token))
      setIsTokenExpired(isExpired(token))
       setIsLogin(true)
    }else{
         setTokenData('You are logged out')
        setIsTokenExpired('Your Token expired')
        setIsLogin(false)
    }
  },[token])
  return[tokenData ,isTokenExpired,isLogin]
}

export default useAuth;