const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireAdminLogin = require('../middleware/requireAdminLogin')
const requireLogin = require('../middleware/requireLogin')
const Post = mongoose.model("Post")
const Property = mongoose.model("Property")
const Event = mongoose.model("Event")
const Feed = mongoose.model("Feed")
const Comment = mongoose.model("Comment")

// posts
router.post('/create-post',
            requireAdminLogin, 
            (req, res) => {
    const {
        companyName, 
        propertyName, 
        propertyLocation,
        typeOfDocument,
        youTubeLink,
        propertyDescription,
        price,
        brochure,
        flyers,
        pic,
        photoTwo,
        photoThree,
        photoFour,
        photoFive,
        photoSix
    } = req.body
    if(!companyName || !propertyName || !propertyLocation || !typeOfDocument || !youTubeLink || !propertyDescription || !brochure || !pic){
        return res.status(422).json({error: "Please add all the fields"})
    }

    req.admin.password = undefined
    
    const post = new Post({
        companyName,
        propertyName,
        propertyLocation,
        typeOfDocument,
        youTubeLink,
        propertyDescription,
        brochure,
        flyers,
        price,
        photo: pic,
        photoTwo,
        photoThree,
        photoFour,
        photoFive,
        photoSix,
        postedBy: req.admin
    })
    post.save().then(result => {
        return res.json({post: result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/all-post', 
//            requireAdminLogin, 
           (req, res) => {
    Post.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id firstName")
        .then(posts => {
            res.json({posts})
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/properties-details/:id', (req, res) => {
    Post.findOne({_id: req.params.id})
    .then(post => {
        Post.find({postId: req.params.id})
        .populate("postedBy", "_id propertyName")
        .exec((err, posts) => {
            if(err){
                return res.status(422).json({error: err})
            }
            res.json({post, posts})
        })
    }).catch(err => {
        return res.status(404).json({error: "Property not found"})
    })
})

router.delete('/delete-post/:postId', 
              requireAdminLogin, 
              (req, res) => {
    Post.findOne({_id: req.params.postId})
    .populate("postedBy", "_id")
    .exec((err, post) => {
        if(err || !post){
            return res.status(422).json({error: err})
        }
        if(post.postedBy._id.toString() === req.admin._id.toString()){
            post.remove()
            .then(result => {
                res.json({message: "successfully deleted"})
            }).catch(err => {
                console.log(err)
            })
        }
    })
})

router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


router.put('/comment',requireLogin,(req,res)=>{
    const comment = {
        text:req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id firstName")
    .populate("postedBy","_id firstName")
    .exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

// comment
router.post('/create-comment', requireLogin, (req, res) => {
    const {
        propertyLink, 
        userLink, 
        description,
    } = req.body
    console.log(propertyLink, userLink, description)
    if(!propertyLink || !userLink || !description){
        return res.status(422).json({error: "Please add all the fields"})
    }

    req.admin.password = undefined
    
    const comment = new Comment({
        propertyLink,
        userLink,
        description,
        postedBy: req.admin
    })
    comment.save().then(result => {
        return res.json({comment: result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/all-comment', requireLogin, (req, res) => {
    Comment.find()
        .populate("postedBy", "_id name")
        .then(comments => {
            res.json({comments})
        })
        .catch(err => {
            console.log(err)
        })
})
// end of posts





// general posts
router.post('/create-properties', requireAdminLogin, (req, res) => {
    const {
        companyName, 
        propertyName, 
        propertyLocation,
        typeOfDocument,
        youTubeLink,
        propertyDescription,
        price,
        brochure,
        flyers,
        pic,
        photoTwo,
        photoThree,
        photoFour,
        photoFive,
        photoSix
    } = req.body
    if(!companyName || !propertyName || !propertyLocation || !typeOfDocument || !youTubeLink || !propertyDescription || !brochure || !flyers || !pic || !photoTwo || !photoThree || !photoFour || !photoFive || !photoSix){
        return res.status(422).json({error: "Please add all the fields"})
    }

    req.admin.password = undefined
    
    const property = new Property({
        companyName,
        propertyName,
        propertyLocation,
        typeOfDocument,
        youTubeLink,
        propertyDescription,
        brochure,
        flyers,
        price,
        photo: pic,
        photoTwo,
        photoThree,
        photoFour,
        photoFive,
        photoSix,
        postedBy: req.admin
    })
    property.save().then(result => {
        return res.json({property: result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/all-property', (req, res) => {
    Property.find()
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id firstName")
        .then(properties => {
            res.json({properties})
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/general-properties-details/:id', (req, res) => {
    Property.findOne({_id: req.params.id})
    .then(property => {
        Property.find({generalPropertyId: req.params.id})
        .populate("postedBy", "_id propertyName")
        .exec((err, properties) => {
            if(err){
                return res.status(422).json({error: err})
            }
            res.json({property, properties})
        })
    }).catch(err => {
//         return res.status(404).json({error: "Property not found"})
           console.log(err)
    })
})

router.delete('/delete-property/:propertyId', requireAdminLogin, (req, res) => {
    Property.findOne({_id: req.params.propertyId})
    .populate("postedBy", "_id")
    .exec((err, property) => {
        if(err || !property){
            return res.status(422).json({error: err})
        }
        if(property.postedBy._id.toString() === req.admin._id.toString()){
            property.remove()
            .then(result => {
                res.json({message: "successfully deleted"})
            }).catch(err => {
                console.log(err)
            })
        }
    })
})
// end of general posts






// events
router.post('/create-event', requireAdminLogin, (req, res) => {
    const {
        eventName, 
        eventLocation, 
        eventDate,
        eventTime,
        eventVideo,
        eventDescription,
        pic
    } = req.body
    if(!eventName || !eventLocation || !eventDate || !eventTime || !eventVideo || !eventDescription || !pic){
        return res.status(422).json({error: "Please add all the fields"})
    }

    req.admin.password = undefined
    
    const event = new Event({
        eventName,
        eventLocation,
        eventDate,
        eventTime,
        eventVideo,
        eventDescription,
        photo: pic,
        postedBy: req.admin
    })
    event.save().then(result => {
        return res.json({event: result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/all-events', (req, res) => {
    Event.find()
        .populate("postedBy", "_id name")
        .then(events => {
            res.json({events})
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/event-details/:id', (req, res) => {
    Event.findOne({_id: req.params.id})
    .then(event => {
        Event.find({eventId: req.params.id})
        .populate("postedBy", "_id propertyName")
        .exec((err, events) => {
            if(err){
                return res.status(422).json({error: err})
            }
            res.json({event, events})
        })
    }).catch(err => {
        return res.status(404).json({error: "Property not found"})
    })
})

router.delete('/delete-event/:eventId', requireAdminLogin, (req, res) => {
    Event.findOne({_id: req.params.eventId})
    .populate("postedBy", "_id")
    .exec((err, event) => {
        if(err || !event){
            return res.status(422).json({error: err})
        }
        if(event.postedBy._id.toString() === req.admin._id.toString()){
            event.remove()
            .then(result => {
                res.json({message: "successfully deleted"})
            }).catch(err => {
                console.log(err)
            })
        }
    })
})
// end of events






// feeds
router.post('/create-feed', requireAdminLogin, (req, res) => {
    const {
        feedHeadline, 
        feedInformation, 
        feedLink,
    } = req.body
    console.log(feedHeadline, feedInformation, feedLink)
    if(!feedHeadline || !feedInformation || !feedLink){
        return res.status(422).json({error: "Please add all the fields"})
    }

    req.admin.password = undefined
    
    const feed = new Feed({
        feedHeadline,
        feedInformation,
        feedLink,
        postedBy: req.admin
    })
    feed.save().then(result => {
        return res.json({feed: result})
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/all-feeds', requireAdminLogin, (req, res) => {
    Feed.find()
        .populate("postedBy", "_id name")
        .then(feeds => {
            res.json({feeds})
        })
        .catch(err => {
            console.log(err)
        })
})

router.delete('/delete-feed/:feedId', (req, res) => {
    Feed.findOne({_id: req.params.feedId})
    .populate("postedBy", "_id")
    .exec((err, feed) => {
        if(err || !feed){
            return res.status(422).json({error: err})
        }
        if(feed.postedBy._id.toString() === req.admin._id.toString()){
            feed.remove()
            .then(result => {
                res.json({message: "successfully deleted"})
            }).catch(err => {
                console.log(err)
            })
        }
    })
})
// end of feeds










router.get('/my-dashboard', requireLogin, (req, res) => {
    Post.find({postedBy: req.user._id})
        .populate("postedBy", "_id name")
        .then(myPost => {
            return res.json({myPost})
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router
