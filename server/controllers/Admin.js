
const AdminProductSchema = require("../models/adminField"); // store data
    const queries =require("../models/query")
    const nodemailer = require("nodemailer");


 

exports.AddProductControler = async (req, res) => {
    try {
        const { title, description, price, rating } = req.body; // Correct destructuring
        const record = new AdminProductSchema({
            ptitle: title,
            pdesc: description,
            pprice: price,
            prating: rating
        });

        await record.save(); 
        
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
    console.log(req.body)
const {ptitle,pdesc , pprice ,prating ,ProductStatus} =   req.body
  const id  = req.params.id
    
    const record  =  await AdminProductSchema.findByIdAndUpdate(id,{
    
        ptitle:ptitle,
        pdesc:pdesc,
        pprice:pprice,
        prating:prating,
        ProductStatus:ProductStatus
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

exports.userQueryControler =  async(req, res) =>{
      const record=   await queries.find()
            res.json({data:record})
}

exports.queryreplaydata = async (req,res) =>{ 
 const id= await req.params.id
      const record = await queries.findById(id)
      res.json({data:record})


}


exports.QueryReplaysendcontroler = async (req, res) => {
    const { toEmail, fromEmail, subject, body } = req.body;

   
    if (!toEmail || !fromEmail || !subject || !body) {
        return res.status(400).json({ success: false, message: 'All fields are required!' });
    }

   
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    if (!isValidEmail(toEmail) || !isValidEmail(fromEmail)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }

    try {
        
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: 'djritikshukla@gmail.com', 
                pass: 'xinkmlmhpwkjjtov',        
            },
        });

        const info = await transporter.sendMail({
            from: fromEmail,   
                    to: toEmail, 
            subject: subject, // Subject line
            text: body, // plain text body
            html: `<p>${body}</p>`, // html body
        });

        console.log("Message sent: %s", info.messageId);

        return res.status(200).json({ success: true, message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ success: false, message: 'Failed to send email.' });
    }
};