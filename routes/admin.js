const express = require("express");
const router = express.Router();
const adloginController = require("../controllers/admin/adloginController");
const adminCategory = require('../controllers/admin/adminCategory')
const usersController = require("../controllers/users/usersController");
const adminProductController = require('../controllers/admin/adminProductController')
const adminBrandController = require('../controllers/admin/adminBrandController')
const adminUserController = require('../controllers/admin/adminUserController')
const multer = require('multer');
const adminBannerController = require('../controllers/admin/adminBannerController');
const userManagementHelper = require("../models/userManagementHelper");
const adminCoupenController = require('../controllers/admin/adminCoupenController')
const adminPanelController = require('../controllers/admin/adminPanelController')
const reportController = require('../controllers/admin/reportController')

//Multer Start
const {storage} = require('../cloudinary/index')
const upload = multer({ storage });



// const storage = multer.diskStorage({
//     destination: './public/images',
//     filename:(req, file, cb)=>{
//         cb(null, Date.now()+file.originalname)
//     }
// })
// const upload = multer({
//     storage: storage,
//     fileFilter:(req,file,cb)=>{
//         if(
//             file.mimetype == 'image/jpeg'|| 
//             file.mimetype == 'image/jpg'||
//             file.mimetype == 'image/png' ||
//             file.mimetype == 'image/gif' ||
//             file.mimetype == 'image/webp'
//         ){
//             cb(null, true)
//         }else{
//             cb(null, false)
//             cb(new Error('only jpeg, jpg,png,gif and webp'))
//         }
//     }
// })
//Multer End


router.get("/", adloginController.loginview);
router.post("/home-admin", adloginController.adminLoginAction);






//+++++++++++++++++++++++++++++++++++++++++admin panel button to admin panel+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
router.get("/admin-panel", adloginController.adminPanelButtonController);
router.get('/adminLogout',adloginController.adminLogoutControllers)



//+++++++++++++++++++++++++++++++++++++++++ADMIN USER MANAGE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
router.get("/user-management", adminUserController.userManagement);
router.post('/userManagement/block',adminUserController.userBlock)
router.post('/userManagement/unblock',adminUserController.userUnblock)

// ----------------------------------------orders---------------------------------------------------------------------------------------
router.get('/orders',adminUserController.orderPage)
router.get('/orderId',adminUserController.viewProducts)
router.post('/orders/statusUpdate',adminUserController.updateOrderDetails)

router.get('/sales',reportController.getSalesReports)
//-------------------------------------------BRAND DETAILS----------------------------------------------------------------------------//
router.post("/brandCategory", adminBrandController.addBrandController);
router.post("/brandCategory", adminBrandController.brandSaveDatabaseController);
router.delete("/deleteBrand", adminBrandController.deleteBrandController);
router.get("/brandCategory", adminBrandController.brandController);


/******************************************************CATEGORY DETAILS*******************************************************************/
router.get("/adminCategory", adminCategory.catogoryPageController);
router.post("/adminCategory", adminCategory.addCategoryController);
// router.get("/deleteCategory", adminCategory.deleteCategoryController);
router.delete('/deleteCategory',adminCategory.deleteCategoryController)


//********************************************************PRODUCT DETAILS***************************************************************//
router.post('/addProduct',upload.single('productImage'),adminProductController.productAdding)
router.get('/product',adminProductController.productPage)
// router.get('/deleteProduct',adminProductController.productDelete)
router.get("/addProductPage", adminProductController.productForm);
router.post('/updateProductDetails',upload.single('productImage'),adminProductController.updateProductDetailsAction)
router.get('/addProductPage',adminProductController.adminAddProductPage)
router.post('/adminAddNewProduct',upload.single('productImage'),adminProductController.productAdding)
router.get('/showEditProductPage',adminProductController.updateProductDetails)
router.delete('/deleteProduct',adminProductController.productDelete)

//**********************************************************Admin Banner***************************************************************** */
router.get('/adminBanner',adminBannerController.showBannerPage)
router.post('/addNewBanner',upload.single("bannerImage"),adminBannerController.addBanner)
router.delete('/deleteBanner',adminBannerController.deleteBanner)
router.get("/adminBannerPage",adminBannerController.bannerRedirect)


// ********************************************************admin coupen*******************************************************************

router.get('/coupen',adminCoupenController.coupenPage)
router.post('/addCoupen',adminCoupenController.addCoupen)
router.delete('/deleteCoupen',adminCoupenController.deleteCoupen)


//page not found 
router.use((req,res,next)=>{
    res.status(404).render('users/404' ,{admin:false,user:false})
    next()
})

router.get('/orderCount',adminPanelController.orderStatus)
module.exports = router
