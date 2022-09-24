import React ,{useState}from "react";
import { Card,Paper,Container,Box, CircularProgress, Typography ,Alert, Grid, CardMedia,Button, Stack, FormControl, InputLabel, Select, MenuItem, MenuList, ListItemText, Divider} from "@mui/material";
import { useGetProductQuery ,useEditProductMutation} from "../../redux/features/api/apiSlice";
import { useGetProductsQuery } from "../../redux/features/api/apiSlice";
import { useAddToCartMutation } from "../../redux/features/api/apiSlice";
import { useNavigate, useParams ,Params, useSearchParams} from "react-router-dom";
import RatingValue from "../../component/Rating/rating.component";
import { useDispatch,useSelector } from "react-redux";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useEffect } from "react";
import { Navigate, } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { cartAddItem } from "../../redux/features/userReducer";




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.0 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const ProductPage=()=>{
    const quantity=useSelector(state=>state.cart.quantity);
    const cartItems=useSelector(state=>state.cart)
    const dispatch=useDispatch();
    const [qty,setQty]=useState(1);
    const [comment,setComment]=useState('');
    const [rating,setRating]=useState(0);
    const params=useParams();
    const navigate=useNavigate();
    
const {itemId}=params;
    const selector=useSelector(state=>state.cart);
    console.log(selector.length);
    
    const userId=useSelector(state=>state.auth.userId);
    console.log(userId);
    const {data:product,isFetching,isSuccess,isError,error,refetch}=useGetProductQuery(itemId);

    const [addToCart,{isLoading,isSuccess:isPostSuccess,data}]=useAddToCartMutation();
    
    // const {updateProduct,isLoading}=useEditProductMutation();

    const [searchParams,setSearchParams]=useSearchParams();
    
   const cartHandleFunc=async(productId,quantity)=>{
    try{
      await addToCart({userId,productId,quantity}).unwrap().then((payload)=>{
        console.log('fulfilled',payload);
        
     
        navigate(`/cart`)
      })
      
      
    }catch(error){
        console.log(error);

    }
         
   }



    return(
         <Container maxWidth='lg' mt={5}>
            <Box mt={10}>
            <Link to='/'>
             <Button variant='outlined'>Go back</Button>
            </Link>
            {isFetching ? (
                <CircularProgress/>
            ):isError ? (
                <Alert severity="error">Cant get Product</Alert>
            ):isSuccess ? (
                <Grid container mt={4} display='flex' justifyContent='center' >
                 <Grid item lg={6} xs={12} md={6}>
                    <Card>
                        <CardMedia
                        component='img'
                        image={product.image}
                        height={500}
                        />

                    </Card>
                    </Grid>
                    <Grid item lg={6} xs={12} md={6} pl={10}>
                        <Typography variant='h3'>{product.name}</Typography>
                        <Typography>{product.description}</Typography>
                        <Grid item lg={8} md={7} sm={8} xs={5} mt={4}>
                        <Paper sx={{width:500,maxWidth:'100%'}}>
                         <MenuList>
                            <MenuItem>
                            <ListItemText>Price</ListItemText>
                            <Typography>${product.price}</Typography>
                            </MenuItem>
                            <Divider/>
                            <MenuItem>
                            <ListItemText>Stock</ListItemText>
                            {product.countInStock > 0 ?
                            <Typography>Instock</Typography>
                             :<Typography>OutofSock</Typography>}
                            </MenuItem>
                            <Divider/>
                            <MenuItem>
                            <ListItemText>Reviews</ListItemText>
                            <RatingValue rating={product.rating} numReviews={product.reviews} />
                            </MenuItem>
                            <Divider/>
                            <MenuItem>
                            <ListItemText>Quantity</ListItemText>
                            <FormControl sx={{minWidth:70}} size='small'>
                                <InputLabel id='quantity'>Qty</InputLabel>
                                <Select
                                labelId="quantity"
                                id="quantity"
                                value={qty}
                                label="Age"
                                onChange={(e)=>setQty(e.target.value)}
                                >
                                {[...Array(product.countInStock).keys()].map((x)=>(
                                    <MenuItem key={x + 1} value={x + 1}>
                                        {x+1}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                            </MenuItem>
                            
                            </MenuList>
                        </Paper>
                        <Stack sx={{width:'100%'}} mt={2}>
                         {  
                        <Button variant='contained' sx={{padding:3,borderRadius:50}} disabled={product.countInStock === 0} 
                       onClick={()=>cartHandleFunc(product._id,qty)} >Add To Cart</Button>
                         }
                       </Stack>
                    </Grid>
                    </Grid>

                    <Grid container mt={4}>
                <Grid item lg={6} xs={12}>
                    <Typography variant='h2'>Reviews</Typography>
                    {product.reviews.length === 0 && <Alert severity="error">No Reviews</Alert>}
                    <Paper>
                        
                            {product.reviews.map((review)=>{
                                return(
                                <MenuList>
                                <MenuItem key={review._id}>
                                    <Typography>{review.name}</Typography>
                                    <RatingValue rating={review.rating} numReviews={review.numReviews}/>

                                </MenuItem>
                                </MenuList>
                                )
                            })}
                         </Paper>
                </Grid>


            </Grid>
                    
                </Grid>

                
            ): error}
             

            </Box>
           
            
         </Container>
    )
    
}


export default ProductPage;