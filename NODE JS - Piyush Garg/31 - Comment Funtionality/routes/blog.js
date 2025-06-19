const {Router} = require('express')
const multer = require('multer')
const path = require('path')
const router = Router();
const Blog = require('../models/blog')
const Comment = require('../models/comment')

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
        // console.log("req.bodyyy", req.user.name);

        const blog = await Blog.create({
            body,
            title,
            createdBy: req.user.name,
            coverImageURL: `/uploads/${req.file.filename}`
        });
        // console.log(blog);
        
        return res.redirect(`/blog/${blog._id}`);
        
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).send('Error creating blog');
    }
});


router.get('/:id', async (req, res)=>{
    const blogpost = await Blog.findById(req.params.id);
    const comments = await Comment.find({blogId: req.params.id}).populate("createdBy");
    //console.log("comments ", comments);
    if (!blogpost) {
        return res.status(404).send('Blog not found');
    }
    return res.render('blogpost',{
        user: req.user,
        blog: blogpost,
        comments,
    })
})

router.post('/comment/:blogId',async(req,res)=>{
    //console.log("req.body", req.body);
    await Comment.create({
        content: req.body.comment,
        blogId: "6853fef886d26f3a38ae9d76",//hardcoded for demo
        createdBy: "6853fd1b4a253a25b5eab3a3",//hardcoded for demo
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

module.exports = router;