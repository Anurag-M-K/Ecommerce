
const productHelper = require('../../models/productHelpers')
const category = require('../../models/categoryHelper')
const Brand = require('../../models/brandHelpers');
 //product adding form

const productForm = (req, res) => {
    res.render("admin/addProduct",{admin:true,user:false});
  };

  //multer stert

  const productAdding = (req,res)=>{
    const {
        
        productName,
        Price,
        Category,
        brandName,
        Quantity,
        
    }=req.body
    productHelper.addProduct({
        
        Pitcure: req.file.filename,
        file_url:req.file.path,
        productName,
        Price,
        Category,
        brandName,
        Quantity,
        state:'active'
        
    }).then((response)=>{
        
        res.redirect('/admin/product')
    })
} 

const productPage = (req,res)=>{
    productHelper.getAllProducts().then((products)=>{
     
            res.render('admin/adminProductManage',{admin:true,user:false,products})
     
        
  
    })
}





// delete product

const productDelete = (req,res)=>{
    let proId = req.query.id
    
    productHelper.deleteProducts(proId).then((response)=>{
        res.redirect("/admin/product");
     })
   
        

}











const adminAddProductPage = (req,res)=>{
    category.getAllCategories().then((categoryDetails)=>{
        Brand.getAllBrands().then((brandDetails)=>{
            res.redirect('admin/product',{admin:true,categoryDetails,brandDetails})
        })
    })
}



const updateProductDetails = async(req,res)=>{
    
        let productId = req.query.id;
        let product = await productHelper.getProductDetails(productId);   
        category.getAllCategories().then((categoryDetails)=>{
            
            Brand.getAllBrands().then((brandDetails)=>{
          
                res.render('admin/editProduct',{
                    admin:true,user:false,
                    categoryDetails,
                    brandDetails,product
                })
            })

        })
    
}





const updateProductDetailsAction = (req,res)=>{

        let id = req.body.id;
        const obj = JSON.parse(JSON.stringify(req.body))
        let file_url = req.file.path
        let newImageId =  req.file.filename;
        productHelper.updateProductDetails(file_url,id,obj,newImageId).then(()=>{  
           
            productHelper.getAllProducts().then((products)=>{
                res.render('admin/adminProductManage',{
                    
                    admin:true,user:false,products
                })
            })
        })
    
}




const softDelete = (req,res)=>{
    const proDetails = req.query.id
    console.log("prodetails",req.query.id);
    productHelper.softDelete(proDetails).then((response)=>{
        res.json({status:true})
    })
}


const stock = (req,res)=>{
    const proDetails = req.query.id
    console.log("id",proDetails)
    productHelper.InStock(proDetails).then((response)=>{
        res.json({status:true})
    })
}



  module.exports = {
    productForm,

    productPage,

    productAdding,
    
    productDelete,

  

    // productUpdateController,

    adminAddProductPage,

    updateProductDetails,

    updateProductDetailsAction,

    softDelete,
    stock

    
  
  }