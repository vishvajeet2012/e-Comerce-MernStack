const mongoose =require("mongoose")
           const  {Schema,model} =  mongoose

      const  AdminProductSchema=   new Schema({
            ptitle:String,
            pdesc:String,
            pprice:Number,
            prating:Number
          })


          module.exports =model("AdminProducts" , AdminProductSchema)