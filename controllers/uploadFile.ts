const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req:any, file:any, cb:any) {
        cb(null, '../client/src/media');
      },
    filename: function (req:any, file:any, cb:any) {
        //cb(null, file.originalname);
        cb(null, req.params.id+".jpeg");
    }
});

export const upload = multer({
    storage: storage,
    limits: { fileSize: 3 * 1000 * 1000 }

}).single('file');