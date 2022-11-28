const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


  cloudinary.config({ 
    cloud_name: 'dmvxmurxw', 
    api_key: '114759331854239', 
    api_secret: '7MdggK5N94H-C0SYqQFw2vJ7t3Q' 
  });
  const storage = new CloudinaryStorage({
    cloudinary,
    params: {

        folder: 'CricSTORE',
        allowedFormats: ['jpeg', 'png', 'jpg', 'gif', 'webp']
    }
})
module.exports = {  
    cloudinary, storage
}