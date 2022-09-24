import React from 'react';
import {Box,ListItem,ListItemButton,ListItemText,List, IconButton} from '@mui/material';
import RightArrowicon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';






 





  
const ListedDrawer=(props)=>{
    return(
    <Box sx={{width:'100%',backgroundColor:'white',overflow:'hidden'}} role='presentation' onClick={props.handleBar} onKeyDown={props.handleBar}>


        <List sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',width:'500px',height:'100vh'}}>
         {['Bag','Shoe'].map((item)=>{
           return(
           <ListItem key={item} sx={{width:'100%'}}>
             <ListItemButton sx={{color:'black'}}>
               <ListItemText primary={item}/>
             </ListItemButton>
           </ListItem>
           )
         })}
    </List>
   </Box>
)
}


export default ListedDrawer;