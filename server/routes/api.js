const router = require("express").Router();  // Importing Express Router
const controllers = require("../controllers/user");
const AdminController = require("../controllers/Admin")

// Route for homepage - GET request to '/'
router.get("/", controllers.homepagecontroler);

// Route for Vishu's page - GET request to '/vv'
router.get("/vv", controllers.vishupagecontroler);

// Route to handle registration data - POST request to '/regidata'
router.post("/regidata", controllers.regidatacontroler);
 

router.post("/logindata" ,controllers.LoginDataControler)

router.post("/adminProduct", AdminController.AddProductControler)
router.get("/alladminproduct", AdminController.alladminproductControler)
router.get("/updateadminProduct/:id", AdminController.updateadminproductControler)
router.put("/updatesingleproduct/:id", AdminController.updatesingleproduct)
router.delete("/adminProductdelete/:id" , AdminController.deletesingleproduct)

/////////////////////// User Product router ////////////////////////////////////////////////
router.get("/Product", controllers.eproductControler  )

module.exports = router;