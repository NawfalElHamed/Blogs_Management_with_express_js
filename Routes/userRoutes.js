const express = require("express")
const Router = express.Router()
const {PostLogin,GetLogin,GetRegister,PostRegister,PostLogout} = require('../Controllers/usersControllers')
const {GetBlogs} = require('../Controllers/blogsControllers')
const checkToken = require('../Middlewares/checkToken')
const upload = require("../Middlewares/multer")
const logger = require("../Middlewares/logger")
const authenticateUser = require("../Middlewares/authenticateUser")


Router.get('/login',GetLogin);

Router.post('/login',PostLogin)

Router.get('/register',GetRegister);

Router.post('/register', upload.single('image'),PostRegister);

Router.get('/Blogs', logger, authenticateUser,GetBlogs, checkToken);

Router.post('/logout',PostLogout)

module.exports = Router