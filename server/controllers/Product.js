const Product = require('../models/Product');
const expressAsyncHandler = require('express-async-handler');




const readAllProduct = async(req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;


    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        },
    } : {};


    try {
        const count = await Product.countDocuments({...keyword })
        await Product.find({...keyword }).limit(pageSize).skip(pageSize * (page - 1)).then((product) => {
            res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
            res.setHeader('Content-Range', `products 0 - 2 / ${product.length}`);


            const products = product.map(resource => ({...resource,
                id: resource._id,
                name: resource.name,
                description: resource.description,
                categories: resource.categories,
                image: resource.image,
                parts:resource.parts,
                numReviews: resource.numReviews,
                ProductType:resource.ProductType,
                brand: resource.brand,
                rating: resource.rating,
                createdAt: resource.createdAt,



            }))

            res.status(200).json(products);

        })

    } catch (err) {
        res.status(400).json({ message: "sorry can get users" });
    }
}

const readProduct = async(req, res) => {
    const { id } = req.params;

    try {
     const product=await Product.findById({_id:id});
        return res.status(200).json(product)
    } catch (err) {
        res.status(400).json({ message: 'cant get the id of product' });
    }
}


const getTopProducts = async(req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
}
const page_size = 3;

const searchProducts = async(req, res) => {
    const pageSize = req.query.pageSize || page_size;
    const page = req.query.page || 1;
    const categories = req.query.categories || '';
    const price = req.query.price || '';
    const order = req.query.order || '';
    const searchQuery = req.query.q || '';
    const rating = req.query.rating || '';
    // const color=req.query.color || '';
    const producttypefilter=req.query.ProductType || '';

    try {

        // const colorFilter=color && color !== 'all' ? {
        //     color:{
        //         $regex : color,
        //         $options : 'i',
            
        //     },
        // }:{};
        const queryFilter =
        searchQuery && searchQuery !== 'all' ? {
          "$or":[
            {name: {
                $regex: searchQuery,
                $options: 'i',
            }},
            {brand:{
                $regex:searchQuery,
                $options:'i'
            }},
           {'parts.color':{
               $regex:searchQuery,
               $options:'i'
           }}
            
          ]
        } : {};


            // const producttypefilter=producttypefilter && producttypefilter !== 'all' ?{
                
            // }

        const categoryFilter = categories && categories !== 'all' ? { categories } : {};
        const ratingFilter =
            rating && rating !== 'all' ? {
                rating: {
                    $gte: Number(rating),
                },
            } : {};

        const priceFilter =
            price && price !== 'all' ? {
                // 1-50
                price: {
                    $gte: Number(price.split('-')[0]),
                    $lte: Number(price.split('-')[1]),
                },
            } : {};
        const sortOrder =
            order === 'featured' ? { featured: -1 } :
            order === 'lowest' ? { price: 1 } :
            order === 'highest' ? { price: -1 } :
            order === 'toprated' ? { rating: -1 } :
            order === 'newest' ? { createdAt: -1 } : { _id: -1 };

        const products = await Product.find({
                ...queryFilter,
                ...categoryFilter,
                ...priceFilter,
                ...ratingFilter,
                
            })
            .sort(sortOrder)
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        const countProducts = await Product.countDocuments({
            ...queryFilter,
            ...categoryFilter,
            ...priceFilter,
            ...ratingFilter,
        
        });
        res.status(201).send({
            products,
            countProducts,
            page,
            pages: Math.ceil(countProducts / pageSize),
        });


    } catch {

        res.status(400).send('cant filter products')

    }
}
const getReviews=async(req,res)=>{
    const {reviews}=req.params;
    try{
        const reviews= await Product.findById(reviews).select('reviews');
          return res.status(200).json(reviews);
    }catch(error){
        res.status(400).send(error)

    }
}

const getProductCategories = async(req, res) => {
    try {
        const categories = await Product.find().distinct('categories');
        res.status(200).send(categories);
    } catch {
        res.status(400).send('invalid request');

    }

}

const searchMultipleFields=async(req,res)=>{
    const searchQuery=req.params.key;
    const queryFilter =
    searchQuery && searchQuery !== 'all' ? {
      "$or":[
        {name: {
            $regex: searchQuery,
            // $options: 'i',
        }},
        {brand:{
            $regex:searchQuery,
            // $options:'i'
        }},
       {'parts.color':{
           $regex:searchQuery,
        
        //    $options:'i'
       }}
        
      ]
    } : {};
    try{
     const findsearh=await Product.find({...queryFilter}).limit(5).select('parts');

       res.status(200).send(findsearh)
    }catch(err){
      res.status(400).send(err)
    }
}

const userlistAllProduct = async(req, res) => {
    const pageSize = req.query.pageSize || page_size;
    const page = req.query.page || 1;
    const searchQuery = req.query.q || '';

    const queryFilter =
        searchQuery && searchQuery !== 'all' ? {
            "$or":[
            {name: {
                $regex: searchQuery,
                $options: 'i',
            }},
            {color:{
                $regex:searchQuery,
                $options:'i'
            }}
            ]
        } : {};

    try {
        const countProducts = await Product.countDocuments({...queryFilter });
        await Product.find({...queryFilter }).skip(pageSize * (page - 1)).limit(pageSize).then((product) => {
            res.status(200).json({
                product: product,
                countProducts,
                page,
                pages: Math.ceil(countProducts / pageSize)
            });
        })
    } catch {

        res.status(400).send('cant get list of products');

    }


}


const readAllProducts = async(req, res) => {
    const PAGESIZE = 8
    const pageSize = req.query.pageSize || PAGESIZE;
    const page = req.query.page || 1;
    try {
        const products = await Product.find().skip(pageSize * (page - 1)).limit(pageSize);
        const count = await Product.countDocuments();
        const totalPages = Math.ceil(count / pageSize);
        const currentPage = Math.ceil(count % pageSize * (page - 1));
        res.status(200).send(
            products, totalPages, page, pageSize

        );
    } catch (err) {
        res.status(500).json({ message: 'Bad request' })
    }
};


const createProductReview = expressAsyncHandler(async(req, res) => {
    const { rating, comment } = req.body;
    const { id } = req.params;



    const product = await Product.findById(id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length

        await product.save()
        res.status(201).send({ message: 'Review added',product })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

module.exports = { readAllProduct, readAllProducts, createProductReview, readProduct, getTopProducts, getProductCategories, searchProducts, userlistAllProduct,
    searchMultipleFields,getReviews };