import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import NavBar from './component/Header/Header.component';
import HomePage from './pages/HomePage/Home.Pages';
import ProductPage from './pages/ProductPage/Product.Pages';
import LoginPage from './pages/LoginPage/login.Pages';
import CartPage from './pages/CartPage/Cart.Pages';
import { Box } from '@mui/system';
import SearchPage from './pages/SearchPage/SearchPage';
import Footer from './component/Footer/footer.component';
import Protected from './component/ProtectedRoute/ProtectedRoute.components';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSuccess from './component/CheckOut-Success/checkotsuccess.component';

import './App.css';
import { setUser } from './redux/features/authReducer';

const App = () => {
        const dispatch = useDispatch();
        const {token}=useSelector(state=>state.auth);
        const  user= JSON.parse(localStorage.getItem("users") || "{}");
        console.log(user)
        useEffect(()=>{
        if(token){
        dispatch(setUser(user));
        }
        },[token,dispatch,user])

        return ( 
            <>
            <NavBar/>
            <Routes >
            <Route exact path = '/page/:pageNumber'element = { < HomePage / > }/>   
            <Route path = '/product/:itemId' element = {<ProductPage/>}/>  
            <Route path = '/cart'element = {<Protected>
            {user ? <CartPage / >: null}
            </Protected>} />
            <Route path = '/login'element = { < LoginPage/>}/>
            <Route path='/search' element ={<SearchPage/>}/>
            <Route path = '/' element = { <HomePage/>}/>
            <Route path='/checkout-success' element={<CheckoutSuccess/>}/>  
            </Routes >
            </>

            )


        }
export default App;