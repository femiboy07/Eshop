import React ,{useEffect, useState}from "react";
import { Card,Paper,Container,Box, CircularProgress, Typography ,Alert, Grid, CardMedia,Button, Stack, MenuItem, MenuList, ToggleButtonGroup, ToggleButton, InputLabel, FormLabel, Input, InputBase} from "@mui/material";
import { useGetProductQuery} from "../../redux/features/api/apiSlice";
import { useAddToCartMutation } from "../../redux/features/api/apiSlice";
import { useNavigate, useParams} from "react-router-dom";
import RatingValue from "../../component/Rating/rating.component";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';
import styled from "@emotion/styled";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import ErrorIcon from '@mui/icons-material/Error';
import PayButton from "../../component/PayButton/PayButton.component";
import { display } from "@mui/system";






const Quantity=styled(Box)(({theme})=>({
     maxWidth:'60rem',
     minWidth:'fit-content',

     border:'none',
     padding:'0',
     flex:'0,0,100%',

  '& .MuiInputLabel-root':{
        display:'block',
        paddingLeft:'0'
}

    
}));


const QuantityInput=styled(Box)(({theme})=>({
      color:'black',
      position:'relative',
      width:'10rem',
      border:'1px solid black',
      display:'flex',
      minHeight:'2.5rem',
      '&:after':{
        
         position:'absolute',
         inset:'1',
         border:'none',
         zIndex:"1"
      },
      '&:before':{
        pointerEvents:'none',
        position:'absolute',
        inset:'0',
        borderRadius:'5px',
        zIndex:'-1',
        },

      
       '& .MuiButton-root':{
          width:'2px',
          flexShrink:'0',
          fontSize:'1rem',
          display:'flex',
          border:'none',
          alignItems:'center',
          justifyContent:'center',
          color:'rgb(18,18,18)',
          padding:'0',
        '& .MuiSvgIcon-root':{
            width:'1rem',
            fontSize:'1rem'
         
        },
         
      '&:not(.Mui-focusVisible):not(.Mui-focused)':{
         backgroundColor:"inherit",
         boxShadow:'inherit',
         
        
        //  '&:first-child':{
        //     marginLeft:'1px',
        
        //  }
      } 
    } ,
    
   
    
}));

