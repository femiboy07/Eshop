import React from "react";
import {Button, Card,CardMedia ,Box,Typography,Grid,Container, Alert, MenuList, MenuItem,Paper,Stack,FormControl,InputLabel,Select} from "@mui/material";
import {IconButton} from "@mui/material";
import { cartSlices, useAddToCartMutation, useGetProductsQuery } from "../../redux/features/api/apiSlice";
import { useGetProductQuery ,useEditProductMutation} from "../../redux/features/api/apiSlice";
import { useGetCartMutation } from "../../redux/features/api/apiSlice";
import { useParams, useSearchParams } from "react-router-dom";
import { useLocation,useNavigate } from "react-router-dom";
import { URLSearchParamsInit } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { updateCarts,deleteCart } from "../../redux/features/cartSlice";
import { useEffect,useState ,useMemo} from "react";
import { Link } from "react-router-dom";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import PayButton from "../../component/PayButton/PayButton.component";
import axios from 'axios'
import debounce from 'lodash';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import theme from "../../theme/theme";






const CartPage=()=>{
    const params=useParams();
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {itemId}=params;
    const cartItems=useSelector(state=>state.cart);
    const userId=useSelector(state=>state.auth.userId)
    const [addToCart]=useAddToCartMutation();
    const [getCart,{isLoading:isCartLoading,isSuccess}]=useGetCartMutation(userId);
    const {qty,setQty}=useState()

  

const updateCartQuant=async(productId,qty)=>{
    try{
        
       const me =await dispatch(updateCarts({userId,productId,qty})).unwrap();
       console.log(me);

    }catch(err){
        
        console.log(err);

    }
}

const handleDeleteCarts=async(productId)=>{
    try{
        const del=await dispatch(deleteCart({userId,productId})).unwrap();
        console.log(del);
    }catch(err){
        console.log(err);

    }
}

  
    
    
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

                                    <img src={item.image} width={150}/>
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
                                     onClick={()=>updateCartQuant(item.productId,item.quantity - 1)}
                                     >
                                      <ArrowCircleDownIcon/>
                                     </Button>
                                    <span >{item.quantity}</span>
                                    <Button  
                                     variant='outlined'
                                       onClick={()=>updateCartQuant(item.productId,item.quantity + 1)}
                                      disabled={item.quantity === item.countInStock}
                                      
                                      
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
                            
                            
                        })}

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