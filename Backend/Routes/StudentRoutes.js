const express = require('express');
const { login, signup } = require("../Controller/StudentController");
const Student = require("../Models/Student");
const router = express.Router()

router.post('/signup',signup)
//router.post('/Studentlo',login)
router.post('/login',login)
// router.get('/',getAllstd)

module.exports = router