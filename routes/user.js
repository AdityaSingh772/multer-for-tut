const express = require("express");

const router = express.Router();

router.get('/', (req, res) => {
    return res.render("homepage");
});
router.post('/upload',(req,res) => {

});

module.exports = router;