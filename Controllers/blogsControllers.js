const axios = require('axios');

exports.GetBlogs = async (req, res) => {
    const user_id = req.session.user.id;
    try {
        const fetchBlogs = await axios.get(`http://localhost:3000/blogs?user_id=${user_id}`);
        const blogs = fetchBlogs.data;
        
        // Render the 'Blogs' view with the retrieved blog data
        res.render('Blogs', { email: req.session.user.email, image: req.session.user.image, username: req.session.user.username, blogs });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

exports.CreateBlog = (req, res) => {
    try {
        const { blog_Title, blog_description } = req.body;
        const blog_image = req.file;
        const user_id = req.session.user.id;
        // Construct the complete user object
        const newBlog = {
            blog_Title: blog_Title,
            blog_image: blog_image.filename,
            blog_description: blog_description,
            user_id: user_id
        };
        // Send the complete user object to your JSON server
        axios.post('http://localhost:3000/blogs', newBlog)
        res.redirect('/Blogs');
    } catch (error) {

        res.status(500).send('Internal server error');
    }
}

exports.Getallblogs = async (req, res) => {
    const fetchBlogs = await axios.get(`http://localhost:3000/blogs`)
    const blogs = await fetchBlogs.data
    res.render('allBlogs', { email: req.email, image: req.image, username: req.username, blogs });
}
exports.Postallblogs = (req, res) => {
    res.redirect('/allBlogs')
}

exports.Puteditblog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const updatedBlogData = req.body;
        if (req.file) {
            updatedBlogData.blog_image = req.file.filename;
        }
        // Update the blog data in your JSON server by making a PUT request
        await axios.patch(`http://localhost:3000/blogs/${blogId}`, updatedBlogData);

        // Redirect to the updated blog listing page
        res.redirect('/Blogs');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

exports.Geteditblog = async (req, res) => {
    try {
        const user_id = req.decoded.user.id;
        const blogId = req.params.id;
        const response = await axios.get(`http://localhost:3000/blogs?id=${blogId}&user_id=${user_id}`);
        const blog = response.data[0];
        res.render('editBlog', { blog, user:req.decoded.user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}

exports.Deleteblog = async (req, res) => {
    try {
        const blogId = req.params.id;
        await axios.delete(`http://localhost:3000/blogs/${blogId}`);
        res.redirect('/Blogs');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

exports.Getdetailblog = async (req, res) => {
    try {
        const user_id = req.decoded.user.id;
        const blogId = req.params.id;
        const response = await axios.get(`http://localhost:3000/blogs?id=${blogId}`);
        // const response = await axios.get(`http://localhost:3000/blogs?id=${blogId}&user_id=${user_id}`);
        const blog = response.data[0];
        res.render('detailBlog', { blog ,user:req.decoded.user})
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

exports.Postdetailblog = (req, res) => {
    res.redirect('/Blogs')
}