const ProductPage=()=>{
   
    const params=useParams();
    const navigate=useNavigate();
     const {itemId}=params;
    const selector=useSelector(state=>state.cart);
    // console.log(selector.length);
    const userId=useSelector(state=>state.auth.userId);
    // console.log(userId);
    const {data:product,isFetching,isSuccess,isError,error}=useGetProductQuery(itemId);
    const [addToCart]=useAddToCartMutation();
    const [color,setColor]=useState('');
    const [img,setImg]=useState('');
    const [price,setPrice]=useState('');
    const [id,setId]=useState('');
    const [qty,setQty]=useState(1);
    const [countInStock,setCounInStock]=useState(Number);
    const [Error,setError]=useState({});
    const [loading,setLoading]=useState(false)

    
    
  
    
    
    const handleColor=(event,newColor)=>{
        setColor(newColor);
        // setCounInStock(countInStock)
      
    };

      const handleImage=(e)=>{
       product.parts.forEach((item,index)=>{
        console.log(item);
        if(item.color === e.target.value){
           setImg(product.parts[index].partimage)
           setColor(product.parts[index].color);
           setPrice(product.parts[index].price);
           setCounInStock(product.parts[index].countInStock)
           setId(product.parts[index]._id);
           console.log('id',id)

        }
       })
    }

     
      
      const handleQty=()=>{
        setQty((newqty)=>newqty + 1);
      }
      const handledec=(e)=>{
        if(parseInt(qty) === 1 ){
          return 
        }else{
            setQty((newqty)=>newqty - 1)
        }
      }
    
    
   const cartHandleFunc=async(productId,quantity,subdoc_id,countInStock)=>{
      
    try{
      
      setLoading(!loading)
      await addToCart({userId,productId,quantity,subdoc_id,countInStock}).unwrap().then((payload)=>{
        console.log('fulfilled',payload);
      
         navigate(`/cart`);
      })
      }catch(error){
        setError(error);
        setLoading(loading)
        console.log(error);
      }
    
    
    }
    
    
    useEffect(()=>{
       if(color){
        setColor(color);
        setCounInStock(countInStock)
      }

    },[color,countInStock])
   



    return(
         <Container maxWidth='lg' >
            <Box >
            <Link to='/'>
             <Button variant='outlined' sx={{marginTop:'20px'}}>Go back</Button>
            </Link>
            {isFetching ? (
                <CircularProgress/>
            ):isError ? (
                <Alert severity="error">Cant get Product</Alert>
            ):isSuccess ? (
            <Grid container mt={4}   >
                 <Grid item lg={8} xs={12} md={6}>
                    <Card>
                  <CardMedia
                        component='img'
                        src={img || product.parts[0].partimage}
                        height={700}
                        
                    />
                  </Card>
                  <Grid container mt={4} spacing={2}>
                      {product.image.map((item)=>{
                      return (
                        <Grid item lg={6}>
                          <Card>
                            <CardMedia
                             component="img"
                             image={item}

                             />
                          </Card>

                        </Grid>
                      )
                      })}

                     </Grid>
                </Grid>
                    <Grid item lg={4} xs={12} md={6} pl={3}  mt={4} mb={4}  >
                    <Typography variant='h3'>{product.name}</Typography>
                    <Typography variant='subtitle'>{`$${price || product.parts[0].price}CAD`}</Typography>
                    <InputLabel htmlFor="label">Color</InputLabel>
                    <Quantity sx={{display:'block',position:'sticky',zIndex:2,top:'3rem',left:0,right:0}}>
                       
                       <ToggleButtonGroup
                               value={color || product.parts[0].color}
                               exclusive
                                 id='me'
                                 onClick={handleImage}
                                 onChange={handleColor || product.parts[0]._id}
                                 defaultValue={product.parts[0].color}
                                 sx={{display:'flex',flexWrap:'wrap',marginBottom:'5px'}}
                                 aria-label='label'
                        >        
                        {product.parts.map((item)=>{
                         return (
                            <ToggleButton value={item.color} selected={item.active}  sx={{marginTop:1.5,'&.Mui-selected':{
                               backgroundColor:'black'
                            }}}>{item.color}</ToggleButton>
                             )
                         })}
                         </ToggleButtonGroup>
                         <Box 
                         >
                         <InputLabel htmlFor="focused" sx={{marginBottom:'0.6rem'}}>Quantity</InputLabel>
                         <QuantityInput>
                            <Button type="button" name='minus' onClick={handledec} size="small"><RemoveIcon fontSize="small"/></Button>
                            <Input id="focused" type='number' 
                             value={qty}
                             onChange={(e)=>setQty(parseInt(e.target.value))}
                             inputProps={{min:1,max:10}}
                               />
                            <Button type="button" name='add' onClick={handleQty} size='small'><AddIcon fontSize="small" /></Button>
                         </QuantityInput>
                         </Box>
                       {/* </Quantity> */}
                       { Error && <Typography variant="subtitle2" mt={3} sx={{display:'flex',width:'70%',justifyContent:'space-between'}}><ErrorIcon color="red" sx={{color:'red',display:Error === true ? 'flex' :'none'}}/>{Error.data}</Typography>}
                       {color && qty > countInStock ? <Typography variant="subtitle2" mt={3}>you can not add more {product.name}-{color || product.parts[0].color} to the cart </Typography>:null} 
                      <Stack sx={{width:'400px',border:'1px solid black',
                          "&:hover":{
                                border:'2px solid black',
                            }
                         }} mt={2}>
                     <Button sx={{padding:2,borderRadius:'none',width:'100%','& .MuiButton-root':{
                            backgroundColor:"none",
                            '&:hover':{
                            background:"none",
                            },
                            "&:after":{
                               boxShadow:'10px 10px 8px #888888',
                               width:"100%",
                               border:'1px solid black'
                            },
                            '&.MuiTouchRipple-root':{
                                backgroundColor:"none",
                                
                            }
                          }}} disabled={color && qty>countInStock} 
                       onClick={()=>cartHandleFunc(product._id,qty,id || product.parts[0]._id ,countInStock-qty || product.parts[0].countInStock-qty)} >{loading ? <CircularProgress size={5}/>:'Add To Cart'}</Button>
                     </Stack>
                     {selector.carts !== null? 
                     <Stack sx={{width:'400px',mt:2}}>
                      <PayButton cartItems={ selector.carts.items} padding={2.5} color='black' textColor='white'/>
                     </Stack>:null}
                     <Box sx={{mt:4,width:'100%',lineHeight:'1.5em',margin:'2.5rem 0'}}>
                      <Typography>{product.description}</Typography>
                     </Box>
                     </Quantity>
                     </Grid>

                    

               <Grid container mt={4}>
                <Grid item lg={6} xs={12}>
                    <Typography variant='h2'>Reviews</Typography>
                    {product.reviews.length === 0  && <Alert severity="error">No Reviews</Alert>}
                    <Paper>
                       
                    {product.reviews.map((item)=>{
                                  return(
                              <MenuList>
                             <MenuItem >
                                    {/* <Typography variant="body2">{item.rating}</Typography> */}
                                    <Typography variant="body2">{item.comment}</Typography>
                                    <RatingValue rating={item.rating} captions={item.comment} numReviews={item.numReviews} />
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