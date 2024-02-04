import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState ,useEffect} from 'react'
import { useAuth } from '../../context/auth';
import {toast } from 'react-hot-toast';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/UserMenu';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export const Profile = ()=> {
    const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [phone,setPhone] = useState('')
  const [address,setAddress] = useState('')
  const [auth,setAuth] = useAuth()

  useEffect(()=>{
    setName(auth.user.name)
    setEmail(auth.user.email)
    setPhone(auth.user.phone)
    setAddress(auth.user.address)
  },[])
  const handleSubmit = async (e) =>{
    try {
      e.preventDefault()
      const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`,{name,email,password,phone,address})
      setAuth({...auth,user:res?.data?.updateUser})
      let ls = localStorage.getItem('auth')
      ls = JSON.parse(ls)
      ls.user = res.data.updateUser;
      localStorage.setItem('auth',JSON.stringify(ls))
      toast.success("profile Updated Successfully")
    } catch (error) {
      console.log(error)
      console.log("error in function")
    }
  }
  return (


    <Layout>

    <div className="container-fluid" style={{"height":"80vh"}}>
    <div className="row">
         <div className="col-md-3">
          <UserMenu/>
         </div>
         <div className="col-md-9">
         <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
           
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
           Your Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit}  sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Full Name"
                  value={name}
                  onChange={(e)=>setName(e.target.value)}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  disabled
                  autoComplete="email"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                 
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Phone"
                  label="Phone"
                  type="text"
                  id="Phone"
                  value={phone}
                  onChange={(e)=>{setPhone(e.target.value)}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Address"
                  label="Address"
                  type="text"
                  id="Address"
                  value={address}
                  onChange={(e)=>{setAddress(e.target.value)}}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            //   onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
         </div>
    </div>     
    </div>
    
    </Layout>
  );
}
