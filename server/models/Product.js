  const mongoose = require('mongoose');
  const { Schema } = mongoose;


  const reviewSchema =new Schema({
      name: { type: String},
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User',
      },
  }, {
      timestamps: true,
  })

  const partsSchema=new Schema({
            partimage:{
                type:String,
                required:true
            },
            color:{
                type:String,
                required:true
            },
            size:Number,
        
            countInStock:{
                    type:Number,
                    required:true,
                    default:0
            },
            price:{
                  type:Number,
                  required:true,
                  default:0
            }
            
  },{
    timestamps:true
  })



  const ProductSchema =new Schema({
     name: {
          type: String,
          required: true
      },
      image:[String],
    
      brand: {
          type: String,
          required: true,
      },
      category: {
          type:String,
          required: true,
      },
      ProductType:{
         type:String,
         required:true
      },
      description: {
          type: String,
          required: true,
      },
      reviews: [reviewSchema],
      parts:[partsSchema],
      rating: {
          type: Number,
          required: true,
          default: 0,
      },
      numReviews: {
          type: Number,
          required: true,
          default: 0,
      },
     
          
}, {
 toJSON:{virtuals:true},
timestamps: true,
  })

  ProductSchema.virtual('id').set(function(id){
     this._id=id;
     this.parts._id=id;
  })

 const Product = mongoose.model('Product', ProductSchema);
 module.exports = Product;