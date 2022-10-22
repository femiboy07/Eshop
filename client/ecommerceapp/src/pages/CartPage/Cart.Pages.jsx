import React, { useCallback } from "react";
import {Button ,Box,Typography,Grid,Container, Alert,Paper,Stack} from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { updateCarts,deleteCart } from "../../redux/features/cartSlice";
import { clearCart } from "../../redux/features/cartSlice";
import { Link } from "react-router-dom";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import PayButton from "../../component/PayButton/PayButton.component";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import theme from "../../theme/theme";
import { useEffect } from "react";
import { useState } from "react";







const CartPage=()=>{
    // const params=useParams();
    // const location=useLocation();
    // const navigate=useNavigate();
    const dispatch=useDispatch();
    // const {itemId}=params;+
    const cartItems=useSelector(state=>state.cart);
    const userId=useSelector(state=>state.auth.userId);
    
    
    
    
    
    

  

const updateCartQuant=async(productId,qty,id)=>{
    try{
       const me =await dispatch(updateCarts({userId,productId,qty,id})).unwrap();
       console.log(me);
    }catch(err){
         console.log(err);
    }
    
}







const handleDeleteCarts=useCallback(async(productId)=>{
try{
        const del=await dispatch(deleteCart({userId,productId})).unwrap();
        console.log(del);
    }catch(err){
        console.log(err);

    }
},[dispatch,userId])

useEffect(()=>{
    if(userId !== null){
        handleDeleteCarts();
    
    }
},[userId,handleDeleteCarts])



  
    
    
    return(

        <Container maxWidth='lg' mt={5}>
            <Box mt={10}>
             <Grid container mt={10}>
                <Grid item  lg={12}>
                <Typography variant="h5">Shopping Cart</Typography>
                 {cartItems.carts === null || cartItems.carts.bill === 0?  (
                    <Container maxWidth='md'>
                    <Alert severity="error">
                        <Typography variant="h5">
                            Your Cart is Empty
                        </Typography>

                    </Alert>
                    </Container>
                  

                 ):(
                    <Box mt={2} sx={{display:'flex',flexDirection:'column'}}>
                      <>
                       
    {cartItems.carts.items.map((item)=>{
        
        return (   
           <Paper sx={{width:'100%',height:'250px',
           position:'relative',mt:2,
           display:'flex',alignItems:'center',pl:5,justifyContent:'center'}} key={item._id}>
               <Box sx={{position:'absolute',left:-10,top:-15,cursor:'pointer'}} >
               <DeleteForeverIcon htmlColor={theme.palette.secondary.dark} fontSize='large' onClick={()=>handleDeleteCarts(item.productId)} />
               </Box>
             <Grid container lg={12}>
               <Grid item lg={3} >

               <img src={item.partimage} width={150} alt=""/>
               </Grid>
               <Grid item lg={3} display='flex' alignItems='center'>
                   <Link to={`/product/${item.productId}`}>
                   <Typography variant='h5'>{item.name}</Typography>
                   </Link>
                
               </Grid>
               <Grid item lg={3} display='flex' alignItems='center'>
                <Typography variant="h5">Quantity</Typography>
                <Button 
                variant='outlined'
                disabled={item.quantity === 1}
                onClick={()=>updateCartQuant(item.productId,item.quantity - 1,item._id)}
                >
                 <ArrowCircleDownIcon/>
                </Button>
               <span >{item.quantity}</span>
               <Button  
                variant='outlined'
                  onClick={()=>updateCartQuant(item.productId,item.quantity + 1,item._id)}
                 disabled={item.quantity >= item.countInStock}
                 >
               <ArrowCircleUpIcon/>
         </Button>

         
               </Grid>
               <Grid item lg={3} display='flex' alignItems='center'>
                <Typography variant='h4'>${item.price}</Typography>
               </Grid>

             </Grid>
           </Paper>
      
           
       
        )
          
   })
}
        <Box sx={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                        <Stack mt={2} direction display='flex' justifyContent='flex-start'>
                        
                        <PayButton cartItems={cartItems.carts.items} onClick={()=>handleDeleteCarts()}/>

                        </Stack>
                         
                        <Stack mt={2} direction display='flex' justifyContent='flex-end'  >
                            <Typography variant='h2'>
                               total: ${cartItems.carts.bill}
                            </Typography>

                        </Stack>
                        </Box>
                        </>
                    </Box>

                 )}
                 </Grid>
                                
            </Grid>   
            
            </Box>
         
        </Container>
    )
}

export default CartPage;