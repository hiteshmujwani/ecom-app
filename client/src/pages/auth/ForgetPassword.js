import React ,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '../../components/Layout/Layout'
import {toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate , useLocation} from 'react-router-dom';
import { useAuth } from '../../context/auth';

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

export const ForgetPassword = () => {

    const navigate = useNavigate();
    //states for storing data of user inputs 
    const [email,setEmail] = useState('')
    const [newpassword,setNewPassword] = useState('')
    const [securitykey,setSecurityKey] = useState('')

   // form function for sending data on server
   const submitHandler = async (e) =>{
    try {
      e.preventDefault()
      let res = await axios.post(`/api/v1/auth/forget-password`,{email,newpassword,securitykey})
      if(res.data.success){
        toast.success("PASSWORD RESET SUCCESSFULLY")
        navigate('/login')
      }
      else{
        toast.error("CHECK EMAIL OR SECURITY KEY")
      }
      
    } catch (error) {
      toast.error("CHECK EMAIL OR SECURITY KEY")
    }
}   

  return (
    <Layout>
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" style={{"height":"80vh"}} maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          Forget Password
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="New Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={newpassword}
              onChange={(e)=>{setNewPassword(e.target.value)}}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              id="securitykey"
              label="Security Key"
              name="securitykey"
              autoComplete="securitykey"
              autoFocus
              value={securitykey}
              onChange={(e)=>{setSecurityKey(e.target.value)}}
            />
            <Button
              type="submit"
              fullWidth
              onClick={submitHandler}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Forget
            </Button>
            <Grid container>
              <Grid item>
                <Link to={'/register'} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </Layout>
  );
}