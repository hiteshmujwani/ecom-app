import React from 'react'
import { useEffect ,useState } from 'react'
import { useNavigate , useLocation } from 'react-router-dom'

export default function Spinner({path="/login"}) {
    let location = useLocation();
    const [count, setCount] = useState(3)
    let navigate = useNavigate();
    // Redirect to home page after 4 seconds.
    useEffect(() => {
        const timer = setTimeout(() => {
            setCount((prev) => (--prev))
        },1000)
        count === 0 && navigate(path,{state: location.pathname})
        return ()=> clearInterval(timer)
    },[count , navigate , location ,path])
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
