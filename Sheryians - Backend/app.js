let exp = require('express');

let app = exp();
const dbConnection = require('./config/db');
const userModel = require('./models/user');

app.use(exp.json());
app.use(exp.urlencoded({extended: true}));
app.use(exp.static('public'));

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log('Middleware 1');
    return next();
});

app.get('/', (req, res) => {
    res.render('index');
    //res.send('Main page');
});

app.get('/profile', (req, res) => {
    res.send('profile page');
});

app.post('/got_data', (req, res) => {
    console.log(req.body);
    res.send('data paisi');
});


app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;

    //eta run hoile db te data insert hobe
    //writing async await to make it synchronous
    await  userModel.create({
        username: username,
        email: email,
        password: password
    });

    res.send(`Congratulations ${username} \n Registration successful`);
});

//READ From database
app.get('/get_users', (req, res) => {
    userModel.find({
        username: 'ahanaf'
    }).then( function (users){
        res.send(users);
    })
});

//UPDATE
app.get('/update_user', async (req, res) => {
    await userModel.updateOne({
        username: 'ahanaf'
    }, {
        username: 'ahanaf1'
    });

    res.send('User updated');
});


//DELETE
app.get('/delete_user', async (req, res) => {
    await userModel.deleteOne({
        name: 'ahanaf1'
    });

    res.send('User deleted');
});


app.listen(3000);