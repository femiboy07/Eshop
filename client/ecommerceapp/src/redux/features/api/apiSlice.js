import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setUser,logOut } from '../authReducer';



// import { RootState } from '../../store';

const baseQuery=fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    credentials:'include',

    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.append('authorization', `Bearer ${token}`)
        }
        return headers;
    },
})
const baseQuerywithReAuth=async(args,api,extraOptions)=>{
    let result=await baseQuery(args,api,extraOptions);
    if(result.error && result.error.status === 403 ){
      const refreshResult=await baseQuery({url:'api/user/refreshtoken',credentials:'include'},api,extraOptions);
      if(refreshResult?.data){
        // const user=api.getState().auth.user;
        const data=refreshResult?.data;
        api.dispatch(setUser({name:data.name,token:data.token,userId:data._id,}));
        result=await baseQuery(args,api,extraOptions);
        
      }else{
       const losecookie=await baseQuery('api/user/logout',api,extraOptions);
       if(losecookie){
         api.dispatch(logOut())
       }
      }
    
    }
    return result;
}


export const apiSlice = createApi({
    reducerPath: 'apiOne',
    baseQuery:baseQuerywithReAuth,
    // tagTypes: ['Products'],
    endpoints: builder => ({

        getProducts: builder.query({
            query: (page = 1) => `api/products?page=${page}`,
            providesTags: ['Products']
        }),
        getProduct: builder.query({
            query: (itemId) => `api/admin/products/${itemId}`,

        }),
        editProduct: builder.mutation({
            query: (itemId) => ({
                url: `api/product/${itemId}`,
                method: 'PUT',
                body: itemId,

            }),
            // invalidatesTags: (result, error, arg) => [{ type: 'Products', id: arg.id }]
        }),
        // productReview:builder.mutation({
        //     query:({itemId,...body})=>({
        //         url:`api/products/${itemId}`,
        //         method:'POST',
        //         body:body
        //     })
        // })

    })



});

export const { useGetProductsQuery, useGetProductQuery, useEditProductMutation,useProductReviewMutation } = apiSlice;
export const authSlice = createApi({
    reducerPath: 'apiTwo',
    baseQuery:baseQuerywithReAuth,
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (body) => ({
                url: `api/user/login`,
                method: 'POST',
                body: body,

            })
        }),
        protected: builder.mutation({
            query: (id) => `api/cart/${id}`
        }),


    })
})


export const cartSlices = createApi({
    reducerPath: 'apiThree',
    baseQuery:baseQuerywithReAuth,
    tagTypes: ['Carts'],
    endpoints: (builder) => ({
       getCart: builder.mutation({
            query: (userId) => `api/cart/${userId}`,
            
          }),

      addToCart: builder.mutation({
            query: ({ userId, ...body }) => ({
                url: `api/cart/${userId}`,
                method: 'POST',
                body: body,
                
                
             }),
            providesTags: ['Carts']
        }),
     })
})



export const { useLoginUserMutation, useProtectedMutation } = authSlice;
export const { useAddToCartMutation, useGetCartMutation } = cartSlices;