import React from 'react';
import { Container,Box,TextField, Paper, Stack, FormControl, Button,InputLabel,Input, FilledInput, Grid,Card, FormHelperText, InputBase, Typography, Alert } from '@mui/material';
import {useEffect,useState} from 'react'
import styled from '@emotion/styled';
import styledEngine from '@mui/styled-engine';
import theme from '../../theme/theme';
import { useLoginUserMutation } from '../../redux/features/api/apiSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/authReducer';
import { useRef } from 'react';





const BoxContainer=styled(Box)(({theme})=>({
    padding:'150px',
    [theme.breakpoints.up('md')]:{
     '& .MuiInputBase-root':{
          minWidth:'300px',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          padding:20

       },
     paddingTop:'50px'     
    },

    
}))


const PaperCont=styled(Paper)(({theme})=>({
    [theme.breakpoints.up('md')]:{
       width:'100%',
       display:'flex',
       flexDirection:'column',
       alignItems:'center',
       maxHeight:'400px'
     
    },
}))



const LoginPage=()=>{
     const navigate=useNavigate();
     const dispatch=useDispatch();
    const [loginUser,{data:loginData,isSuccess:isLoginSuccess,isLoading,isError,error,reset}]=useLoginUserMutation()

   
const initialState={
    email:'',
    password:'',
}
   
    const [formValue,setFormValue]=useState(initialState);
    const { email,password}=formValue
    const handleChange=(e)=>{
     setFormValue({...formValue,[e.target.name]:e.target.value})
     console.log(e.target.value);
     
    }


// let me=useRef();
 

    const canSave=[formValue].every(Boolean) && !isLoading;
    
    const handleSubmit=async(e)=>{
    try{
        if(canSave){
        e.preventDefault();
        const payload=await loginUser({email,password}).unwrap()
        console.log(payload);
        setFormValue({[e.target.name]:''});
    } 
     }catch(error){
      console.log(error)
    }
 
    
}      
        
   
    useEffect(()=>{
        if(isLoginSuccess){
          dispatch(setUser({name:loginData.name,token:loginData.token,userId:loginData._id}))
          alert('Login Succesfull');
          navigate(`/cart`)
        }
        

    },[isLoginSuccess])
    

   
    return(
    
        <Container  maxWidth='xs'  fluid sx={{display:'flex',justifyContent:'center',alignItems:'center',margin:'0 auto',width:'100%',paddingTop:15}}>
       <PaperCont>
       <BoxContainer component='form' onSubmit={handleSubmit}>
       {isError ? <Alert severity='error'>{error.data}</Alert>:
       isLoginSuccess ? <Alert severity='success'>login Succesfull</Alert>
       : null} 
        <InputLabel shrink htmlFor='email-type'>label</InputLabel>
    
           <InputBase
           sx={{border:'1px solid black',mb:2}}
           placeholder='Email'
           inputProps={{"aria-label":'email'}}
        //    value={formValue}
        //    id='email-type'
           name='email'
           onChange={handleChange}
        
           />
        
        
            <InputLabel shrink htmlFor='password-type'></InputLabel>
           <InputBase
           sx={{border:'1px solid black'}}
           placeholder='PassWord'
           inputProps={{"aria-label":'password'}}
           name='password'
           id='password-type'
           onChange={handleChange}
           />
        
         
        <Button variant='contained' type='submit' fullWidth sx={{backgroundColor:'black',color:'white',mt:4,padding:'20px 0 20px'}}>
          <Typography variant='h5'>LOGIN</Typography>    
        </Button>  
         
        </BoxContainer> 
        </PaperCont> 
    </Container>
        
       
        
    )
}

export default LoginPage;


