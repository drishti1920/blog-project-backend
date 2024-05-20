const express = require('express')
const UserController = require("../controllers/UserController")
const auth  = require("../middleware/auth.js")
const router = express.Router()

router.post("/registration", UserController.register)
router.post("/login", UserController.login)
router.get("/check", auth, UserController.check)


module.exports = router