import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import ImageStand from '../../assets/me.jpg';
import ImageStand2 from '../../assets/Mlouye_750x.jpg';
import { Alert, Button, CircularProgress, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';
import ProductItems from '../../component/product/product.component';
import { useGetProductsQuery } from '../../redux/features/api/apiSlice';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';







const ImageWrapper=styled(Box)(({theme})=>({
    // position:'relative',
    // display:'flex',
    // flexDirection:'row',
    
    [theme.breakpoints.up('lg')]:{
       flexDirection:"row",
       flexWrap:"wrap",
       minHeight:'49rem',
       display:'flex',
      position:'relative',
    //    '& .MuiBox-root':{
    //        '& .MuiTypography-root':{
    //            fontSize:'1.6rem',
    //            wordWrap:'no-wrap',
    //            zIndex:2,
    //            display:'flex',
    //            height:'100%',
    //            justifyContent:'center',
    //            alignItems:"center"
            
    //        }
    //    }
 },
 [theme.breakpoints.between('sm','md')]:{
    minHeight:"39rem",
    alignItems:'center',
    display:'flex',
    position:'relative',
    flexDirection:"row",
    flexWrap:"wrap",

    '& .MuiBox-root':{
        '& .MuiTypography-root':{
            fontSize:'1rem',
            wordWrap:'no-wrap'
        }
    }
},

[theme.breakpoints.only('md')]:{
    minHeight:"42rem",
    alignItems:'center',
    display:'flex',
    position:'relative',
    flexDirection:"row",
    flexWrap:"wrap",
}

}));

const FirstImage=styled(Box)(({theme})=>({
    position:'absolute',
    left:'0',
    top:'0',
    height:'100%',
    width:'50%',
    opacity:"1",
    backgroundColor:"#000000",
    overflow:"hidden",
    display:'block',
    
    '&:after':{
        position:'absolute',
        top:'0',
        content:`"/A"`,
        background:'#000000',
        opacity:'0',
        zIndex:'1',
        width:'100%',
        height:'100%'
    },
    
    [theme.breakpoints.only('md')]:{
        position:'absolute',
        left:'0',
        top:'0',
        height:'100%',
        width:'50%',
        backgroundColor:"rgba(18,18,18,0.1)",
    overflow:"hidden",
        display:'block',

        '&::after':{
            position:'absolute',
            top:'0',
            content:`""`,
            background:'#000000',
            opacity:'0',
            zIndex:'1',
            width:'100%',
            height:'100%'
        },
        '& .MuiBox-root':{
            '& .MuiTypography-root':{
                fontSize:'1.6rem',
                wordWrap:'no-wrap'
            }
        }

    },
        // '&::after':{
            
        //     position:'absolute',
        //     top:'0',
        //     background:'#000000',
        //     opacity:'0',
        //     zIndex:'1',
        //     width:'100%',
        //     height:'100%'
        // },
        
        "&  img":{
            objectFit:'cover',
            objectPosition:'center center',
            transistion:'opacity .4s cubic-biezer(.25,.46,.45,.94)',
            display:'flex',
            alignItems:'center',
            maxWidth:'100%',
            position:'absolute',
                top:'0',
                left:'0',
                width:'100%',
                height:'100%',

        },

       
        "img:after":{
            position:'absolute',
                top:'0',
                background:'#000000',
                opacity:'0',
                zIndex:'1',
                width:'100%',
                height:'100%'
        } 
    
    
    }
))

const FirstImage2=styled(Box)(({theme})=>({
    backgroundColor:"rgba(18,18,18,0.1)",
    overflow:"hidden",
    display:'block',
    height:'100%',
    position:'absolute',
    width:'50%',
    right:'0',
    left:'auto',

        [theme.breakpoints.up('md')]:{
        height:'100%',
        width:'50%',
        position:'absolute',
        left:'auto',
        top:'0',
        content:`""`
    
        // '& .MuiBox-root':{
        //     '& .MuiTypography-root':{
        //         fontSize:'1.6rem',
        //         wordWrap:'no-wrap'
        //     }
        // }
    },
        '&:after':{
            position:'absolute',
            top:'0',
            background:'#000000',
            opacity:'0',
            zIndex:'1',
            width:'100%',
            height:'100%'
        },
        
        "& img":{
            objectFit:'cover',
            objectPosition:'center center',
            transistion:'opacity .4s cubic-biezer(.25,.46,.45,.94)',
            display:'block',
            maxWidth:'100%',
            position:'absolute',
            top:'0',
            left:'0',
            width:'100%',
            height:'100%'
        },
        // "& >*not(.zoom)":{
        //     display:'block',
        //     maxWidth:'100%',
        //     position:'absolute',
        //     top:'0',
        //     left:'0',
        //     width:'100%',
        //     height:'100%' 
        // }

      
    
    
    }
    
      
    
    
  


))

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
    
    const [page,setPage]=useState(1);
    const [pageSize,setPageSize]=useState(0);

    const {data:products,isSuccess,isError,error,isFetching}=useGetProductsQuery(page,pageSize);
    
    
    

    
    
    
    
   

    // const indexOfLastCard=currentPage * cardsPerPage;
    

    
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
        <main>
            <Box sx={{width:'100%','&:after':{
                'opacity':'0.4',
                background:'#000000'
            }}} >
            <ImageWrapper >
            <FirstImage  component="div">
                <img src={ImageStand}
                width={1080} height="1350.0"
                alt="A woman crouches while holding multiple handBags"
                 />
            </FirstImage>

            <FirstImage2>
                <img src={ImageStand2} alt='upside' width={1100} height={1007.0}   />
            </FirstImage2>
                <Box sx={{position:'absolute',
                    top:'50%',
                    display:'flex',
                    justifyContent:'center',
                    width:'100%',
                    textAlign:'center',
                    flexDirection:'column',
                    alignItems:'center',
                    "&::after":{
                        position:'absolute',
                        top:'0',
                        background:'#000000',
                        opacity:'0',
                        zIndex:'1',
                        width:'100%',
                        height:'100%'
                    },
                    }}>
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
                <Box mt={2} pt={5}>
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
            </Box>
                   
          </main>
        
    )
}

export default HomePage;