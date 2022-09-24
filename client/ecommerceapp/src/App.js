import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import NavBar from './component/Header/Header.component';
import HomePage from './pages/HomePage/Home.Pages';
import ProductPage from './pages/ProductPage/Product.Pages';
import LoginPage from './pages/LoginPage/login.Pages';
import CartPage from './pages/CartPage/Cart.Pages';
import { Box } from '@mui/system';
import Footer from './component/Footer/footer.component';
import Protected from './component/ProtectedRoute/ProtectedRoute.components';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSuccess from './component/CheckOut-Success/checkotsuccess.component';

import './App.css';
import { setUser } from './redux/features/authReducer';

const App = () => {
        const dispatch = useDispatch();
        // const {token}=useSelector(state=>state.auth);
        // const  user= JSON.parse(localStorage.getItem("users") || "{}");
        // useEffect(()=>{
        // dispatch(setUser(user));
        // },[])

        return ( 
            <Box >
            <NavBar/>
            <Routes >
            <Route exact path = '/page/:pageNumber'element = { < HomePage / > }/>   
            <Route path = '/product/:itemId' element = {<ProductPage/>}/>  
            { /* <Route  path='/cart/:itemId' element={<CartPage/>}/> */ }
             <Route path = '/cart'element = { < Protected >
            <CartPage / >
            </Protected>} />
            <Route path = '/login'element = { < LoginPage / > }/>
            <Route path = '/' element = { < HomePage / > }/>
            <Route path='/checkout-success' element={<CheckoutSuccess/>}/>  
            </Routes >
            </Box>

            )


        }

        export default App;