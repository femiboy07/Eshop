import React from 'react';
import SearcIcon from '@mui/icons-material/Search';
import { alpha, Button, FormControl, ListItem, ListItemAvatar, Typography,List, Avatar, ListItemText, ListItemButton, Divider, ClickAwayListener } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Close from '@mui/icons-material/Close';
import { InputBase } from '@mui/material';
import { Box,Container } from '@mui/system';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import theme from '../../theme/theme';






const Search=styled(Box)(({theme})=>({
    display:"flex",
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:'100%',
    // padding:'0 5rem 0 5rem',
    padding:"0 5rem",
    

    lineHeight: 'calc(1 + .8 / 1.0)',
    backgroundColor:alpha(theme.palette.common.white),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white),
    },
   
    [theme.breakpoints.up('750')]:{
       width:'100%',
       padding:'0 6rem',
       left:'0',
       right:'0',
      },

     
    [theme.breakpoints.down('750')]:{
      width:'100%',
      padding:'0 5rem 0 5rem',
      left:'0',
      right:'0',
     }, 

    [theme.breakpoints.up('1110')]:{
        marginLeft:theme.spacing(0),
        position:'relative',
        width:'500px',
        
     },

}))



const Predict=styled(Box)(({theme})=>({
    width:'100%',
    
    [theme.breakpoints.up('750')]:{
       position:'relative',
    },
 
}))



const PredictiveSearch=styled(Box)(({theme})=>({
    display:'block',
    position:'absolute',
    backgroundColor:'rgb(255,255,255)',
    top:'calc(100% - 0.5rem)',
    
    left:'-0.1rem',
    borderStyle: 'solid',
    borderColor: 'rgba(18,18,18,0.1)',
    width:'100%',
    zIndex: 4,
    borderBottomRightRadius: '0px',
    borderBottomLeftRadius: '0px',
    boxShadow: '0px 0px  0px rgba(18,18,18,0.0)',
    [theme.breakpoints.up('md')]:{
        borderTop: 'none',
        width: 'calc(100%)',
        zIndex:3 ,
        // position:'absolute',
        // top:'calc(100% + 0.1rem)',
        // left:'-0.1rem',
    },
    [theme.breakpoints.down('lg')]:{
        overflowY:'auto'
        
    },
    [theme.breakpoints.down('md')]:{
       right: '0',
       left: '0',
       width:'100%',
       top: 'calc(100% - 0.1rem)',
      //  bottom:"0",
       position:'absolute',
       
    },
    
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0,2),
    height: '100%',
    position: 'absolute',
    right:'1px',
    top:'1px',
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase=styled(InputBase)(({ theme }) => ({
    color: 'black',
    width:'100%',
    height: '4.5rem',
    minHeight:' calc(1px * 2)',
    minWidth: 'calc(7rem + 1px * 2))',
    border:'0',
    position: 'relative',

     
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 5, 1, 20),
      paddingLeft: `calc(1em + ${theme.spacing(0)})`,
      border:'1px solid black',
      //  height: '4.5rem',
      paddingRight:`calc(1em + ${theme.spacing(4)})`,
       transition: theme.transitions.create('boxShadow'),
      width: '100%',
      '&:focus':{
       boxShadow: '0 0 0 calc(0rem + 1px) rgba(18, 18, 18)',
       outline:'0'
      },
    //   '&:not(:placeholder-shown)':{
    //     padding:'2.2rem 1.5rem 0.8rem 2rem ',
    //   },
      [theme.breakpoints.up('sm')]: {
        minWidth: '400px',
        // width:'70%',
        // padding:'0 5rem 0 1rem', 

      },
      [theme.breakpoints.down('sm')]: {
        minWidth: '400px',
        // width:"100%",

      }, 
      [theme.breakpoints.down('737')]: {
        // minWidth: '300px',
        width:'100%'
      }, 

    },
}));

const style={
    borderBottom: '0.1rem solid rgba(18,18,18,.08)',
    margin: '0 auto',
    padding: '1.5rem 0 0.75rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 'calc(100% - 4rem)',
    color: 'rgba(18,18,18,.7)',
    letterSpacing: '.13rem',
    lineHeight: 'calc(1 + .2 / 1.0)',
    textTransform: 'uppercase'
}




