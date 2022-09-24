import React, { useState } from "react";
import {AppBar,Box,FormControl,List,ListItem,ListItemText,NativeSelect,Toolbar,Typography,ListItemButton,Menu, MenuItem} from '@mui/material';
import { IconButton } from "@mui/material";
import { Drawer } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"
import theme from "../../theme/theme";
import { Container } from "@mui/system";
import ListedDrawer from "../drawer/drawer.component";
import Close from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';
import LinkHeader from "../linkheaders/linkheader.component";
import SearchAppBar from "../search/search.component";
import UserIcon from '@mui/icons-material/AccountCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import Badge from "@mui/material/Badge";
import styled from "@emotion/styled";
import {useSelector,useDispatch} from 'react-redux';
import { logOut ,setUser} from "../../redux/features/authReducer";
import { useEffect } from "react";
import { useGetCartQuery } from "../../redux/features/api/apiSlice";
import { useNavigate } from "react-router-dom";

const Baged=styled(Badge)(({theme})=>({
      '& .MuiBadge-badge':{
      
        right:-2,
        top:13,
        border: `2px solid red`,
        padding: '0 4px',
      },
}))




const NavBar=()=>{

  const [state, setState] =useState(false);
  const [searchClick,setSearchClick]=useState(false);
  const [click,setClick]=useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const token=useSelector(state=>state.auth.token );
  const userId=useSelector(state=>state.auth.userId);
  // const [getCart,{isLoading}]=useGetCartQuery();
  const navigate=useNavigate();
  const user=localStorage.getItem('users' || "{}")
  // useEffect(()=>{
  //   dispatch(setUser(user));
  // },[])
  const dispatch=useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleBarClick=()=>{setState(true)}
  const handleBarClose=()=>{setState(false);}

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //handle for search;

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSearchClick=()=>{setSearchClick(true)}
  const handleSearchClose=()=>{setSearchClick(false)}
// const quantity=useSelector(state=>state.user.quantity);
const cartitems=useSelector(state=>state.cart);
const params=useParams();
const {itemId}=params;
 const cart=cartitems.carts !== null ? cartitems.carts.items.map(item=>item.quantity).reduce((prev,curr)=>prev + curr,0):null
// //  const handleCart=async()=>{
//      await getCart(userId).unwrap();
//      navigate(`/cart`)
//  }


    return(
       <AppBar position="fixed" sx={{backgroundColor:'#fff',zIndex:(theme)=>theme.zIndex.drawer + 1}}>
         <Container maxWidth='lg'>
           <Toolbar disableGutters>
           <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 3,
              display: { xs: 'none', md: 'flex' },
              width:'80',
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize:'35px',
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            DAWN
          </Typography>
          <Box sx={{display:{xs:'flex',md:'none'}}}>

            {state ?
            <IconButton
            size="large"
            aria-label="categories"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            sx={{color:'black'}}
            edge='start'
            onClick={handleBarClose}
            >
            <CloseIcon/>
            </IconButton>:<IconButton
            size="large"
            aria-label="categories"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            sx={{color:'black'}}
            onClick={handleBarClick}
            >
            <MenuIcon/>

            </IconButton>
}
            <Drawer
             onClose={handleBarClose}
             
             anchor='left'
             variant="temporary"
             open={state}
             sx={{flexShrink: 1,
              [`& .MuiDrawer-paper`]: { width: 500, boxSizing: 'border-box'}}}
            >
            <ListedDrawer handleBar={handleBarClick} handleClose={handleBarClose}/>
            </Drawer>
           </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              
              display: { xs: 'flex', md: 'none' },
              width:'100%',
              flexGrow:1,
              justifyContent:'center',
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize:'35px',
              letterSpacing: '.2rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            DAWN
          </Typography>
          <Box sx={{  display: { xs: 'none', md: 'flex' },justifyContent:'flex-start' }}>
          <LinkHeader />
          </Box>
          <Box sx={{flexGrow:1,display:'flex',justifyContent:'flex-end'}}>
             {searchClick ? <IconButton
              size="large"
              aria-label="close"
              disableRipple
              aria-controls="menu-appbar"
              aria-haspopup="true"
              sx={{color:'black'}}
              edge='end'
              onClick={handleSearchClose}
              >
              <CloseIcon />
             </IconButton>:<IconButton
              size="large"
              disableRipple
              aria-label="search"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              sx={{color:'black'}}
              edge='end'
              onClick={handleSearchClick}
             >
               <SearchIcon/>
             </IconButton>}

            
            </Box>
            {token !== null ? 
            <Box sx={{display:{xs:'none',md:'flex'}}}>
              
            <IconButton
               size="large"
               disableRipple
               aria-label="user-account"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               onClick={handleMenu}
               id="user-icon"
               sx={{color:'black'}}
               edge='end'
              >
              
              <UserIcon/>
            
               </IconButton>
               <Menu
               sx={{mt:6,width:'400px'}}
                id="user-icon"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical:'bottom',
                  horizontal:'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
               >
                <MenuItem onClick={handleClose}>
                  <Link to='/profile'>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={()=>dispatch(logOut())}>
                <Link to='/login'>
                  Logout
                </Link>
                </MenuItem>
               </Menu>
                 
            </Box>:<Box sx={{display:{xs:'none',md:'flex'}}}>
            <IconButton
               size="large"
               disableRipple
               aria-label="user-account"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               id="user-icon"
               sx={{color:'black'}}
               edge='end'
              >
              <Link to='/login' >
              <LoginTwoToneIcon/>
              </Link>
               </IconButton>
              </Box>
              }

            <Box sx={{flexGrow:0,display:'flex'}}>
            <IconButton
               size="large"
               disableRipple
               aria-label="user-account"
               aria-controls="menu-appbar"
               aria-haspopup="true"
               sx={{color:'black'}}
               edge='end'
              
             
             
             >
              <Link to={`/cart `} >
                <Baged badgeContent={cart} sx={{display:'flex'}} color='primary' >
                <ShoppingBagOutlinedIcon/>
                </Baged>
              
              </Link>
               
             </IconButton>
            </Box>
           </Toolbar>
           <Drawer
            onClose={handleSearchClose}
            anchor='top'
            variant="temporary"
            open={searchClick}
            sx={{flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: '100%',height:'100px',display:'flex',justifyContent:'center',alignItems:'center', position:'absolute',top:50,zIndex:1}}}
            >
            <SearchAppBar />
            </Drawer> 
          </Container>
      </AppBar>

    )
}



export default NavBar;