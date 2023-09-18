const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = 'test';




exports.PostLogin = async (req, res) => {
    const { email, password } = req.body;
    const users = await axios.get('http://localhost:3000/users'); // Updated URL
    const user = await users.data.find((u) => u.email == email);
    // console.log(users)
    if (!user) {
        return res.send('user not found');
    }
    // Verify the entered password against the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.send('Password incorrect');
    }
    delete user.password;

    const token = jwt.sign({ user: user }, secret);
    req.session.user = user; // Store the user object in the session
    res.cookie('token_auth', token);
    req.session.lastActivityTime = Date.now(); // Update the last activity time
    req.session.auth = true
    res.redirect('/blogs');
}

exports.GetLogin = (req, res) => {
    res.render('login');
}

exports.GetRegister = (req, res) => {
    res.render('register');

}

exports.PostRegister = async (req, res) => {
    const { username, password, email } = req.body;
    const image = req.file;
    console.log(image);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds
    // Construct the complete user object
    const newUser = {
        username: username,
        password: hashedPassword, // Store the hashed password
        email: email,
        image: image.filename
    };
    // Send the complete user object to your JSON server
    axios.post('http://localhost:3000/users', newUser)
        .then((response) => {
            res.redirect('/login');
        })
        .catch((error) => {
            res.status(500).send('Internal server error');
        });
}

exports.PostLogout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Internal server error');
      } else {
        res.redirect('/login'); 
      }
    });
  }

