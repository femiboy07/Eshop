import React, { useState } from 'react';
import {Button,Box,Menu,MenuItem,styled,List, ListItemText, Typography} from '@mui/material';
import KeyBoardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyBoardArrowTopIcon from '@mui/icons-material/KeyboardArrowUp';
import { alpha } from '@mui/material';



const StyledMenu=styled((props)=>(
   <Menu
     elevation={0}
     anchorOrigin={{
         vertical:'bottom',
         horizontal:'left'
     }}
     transformOrigin={{
         vertical:'top',
         horizontal:'left'

     }}
     {...props}
     />
))(({theme})=>({
    '& .MuiPaper-root':{
        borderRadius:6,
        marginTop:theme.spacing(1),
        minWidth:180,
        color:'rgb(55, 65, 81)',
        boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',

      '& .MuiMenu-List':{
          textAlign:'center',
          padding:'4px 0px',

      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        }
    },

      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      }

    }

}))


const LinkHeader=()=>{

    const Bag='Bag';
    const Shoe='Shoe';
    const [link,setLink]=useState(null);
    const [link2,setLink2]=useState(null);
    const open=Boolean(link);
    const open2=Boolean(link2);
    const handleClick2=(event)=>{
        setLink2(event.currentTarget);
    }

    const handleClick=(event)=>{
        setLink(event.currentTarget);
    }

    const handleClose = () => {
        setLink(null);
      };
      const handleClose2 = () => {
        setLink2(null);
      }; 

      return (
        <Box sx={{display:'flex'}}>
            
            <Button 
            endIcon={link ? <KeyBoardArrowTopIcon/>:<KeyBoardArrowDownIcon/>}
            id='bag-id'
            aria-haspopup='false'
            variant="none"
            aria-expanded={open ? 'true':undefined}
            onClick={handleClick}
            sx={{ my: 2, color: 'black', display: 'flex',pl:1 ,pr:1}}
            disableElevation
            LinkComponent='a'
            >
            <Typography variant='body1' fontSize={15}>
            {Bag.toLowerCase()}
            </Typography>
            </Button>
            <Button 
            endIcon={link2 ? <KeyBoardArrowTopIcon/>:<KeyBoardArrowDownIcon/>}
            id='Shoe-id'
            
            // aria-haspopup='menu'
            variant="none"
            aria-expanded={open2 ? 'true':undefined}
            onClick={handleClick2}
            sx={{ my: 2, color: 'black', display: 'flex',pl:1 ,pr:1}}
            disableElevation
            LinkComponent='a'
            >
            <Typography variant='subtitle2' >
              Shoe
            </Typography>
            </Button>
 
         <StyledMenu 
           id='bag-id'
            MenuListProps={{
            'aria-labelledby': 'bag-id',
            }}
           anchorEl={link}
           open={open}
           onClose={handleClose}
            >
             <MenuItem onClick={handleClose} disableRipple>
              All
             </MenuItem>


          </StyledMenu>

          <StyledMenu 
           id='Shoe-id'
            MenuListProps={{
            'aria-labelledby': 'Shop-id',
            }}
           anchorEl={link2}
           open={open2}
           onClose={handleClose2}
            >
             <MenuItem onClick={handleClose2} disableRipple>
              Shop All
             </MenuItem>


          </StyledMenu>
          </Box>
    )
    
        
    
}


export default LinkHeader;