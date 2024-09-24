const AdminProductSchema = require("../models/adminField"); // store data

exports.AddProductControler = async (req, res) => {
    try {
        const { title, description, price, rating } = req.body; // Correct destructuring
        const record = new AdminProductSchema({
            ptitle: title,
            pdesc: description,
            pprice: price,
            prating: rating
        });

        await record.save(); // Save the record in the database
        
        res.status(201).json({ message: "Product added successfully!" }); // Send success response
    } catch (error) {
        res.status(500).json({ error: "Failed to add product", details: error.message }); // Send error response
    }
};

exports.alladminproductControler= async(req,res)=>{
   const record = await AdminProductSchema.find()
   res.json({data:record})
}



exports.updateadminproductControler = async (req,res)=>{
const id = (req.params.id)
        const record  = await AdminProductSchema.findById(id)
            res.json({data:record})
}

exports.updatesingleproduct = async(req,res)=>{
const {ptitle,pdesc , pprice ,prating } =   req.body
  const id  = req.params.id
    
    const record  =  await AdminProductSchema.findByIdAndUpdate(id,{
    
        ptitle:ptitle,
        pdesc:pdesc,
        pprice:pprice,
        prating:prating
      })
            res.json({message:"Successfully Update data.."})
}

exports.deletesingleproduct = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await AdminProductSchema.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Successfully deleted product" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
};
exports.deletesingleproduct = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await AdminProductSchema.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Successfully deleted product" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product" });
    }
};
