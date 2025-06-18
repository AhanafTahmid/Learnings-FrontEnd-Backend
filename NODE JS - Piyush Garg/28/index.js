const express = require('express');
const multer = require('multer');


const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + '-' + file.originalname )
  }
})

const upload = multer({ storage: storage })

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.post('/profile', upload.single('avatar'), (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect('/');
});

app.listen(3000, () => {  console.log('Server is running on http://localhost:3000');
});
