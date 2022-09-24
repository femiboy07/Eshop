const User = require('../models/User');
const Product = require('../models/Product')



const getAdminUsers = async(req, res) => {
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
        await User.find({...keyword }).limit(pageSize).skip(pageSize * (page - 1)).then((users) => {

            res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
            res.setHeader('Content-Range', `users 0 - 2 / ${users.length}`);



            const user = users.map(resource => ({...resource,
                id: resource._id,
                name: resource.name,
                email: resource.email,


            }))
            res.status(200).json(user)

        })
    } catch (err) {

        console.log('Admin cant find Users.....!', err);
    }

}


const getIndividualUser = async(req, res) => {
    const { id } = req.params;

    // const { FirstName, LastName, Email } = req.body;

    try {

        //   User.findOne({ _id: id }).exec((err, users) => {
        //     res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        //     res.setHeader('Content-Range', `users 0 - 2 / ${users.length}`);
        //     if (err) console.log('cant update_________!!', err);


        //     res.status(200).json({ data: { users } });

        User.findOne({ _id: id }).then((user) => {
            user = JSON.parse(
                JSON.stringify(user)
                .split('"_id":')
                .join('"id":')
            )
            res.status(200).json(user);
        })


    } catch (err) {

        res.status(500).json({ message: 'Bad message' });


    }


}


const deleteUser = async(req, res) => {

    try {
        User.deleteOne({ _id: req.params.id }).then((user) => {
            user = JSON.parse(
                JSON.stringify(user)
                .split('"_id":')
                .join('"id":')
            )

            res.status(200).json(user)
        })
    } catch (err) {
        res.status(500).send('not able to delete')
    }

}


const queryUsers = async(req, res) => {


    try {




        User.find({
            "$in": [
                { name: { $regex: req.params.key } }
            ]
        }).then((user) => {

            res.status(200).send(user);
        })


    } catch (err) {
        res.status(500).send('invalid');
    }

}


// Price: Number,
//       Picture: String,
//       Color: String,
//       Description: String,
//       Category: String,

const createProducts = async(req, res) => {
    const { name, description, category, brand, countInStock, numReviews, image } = req.body;
    const Pro = new Product({
        name,
        description,
        category,
        brand,
        countInStock,
        numReviews,
        image,

    });

    try {

        await Pro.save();

        res.status(200).json({ Pro });
    } catch (err) {

        console.log(err);
        res.status(403).json({ message: "cant insert data" });

    }

}


const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, description, category, price, image, brand, countInStock } = req.body;



    Product.findById(id).exec((err, products) => {
        if (err) console.log('Update product______________!!', err);

        // res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
        // res.setHeader('Content-Range', `users 0 - 2 / ${products.length}`);

        products.name = name;
        products.description = description;
        products.category = category;
        products.price = price,
            products.countInStock = countInStock;
        products.image = image;
        products.brand = brand;

        products.save();

        res.status(200).json({ products });
    });


}

const deleteProduct = async(req, res) => {
    const { id } = req.params;

    try {

        await Product.deleteOne({ _id: id }).then((product) => {

            res.status(200).json(product);

        })

    } catch (err) {
        res.status(400).json({ message: err });

    }


}


const updateUser = async(req, res) => {
    const { id } = req.params;

    try {
        User.updateOne({ _id: id }, req.body)
            .then((user) => {
                user = JSON.parse(
                    JSON.stringify(user)
                    .split('"_id":')
                    .join('"id":')
                )
                res.status(200).json(user);
            })

    } catch (err) {
        res.status(500).send('creation failed');
    }
}





module.exports = {
    getAdminUsers,
    createProducts,
    deleteProduct,
    updateProduct,
    getIndividualUser,
    updateUser,
    queryUsers,
    deleteUser,



}