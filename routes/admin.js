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
const session = require('../middleware/adminSession')

const {storage} = require('../cloudinary/index')
const upload = multer({ storage });



router.get("/", adloginController.loginview);
router.post("/home-admin", adloginController.adminLoginAction);

router.get("/admin-panel", session.adminSession,adloginController.adminPanelButtonController);
router.get('/adminLogout',adloginController.adminLogoutControllers)

//+++++++++++++++++++++++++++++++++++++++++ADMIN USER MANAGE+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
router.get("/user-management",session.adminSession, adminUserController.userManagement);
router.post('/userManagement/block',adminUserController.userBlock)
router.post('/userManagement/unblock',adminUserController.userUnblock)

// ----------------------------------------orders---------------------------------------------------------------------------------------
router.get('/orders',session.adminSession,adminUserController.orderPage)
router.get('/orderId',adminUserController.viewProducts)
router.post('/orders/statusUpdate', adminUserController.updateOrderDetails)

router.get('/sales',reportController.getSalesReports)
//-------------------------------------------BRAND DETAILS----------------------------------------------------------------------------//
router.post("/brandCategory", adminBrandController.addBrandController);
router.post("/brandCategory",adminBrandController.brandSaveDatabaseController);
router.delete("/deleteBrand",adminBrandController.deleteBrandController);
router.get("/brandCategory",adminBrandController.brandController);

/******************************************************CATEGORY DETAILS*******************************************************************/
router.get("/adminCategory",session.adminSession, adminCategory.catogoryPageController);
router.post("/adminCategory",adminCategory.addCategoryController);
// router.get("/deleteCategory", adminCategory.deleteCategoryController);
router.delete('/deleteCategory',session.adminSession,adminCategory.deleteCategoryController)

//********************************************************PRODUCT DETAILS***************************************************************//
router.post('/addProduct',upload.single('productImage'),adminProductController.productAdding)
router.get('/product',session.adminSession,adminProductController.productPage)
// router.get('/deleteProduct',adminProductController.productDelete)
router.get("/addProductPage",adminProductController.productForm);
router.post('/updateProductDetails',upload.single('productImage'),adminProductController.updateProductDetailsAction)
router.get('/addProductPage',adminProductController.adminAddProductPage)
router.post('/adminAddNewProduct',upload.single('productImage'),adminProductController.productAdding)
router.get('/showEditProductPage',adminProductController.updateProductDetails)
router.delete('/deleteProduct',adminProductController.productDelete)
router.post('/adminProductManage/softDelete',adminProductController.softDelete)
router.post('/adminProductManage/instock',adminProductController.stock)
//**********************************************************Admin Banner***************************************************************** */
router.get('/adminBanner',session.adminSession,adminBannerController.showBannerPage)
router.post('/addNewBanner',upload.single("bannerImage"),adminBannerController.addBanner)
router.delete('/deleteBanner',adminBannerController.deleteBanner)
router.get("/adminBannerPage",adminBannerController.bannerRedirect)

// ********************************************************admin coupen*******************************************************************
router.get('/coupen',session.adminSession,adminCoupenController.coupenPage)
router.post('/addCoupen',adminCoupenController.addCoupen)
router.delete('/deleteCoupen',adminCoupenController.deleteCoupen)

//page not found 
router.use((req,res,next)=>{
    res.status(404).render('users/404' ,{admin:false,user:false})
    next()
})

router.get('/orderCount',adminPanelController.orderStatus)
module.exports = router
