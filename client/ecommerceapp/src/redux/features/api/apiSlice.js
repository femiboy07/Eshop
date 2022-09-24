import { useRadioGroup } from '@mui/material';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { result } from 'lodash';
// import { RootState } from '../../store';


export const apiSlice = createApi({
    reducerPath: 'apiOne',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
    tagTypes: ['Products'],
    endpoints: builder => ({

        getProducts: builder.query({
            query: (page = 1) => `api/products?page=${page}`,
            providesTags: ['Products']

        }),
        getProduct: builder.query({
            query: (itemId) => `api/product/${itemId}`,

        }),
        editProduct: builder.mutation({
            query: (itemId) => ({
                url: `api/product/${itemId}`,
                method: 'PUT',
                body: itemId,

            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Products', id: arg.id }]
        })

    })



});

export const { useGetProductsQuery, useGetProductQuery, useEditProductMutation } = apiSlice;
export const authSlice = createApi({
    reducerPath: 'apiTwo',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.append('authorization', `Bearer ${token}`)
            }
            return headers;
        }


    }),
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
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/',

    }),
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