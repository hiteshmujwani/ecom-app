import React from 'react'
import { useEffect ,useState } from 'react'
import { useNavigate , useLocation } from 'react-router-dom'

export default function Spinner() {
    let location = useLocation();
    const [count, setCount] = useState(5)
    let navigate = useNavigate();
    // Redirect to home page after 4 seconds.
    useEffect(() => {
        const timer = setTimeout(() => {
            setCount((prev) => (--prev))
        },1000)
        count === 0 && navigate('/login',{state: location.pathname})
        return ()=> clearInterval(timer)
    },[count , navigate , location])
  return (
    <>
        <div className="d-flex h-100 align-items-center justify-content-center">
        <div className="spinner-border" role="status">
        </div>
        <h2>Redirecting You in {count} seconds</h2>
        </div>
    </>
  )
}
