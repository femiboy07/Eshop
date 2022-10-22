import React from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { Box, Button } from '@mui/material';




const PayButton=({cartItems,padding,color,textColor})=>{
   const {userId}=useSelector(state=>state.auth);
   console.log(cartItems)
   
  const headers = {
    'Content-Type': 'application/json',
    'credentials':'true'
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
    <>
      <Button onClick={()=>handleCheckout()} sx={{padding:padding,backgroundColor:color,color:textColor,'&:hover':{
        backgroundColor:'black'
      }}} variant='outlined'>Check Out</Button>
    </>
   )
}

export default PayButton;
