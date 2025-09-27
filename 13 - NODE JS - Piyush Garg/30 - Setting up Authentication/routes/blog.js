const {Router} = require('express')
const multer = require('multer')
const path = require('path')
const router = Router();
const Blog = require('../models/blog')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./uploads/`))
    },
    filename: function (req, file, cb) {
      const fileName = `${Date.now()}-${file.originalname}`
      cb(null,fileName);
    }
}) 
const upload = multer({ storage: storage })

router.get('/add-new', (req, res)=>{
    return res.render('addBlog',{
        user: req.user,
    })
})

// router.post('/', upload.single('coverImage'), async(req, res)=>{
//     const {title , body} = req.body;
//     const blog = await Blog.create({
//         body,
//         title,
//         createdBy: req.user._id,
//         coverImageURL: `/uploads/${req.file.filename}`
//     })
//     return res.redirect(`/blog/${blog._id}`)
// })


router.post('/', upload.single('coverImage'), async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).redirect('/user/signin');
        }
        
        const { title, body } = req.body;
        
        const blog = await Blog.create({
            body,
            title,
            createdBy: req.user._id,
            coverImageURL: `/uploads/${req.file.originalname}`
        });
        
        return res.redirect(`/blog/${blog._id}`);
        
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).send('Error creating blog');
    }
});

module.exports = router;