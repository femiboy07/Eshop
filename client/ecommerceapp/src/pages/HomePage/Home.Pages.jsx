import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageStand from '../../assets/jeff.jpg';
import { cartAddItem } from '../../redux/features/cartSlice';

import { Alert, Button, CircularProgress, ImageList, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import ProductItems from '../../component/product/product.component';
import { useNavigate } from 'react-router-dom';

// import { fetchProducts } from '../../redux/features/productReducer';
import { useGetProductsQuery } from '../../redux/features/api/apiSlice';
import { useSelector,useDispatch } from 'react-redux';
import Image from '../../component/mg/image';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';







const ImageWrapper=styled(Box)(({theme})=>({
   width:'100%',
   height:'500px',
   backgroundImage:`url(${ImageStand})`,
   backgroundRepeat:'no-repeat',
   backgroundSize:'cover',
   backgroundPosition:'top center',
   position:'relative',

   

   [theme.breakpoints.down('md')]:{
       height:'400px',
       '& .MuiBox-root':{
           '& .MuiTypography-root':{
               fontSize:'25px',
               wordWrap:'no-wrap'
           }
       }
   },

   


}));

const GridItem=styled(Grid)(({theme})=>({

    
       [theme.breakpoints.down('md')]:{
           columns:1,
           columnGap:5,
           
       },
       
       [theme.breakpoints.up('sm')]:{
        columns:6,
        columnGap:7,
        
    }
}));




const HomePage=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [page,setPage]=useState(1);
    const [pageSize,setPageSize]=useState(0);

    const {data:products,isSuccess,isError,error,isFetching}=useGetProductsQuery(page,pageSize);
    
    
    

    
    
    const [activestep,setActiveStep]=useState(0);
    const maxSteps=Image.length;
    
   

    // const indexOfLastCard=currentPage * cardsPerPage;
    

    const handleNext=()=>{
        setActiveStep((nevstep)=>nevstep + 1);
    }

    const handlePrev=()=>{
        setActiveStep((prevstep)=>prevstep - 1);
    }
let pro

    if(isFetching){
        pro=<CircularProgress/>
    }else if(isSuccess){
        
        
        pro=products.map((product)=>(
            
          <Grid item key={product._id} xs={4} sm={4} md={12}  >
            <ProductItems product={product} />
          </Grid>
         
        ))

        
    }else if(isError){
        <Alert severity={error}>Bad request</Alert>
    }

    const handleChange=(page,pageSize)=>{
        setPage(page);
        setPageSize(pageSize)
        
        
        
    }

    


    
    return(
        
            <Box sx={{width:'100%'}}>
                <ImageWrapper pb={20} >
                
                    <Box sx={{position:'absolute',
                    top:'50%',
                    display:'flex',
                    justifyContent:'center',
                    width:'100%',
                    textAlign:'center',
                    flexDirection:'column',
                    alignItems:'center'}}>
                        <Typography variant='h2' fontFamily='Dosis' color='whitesmoke' mt={3} noWrap>
                            Industrial design meets fashion
                        </Typography>
                        <Typography variant='h5' mt={4} color='whitesmoke'>
                            Atypical leather goods
                            </Typography>
                            <Box mt={3} sx={{border:'1px solid white',p:1,backgroundColor:'black',
                            '& .MuiButton-root':{
                                '&:hover':{color:'red'}
                            },
                            '& .MuiBox-root':{
                                '&:hover':{width:'2500px'}
                            }
                            }}>
                            <Button  sx={{color:'whitesmoke'}}>Shop now</Button>
                            </Box>
                        

                    </Box>
                
                </ImageWrapper>
                     <Container maxWidth='xl' fluid={true} >
                    <Box mb={5} pt={5} textAlign='center' sx={{flexGrow:1}}>
                        <Typography variant='h4'>
                         Obsessive Attention. Intelligent Effort.
                        </Typography>

                        <Typography variant='subtitle' component='div' pt={2} fontWeight='400px'>
                        Functional handbags made of luxurious materials to improve people's lives in small but mighty ways.
                        </Typography>
                    <GridItem container rowSpacing={2} mt={5}  justifyContent='center' alignItems='center'
                    columns={{lg:'auto'}}  columnSpacing={{lg:1,md:1,xs:1}} >
                    {pro} 
                    </GridItem>
                    <Stack mt={5} display='flex' justifyContent='center' direction='row' >
                        <Pagination count={2} size='large' color='primary' page={page}  onChange={(e)=>handleChange(e.target.textContent)} isLoading={isFetching}/>
                    </Stack>
                    
                    </Box>
                    



                </Container>
            
            </Box>

        
    )
}

export default HomePage;