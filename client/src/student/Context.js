import React ,{createContext,useState}from 'react'


export const GlobalData = createContext();


function Context({children}) {
    const [temp_email ,setTemp_Email] = useState({
        isTempEmail:false,
        TempEmail:''
    }) 

    const [user,setUser] = useState({
      name:'',
      email :'',
      login: false,
      token_expire:false,
      other_detail:{},
      error:''
    })


  return (
    <GlobalData.Provider value={{temp_email,setTemp_Email,user,setUser}}>
           {children}
    </GlobalData.Provider>
  )
}

export default Context