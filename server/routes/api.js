const router = require("express").Router();  // Importing Express Router
const controllers = require("../controllers/user");
const AdminController = require("../controllers/Admin");
const multer = require("multer");
const path = require("path");

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // Corrected from 'cd' to 'cb'
        cb(null, path.join(__dirname, "../public/upload")); // Set upload destination
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set unique filename
    }
});

// File filter to restrict allowed file types
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/; // Allowed file types
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extName && mimetype) {
        return cb(null, true); // Accept the file
    }
    cb(new Error("Error: File type not supported"), false); // Reject the file
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // Limit file size to 5 MB
    fileFilter: fileFilter // Apply the file filter
});

// Route for homepage - GET request to '/'
router.get("/", controllers.homepagecontroler);

// Route for Vishu's page - GET request to '/vv'
router.get("/vv", controllers.vishupagecontroler);

// Route to handle registration data - POST request to '/regidata'
router.post("/regidata", controllers.regidatacontroler);

// Route for user login - POST request to '/logindata'
router.post("/logindata", controllers.LoginDataControler);

// Route to add a new product - POST request to '/adminProduct'
router.post("/adminProduct", upload.single("imgUp"), AdminController.AddProductControler);

// Route to get all admin products - GET request to '/alladminproduct'
router.get("/alladminproduct", AdminController.alladminproductControler);

// Route to get a specific product for update - GET request to '/updateadminProduct/:id'
router.get("/updateadminProduct/:id", AdminController.updateadminproductControler);

// Route to update a single product - PUT request to '/updatesingleproduct/:id'
router.put("/updatesingleproduct/:id", AdminController.updatesingleproduct);

// Route to delete a single product - DELETE request to '/adminProductdelete/:id'
router.delete("/adminProductdelete/:id", AdminController.deletesingleproduct);

// Route to get user queries - GET request to '/queries'
router.get("/queries", AdminController.userQueryControler);

// Route to get replies for a specific query - GET request to '/queryreply/:id'
router.get("/queryreply/:id", AdminController.queryreplaydata);

// Route to send replies to queries - POST request to '/sendreply'
router.post("/sendreply", AdminController.QueryReplaysendcontroler);

// Route to update the status of queries - PATCH request to '/queriesStatus/:id'
router.patch("/queriesStatus/:id", AdminController.updateQueryStatus);

// User Product routes
router.get("/Product", controllers.eproductControler); // Get products
router.post("/querydata", controllers.querydataControler); // Submit query data

module.exports = router; // Export the router
