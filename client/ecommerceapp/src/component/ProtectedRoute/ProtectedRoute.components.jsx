import React from 'react';
import LoadingToRedirect from '../LoadingToRedirect/LoadingToRedirect.component';
import { useSelector } from 'react-redux';





const Protected=({children})=>{
    const token=useSelector(state=>state.auth.token );
    return (
        token ? children :<LoadingToRedirect/>
    )
}

export default Protected;