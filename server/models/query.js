  const mongoose = require("mongoose") 
  const {Schema, model}= mongoose

     const QuerySchema =   new Schema ({
            UserMail:String
            ,userQuery:String
     })


     module.exports = model("Query", QuerySchema)