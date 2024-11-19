const express = require('express');
const { register, login, adminPage } = require("../Controller/AdminController");
const Admin = require("../Models/Admin");
const router = express.Router()

router.post('/Adminlo',login)
router.post('/adminPage',adminPage)

module.exports = router