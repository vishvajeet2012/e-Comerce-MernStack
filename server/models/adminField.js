const mongoose =require("mongoose")
           const  {Schema,model} =  mongoose

      const  AdminProductSchema = new Schema({
            ptitle:String,
            pdesc:String,
            pprice:Number,
            prating:Number,
            ProductStatus:{type:String,default:"OUT-OF-STOCK"}

            }
          )


          module.exports =model("AdminProducts" , AdminProductSchema)