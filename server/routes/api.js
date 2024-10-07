const router = require("express").Router();
const controllers = require("../controllers/user");
const AdminController = require("../controllers/Admin");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null, path.join(__dirname, "../public/upload")); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/; 
    const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extName && mimetype) {
        return cb(null, true); 
    }
    cb(new Error("Error: File type not supported"), false); 
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, 
    fileFilter: fileFilter 
});

router.get("/", controllers.homepagecontroler);
router.get("/vv", controllers.vishupagecontroler);
router.post("/regidata", controllers.regidatacontroler);
router.post("/logindata", controllers.LoginDataControler);
router.post("/adminProduct", upload.single("imgUp"), AdminController.AddProductControler);
router.get("/alladminproduct", AdminController.alladminproductControler);
router.get("/updateadminProduct/:id", AdminController.updateadminproductControler);
router.put("/updatesingleproduct/:id", AdminController.updatesingleproduct);
router.delete("/adminProductdelete/:id", AdminController.deletesingleproduct);
router.get("/queries", AdminController.userQueryControler);
router.get("/queryreply/:id", AdminController.queryreplaydata);
router.post("/sendreply", AdminController.QueryReplaysendcontroler);
router.patch("/queriesStatus/:id", AdminController.updateQueryStatus);
router.get("/Product", controllers.eproductControler);
router.post("/querydata", controllers.querydataControler);

module.exports = router;
