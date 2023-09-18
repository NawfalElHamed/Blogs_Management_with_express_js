const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const port = 5000;
const secret = 'test';
const userRouter = require("./Routes/userRoutes")
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const blogRouter = require('./Routes/blogRoutes')

// Middleware
app.use(methodOverride("_method"))
app.use(cookieParser());
app.use(express.static('Public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Session configuration with a 1-hour timeout
app.use(
    session({
        secret: secret,
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 3600000 } // Session timeout set to 1 hour (in milliseconds)
    })
);

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, './views'));
app.use("/", userRouter)
app.use("/", blogRouter)

app.get('/', (req, res) => {
    if (!req.session.user) {
        return res.redirect('/login');
    } else (
        res.redirect('/Blogs')
    )
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