const SearchAppBar=({handleSearchClose,setit=true,borderStyle})=>{

    const [searchTerm,setSearchTerm]=useState('');
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(Error);
    const [open,setOpen]=useState(false)
    const [img,setImg]=useState('');
    const config={
        'Content-Type': 'application/json',
        
    }
    const handleOpen=()=>{
      setOpen(!open);
    }

    const handleImage=(data)=>{
      data.parts.forEach((item,index)=>{
       console.log(item);
       if(item.color === searchTerm){
          // setSearchTerm(e.targe.value)
          setImg(data.parts[index].partimage)
         

       }
      })
   }


    useEffect(()=>{
if(!searchTerm) return;
       setLoading(!loading);
       axios.get(`http://localhost:5000/api/search/${searchTerm}`,config)
       .then((response)=>{
           setData(response.data);
          
           console.log(response.data);
           setLoading(loading);
       }).catch(()=>{
            setError(error);
            setLoading(loading)
       })
       
    },[searchTerm]);

    

    return(
    
       <Search>
        <Predict>
        <FormControl  component='form' sx={{width:'100%'}}>
            {/* <Box sx={{width:'100%',position:'relative',display:'flex','&:after':{
              position:'absolute',
              border:"0px solid black",
              zIndex:'5',
              flexGrow:'1',
              // "&:before":{
              //   pointerEvents: 'none',
              //   content: `""`,
              //   position: 'absolute',
              //   inset: 0,
              //   borderRadius: 'var(--inputs-radius-outset)',
              //   boxShadow: 'var(--inputs-shadow-horizontal-offset) var(--inputs-shadow-vertical-offset) var(--inputs-shadow-blur-radius) rgba(var(--color-base-text),var(--inputs-shadow-opacity))',
              //   zIndex: -1
              // }
            }}}>  */}
          <StyledInputBase
          sx={{  flexGrow: 1,width:'100%' }}
          value={searchTerm}
          onChange={(e)=>setSearchTerm(e.target.value)}
          placeholder="Search "
          inputProps={{ 'aria-label': 'Search' }}
          />
       <IconButton type="button" sx={{position:'absolute',
       right:'0',
       display:'flex',
       top:'0',
       height:'4.4rem',
       padding:'0',
       width:'4.4rem',
       justifyContent:'center',
       alignItems:"center",
       border:'0',
    
       '&:hover':{
        background:'none'
       },
       borderRadius:'0'}} aria-label="search">
        <SearcIcon />
        </IconButton>
        {/* </Box> */}
       
        {searchTerm &&
        <ClickAwayListener onClickAway={handleOpen}>
         
        <PredictiveSearch sx={{maxHeight:'auto',borderStyle:borderStyle}} >
        {data.length !== 0 && open === false ?
        
        <Typography sx={{...style,fontSize:'0.7em'}} variant='subtitle2'>Products</Typography>:<Typography sx={{border:'none'}}></Typography>}
        {open === false ?
         <List >
          {data?.map((item)=>{
            return(
           <ListItem alignItems='center' key={item._id} disablePadding>
                <ListItemButton>
                <ListItemAvatar>
                 <Avatar src={img || (item.parts[0].partimage && item.parts[1].partimage) } sx={{'&.MuiAvatar-root':{
                  borderRadius:'0%',
                  height:'50px',
                  marginLeft:'15px',
                  width:'50px'
                 }}}/>
                </ListItemAvatar>
              <ListItemText
              sx={{pl:3}}
              primary={
                <Link to={`/product/${item._id}`} onClick={handleSearchClose}>
                   <Typography  sx={{textDecoration:'underline'}}>{item.name}</Typography>
                </Link>
              }
           
               />
               </ListItemButton>
                </ListItem>
            )
          })}
          {/* {open === false ? <Divider/>:null} */}
       <ListItem
          disablePadding
          disableGutters
          secondaryAction={
            <IconButton LinkComponent="a" href='/search '>
              <ArrowRightAltIcon/>
            </IconButton>
          }
          >
            <ListItemButton>
              <ListItemText
                primary={`Search for "${searchTerm}"`}
              />
           </ListItemButton>
          </ListItem>
          
          </List>
          :null}
          
          </PredictiveSearch>
         
        </ClickAwayListener>
}
        </FormControl>
        </Predict>
       {setit  ?
       
      <IconButton
              size="large"
              disableRipple
            aria-label="user-account"
              aria-controls="menu-appbar"
              aria-haspopup="dialog"
              onClick={handleSearchClose}
              id="user-icon"
              sx={{color:'black'}}
              
              >
            <Close/>
            </IconButton>
           
: null}
      </Search>
      
    
    
    )
}



export default SearchAppBar;