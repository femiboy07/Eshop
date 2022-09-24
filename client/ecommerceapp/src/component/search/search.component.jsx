import React from 'react';
import SearcIcon from '@mui/icons-material/Search';

import { alpha } from '@mui/material';
import { InputBase } from '@mui/material';
import { Box,Container } from '@mui/system';
import styled from '@emotion/styled';






const Search=styled('div')(({theme})=>({
    position:'relative',
    borderRadius:theme.shape.borderRadius,
    backgroundColor:alpha(theme.palette.common.white),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white),
    },
    marginLeft:'0',
    width:'100%',
    [theme.breakpoints.up('sm')]:{
        marginLeft:theme.spacing(1),
        width:'500px',
        
    },

    [theme.breakpoints.down('sm')]:{
       width:'auto',
       marginLeft:theme.spacing(0),
        
    }


}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0,2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase=styled(InputBase)(({ theme }) => ({
    color: 'black',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
      border:'1px solid black',
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        minWidth: '400px',

      },
      [theme.breakpoints.down('sm')]: {
        width: '250px',

      }, 
    },
}));


const SearchAppBar=()=>{
    return(
    
        <Search>
            <SearchIconWrapper>
                <SearcIcon/>
            </SearchIconWrapper>
          <StyledInputBase
             placeholder="Search"
            inputProps={{'aria-label':'search'}}
            />
        </Search>

    
    )
}



export default SearchAppBar;