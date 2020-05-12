const express = require('express');
const router = express.Router();
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcryptjs');



var logged = false;
var userId=0 ;


router.get('/', (req, res) => {
    res.render('index');
})

router.get('/posts',(req,res)=>{

    if(logged)
    {
    Post.find().then(posts=>{

        res.render('posts',{posts:posts , userId: userId});

    });
}

else{
    res.send("You must log in first");
}

   

})

router.post('/posts',(req,res)=>{

    const newPost = new Post();
    newPost.status = req.body.status;
    newPost.title = req.body.title;
    newPost.save().then(PostSaved => { 
        Post.find().then(posts =>{
         
            res.render('posts',{posts: posts});

        }).catch(err => { res.send('error' + err) })     
        
    }).catch(err => { res.send('error' + err) }) 
 })

router.post('/register', (req, res) => {
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.name = req.body.name;
    newUser.password = req.body.password;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            if (err) return err;
            newUser.password = hash;
            newUser.save().then(userSaved => {
               
                res.send('userSaved you can login now');
                // res.redirect('/login');
            }).catch(err => { res.send('error' + err) })
        });
    });
});


router.post('/login', (req, res) => {
   User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, matched) => {
                if (err) return err;

                if (matched) {

                    logged = true;
                    //res.send('success')
                   userId = user.id ;
                    res.render('login',{name:user.name});

                } else {
                    res.send('cant login')
                }
            })
        }
    })
})

module.exports = router;
