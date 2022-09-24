import React,{useEffect,useState} from 'react';
import {Box,Container,Dialog, DialogTitle} from '@mui/material';
import { useNavigate } from 'react-router-dom';


const LoadingToRedirect=()=>{
    const navigate=useNavigate();
    const [count,setCount]=useState(5);
    useEffect(() => {
      const interval= setInterval(()=>{
         setCount((prev)=>prev-1)
        },1000)
      count === 0 && navigate('/login');
      return ()=>clearInterval(interval)
    }, [count,navigate]);
    return(
        <Dialog sx={{backgroundColor:'black'}} open={true}>
          <DialogTitle>Redirect in ....{count}</DialogTitle>  
        </Dialog>
    )
}


export default LoadingToRedirect;
