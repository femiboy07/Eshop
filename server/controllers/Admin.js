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
    const count = await User.countDocuments({...keyword })
        await User.find({...keyword }).limit(pageSize).sort([['name','asc']]).skip(pageSize * (page - 1)).then((users) => {
            res.setHeader('Access-Control-Expose-Headers', 'Content-Range');
            res.setHeader('Content-Range', `users 0 - 2 / ${users.length}`);
       const user = users.map(resource => ({...resource,
                id: resource._id,
                name: resource.name,
                password:resource.password,
                email: resource.email,
                Admin:resource.isAdmin
}))
           return res.status(200).json(user)

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
    
    const {name,brand,rating,description,categories,ProductType}=req.body;
     console.log(req.file)
     console.log(req.protocol)
     const url = req.protocol + '://' + req.get("host") ;
     const img1=[];
     

const file1=req.files;
console.log(file1)
for(var files of file1){
    img1.push(files.path)
}


    try{
       if(!(name && brand && rating && description && categories && ProductType  )){
          return res.status(400).send('all inputs required');
        }else{
         const products=new Product({
            ...req.body,
            image:img1.map(i=>url + '/' + i),
         });

      await products.save();
      
      res.status(201).send(products);
    }
        
    }catch(err){
        res.status(400).json({message:err.message});

    }
}

const createProductParts=async(req,res)=>{
    const {color,countInStock,price,size}=req.body;
    const id=req.params.id;
    console.log(req.file)
     console.log(req.protocol)
     const url = req.protocol + '://' + req.get("host") ;
     

     try{
       const product= await Product.findById(id);
       const part={
        color,
        countInStock,
        partimage:  url + '/' + req.file.path,
        price
       }
       product.parts.push(part);
       await product.save();

       res.status(200).send(product);
         
     }catch(err){
        res.status(400).json({message:err.message});
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

// const addmoreImage=async(req,res)=>{
//     const id=req.params.id;
//     const color=req.body;
//     try{
//        const findproduct=await Product.findById(id);;
         
       
//     }catch{

//     }
// }





module.exports = {
    getAdminUsers,
    createProducts,
    deleteProduct,
    updateProduct,
    createProductParts,
    getIndividualUser,
    updateUser,
    queryUsers,
    deleteUser,
}