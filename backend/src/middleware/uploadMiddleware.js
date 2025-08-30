const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const category = req.body.category;
    const uploadPath = path.join(__dirname, '..', '..', 'uploads', category);

    if (!fs.existsSync(uploadPath)) {
      return cb(new Error(`upload folder for this category "${category}" does not exist.`));
    }

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/\s+/g, '_');
    const filename = `${timestamp}-${originalName}`;
    cb(null, filename);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('only .jpg, .jpeg, and .png files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024    // ograniczylem wielkosc do 4 mb, mozna potem pomyslec czy 3 nie beda lepsze ale chce 
  }                              // zdjecia w dobrej jakosci na stronie
});

module.exports = upload;
