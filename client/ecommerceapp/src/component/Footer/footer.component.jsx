import React from 'react';
import { Box, Container} from '@mui/system';
import { Stack, Typography } from '@mui/material';



const Footer=()=>{
    return(
        
         <Box sx={{backgroundColor:'black',height:'100%',width:'100%'}}>
            <Stack direction='row' justifyContent='center' pt={3} alignItems='flex-end'>
            <Typography color='white' variant='h2'>My footer</Typography>
            </Stack>
         
         </Box>
        
          
    )
}

export default Footer;