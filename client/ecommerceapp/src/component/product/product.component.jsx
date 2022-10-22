import React from 'react';
import axios from 'axios';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartAddItem } from '../../redux/features/cartSlice';
import {Button, Card, CardActionArea, CardContent, CardMedia, Rating, Typography,Box} from '@mui/material';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import RatingValue from '../Rating/rating.component';



const ProductItems=(props)=>{
         const {product}=props;
        
        

    const Item=styled(Box)(({theme})=>({
          width:300,
          display:'flex',
          flexDirection:'column',
          [theme.breakpoints.down('sm')]:{
              maxWidth:190,
          },
          [theme.breakpoints.up('sm')]:{
            maxWidth:290,
          }, 
         [theme.breakpoints.up('md')]:{
            width:290,
        }, 

}))

    
    


     return(
           <Item>
           <Card sx={{mb:3,borderRadius:0,'&  .MuiPaper-root .MuiCard-root':{
               '&:hover':{
                   transform:'scale(1,2)',
                   
               }
           }}}>
               <CardActionArea>
                   <Link to={`/product/${product._id}`}>
                <CardMedia
                   component='img'
                   src={product.parts[0].partimage}
                   height={250}
                   alt='product'
                   />
                   </Link>
                </CardActionArea>
               </Card>
               <Box sx={{display:'flex',justifyContent:'space-between'}}>
               <Link to={`/product/${product._id}`}>
                       <Typography variant='subtitle' mt={3} >
                             {product.name}
                       </Typography>
                       
                </Link>
                       
                       {/* <Button onClick={()=>dispatch(cartAddItem(product))}>add to cart</Button> */}
                       <Typography variant='subtitle'>${product.parts[0].price}</Typography>
                     

                   </Box>    
                    
                      
                    
           </Item>

     )
}



export default ProductItems;


