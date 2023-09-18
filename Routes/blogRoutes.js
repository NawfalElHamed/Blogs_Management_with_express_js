const express = require("express")
const Router = express.Router()
const upload = require("./../Middlewares/multer")
const {CreateBlog,Getallblogs,Postallblogs,Geteditblog,Puteditblog,Deleteblog,Getdetailblog,Postdetailblog} = require('./../Controllers/blogsControllers')
const checkToken = require('../Middlewares/checkToken');

Router.use(checkToken)

Router.post('/createBlog', upload.single('blog_image'),CreateBlog)

Router.post('/allBlogs', Postallblogs)

Router.get('/allBlogs',Getallblogs)

Router.put('/editBlog/:id', upload.single('blog_image'),Puteditblog)

Router.get('/editBlog/:id',Geteditblog)

Router.delete('/Blogs/deleteBlog/:id',Deleteblog)

Router.get('/detailBlog/:id',Getdetailblog)

Router.post('/detailBlog/:id',Postdetailblog)


module.exports = Router