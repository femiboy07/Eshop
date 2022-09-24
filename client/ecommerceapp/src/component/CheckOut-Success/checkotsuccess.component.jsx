import React from 'react';
import {Container,Box,Typography} from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { deleteCart } from '../../redux/features/cartSlice';
import { clearCart } from '../../redux/features/cartSlice';
import { useEffect } from 'react';



const CheckoutSuccess=()=>{
    const dispatch=useDispatch();
    const cart=useSelector(state=>state.cart);

    useEffect(()=>{
        dispatch(clearCart({cart}));
        // dispatch(deleteCart())
    },[dispatch])
    return(
        <Container maxWidth='md'>
            <Box mt={10}>
          <Typography variant='h3'>CheckOut Succesfull</Typography>
            </Box>       
        </Container>
    )
}

export default CheckoutSuccess;
