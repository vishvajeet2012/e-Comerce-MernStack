  const mongoose = require("mongoose") 
  const {Schema, model}= mongoose

     const QuerySchema =   new Schema ({
            UserMail:String
            ,userQuery:String,
            queryStatus:{type:String,default:"Unread"}
     })


     module.exports = model("Query", QuerySchema)