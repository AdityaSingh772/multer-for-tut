const express = require("express");
const User = require('../models/users');
const router = express.Router();
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    return res.render("homepage");
});

let imageRoute = '';
let imageId = '';
router.post('/upload',upload.single('avatar'),async(req,res) => {
    const body = req.body;
    await User.create({
        name:body.name, 
        email:body.email,
        avatar:req.file.buffer,
        imId:body.name,
    });
    imageRoute = `/images/${body.name}`;
    imageId = body.name;
    return res.status(201).render("upload",{ imageRoute }); //here imageRoute is passed in ejs
});
router.get('/images/:name', async (req, res) => {
  const imageName = req.params.name;
  const getData = await User.findOne({name: imageName});

  if (!getData) {
    return res.status(404).send("No data found!");
  }

  // Assuming `avatar` holds the binary image data directly
  const image = getData.avatar;

  // Set the header for a binary JPEG image
  res.setHeader('Content-Type', 'image/jpeg');

  // Send the binary image data directly
  res.send(image);
});




module.exports = router;