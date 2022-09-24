import React,{useState} from 'react';
import { Rating, Typography } from '@mui/material';
import { Box } from '@mui/system';



const RatingValue=(props)=>{
    const {rating,numReviews,caption}=props;
   return(
       <Box sx={{display:'flex',pl:2}}>
           <Box component='span'>
               <Rating
               name='read-only'
               value={rating}
               precision={0.5}
               readOnly
               />

           </Box>
           {caption ? <Typography>
               {caption}
           </Typography>:(
               <Typography variant='subtitle2'>{'' + numReviews + 'reviews'}</Typography>
           )}
       </Box>
  )

}

export default RatingValue;