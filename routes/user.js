const express = require("express");
const User = require('../models/users');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/', (req, res) => {
    return res.render("homepage");
});
router.post('/upload',upload.single('avatar'),async(req,res) => {
    const body = req.body;
    await User.create({
        name:body.name, 
        email:body.email,
        avatar:req.file.buffer,
    })
    return res.status(201).render("upload")
});


module.exports = router;