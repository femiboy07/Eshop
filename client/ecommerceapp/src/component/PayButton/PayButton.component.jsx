import React from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { Box, Button } from '@mui/material';




const PayButton=({cartItems})=>{
   const {userId}=useSelector(state=>state.auth);
   console.log(cartItems)
  const headers = {
    'Content-Type': 'application/json',
  }
//  cartItems=JSON.stringify(cartItems);
   const handleCheckout=()=>{
       axios.post(`http://localhost:5000/api/stripe/create-checkout-session`,{cartItems,userId:userId},headers).then((response)=>{
        if(response.data.url){
            window.location.href=response.data.url;
        }
       }).catch((err)=>console.log(err))
   }

   return(
    <Box sx={{border:'1px solid white'}}>
      <Button onClick={()=>handleCheckout()} sx={{padding:'25px 150px 25px',backgroundColor:'black',color:'white','& .MuiBox-root':{
        '&:hover':{
          color:'red',
          marginTop:'50px'
        }
      }}} variant='outlined'>Check Out</Button>
    </Box>
   )
}

export default PayButton;
