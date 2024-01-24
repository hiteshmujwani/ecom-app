import axios from 'axios'
import {useState,useEffect,createContext,useContext} from 'react'

const AuthContext = createContext()

const AuthProvider = ({children}) =>{
const[auth,setAuth] = useState({
    user:null,
    token:''
})
// seting default headers for axios
axios.defaults.headers.common['Authorization'] = auth?.token;
useEffect(()=>{
    const userData = localStorage.getItem('auth')
    if(userData){
        setAuth(JSON.parse(userData))
    }
},[])

return(
    <AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
)
}

// custom hook 
const useAuth = () => useContext(AuthContext)
export {useAuth , AuthProvider}