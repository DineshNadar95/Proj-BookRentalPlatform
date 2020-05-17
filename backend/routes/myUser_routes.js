var express = require('express');
const myUserRoutes = express.Router();

let myUser = require('../model/myUser.model');
//Get All the users
myUserRoutes.get('/', function (req, res) {
    myUser.find(function (err, myuser) {
        if (err) {
            console.log(err);
        } else {
            res.json(myuser);
        }
    });
});

//Get a User
myUserRoutes.get('/:id', function (req, res) {
    let id = req.params.id;
    myUser.findById(id, function (err, myuser) {
        if (err) {
            console.log(err);
        } else {
            res.json(myuser);
        }
    });
});
//find by special ID
myUserRoutes.get('/SI/:ss', function (req, res) {
    let sId = req.params.ss;
   
    myUser.findOne({ special_id:sId},function(err,user){
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    })
})


//update

myUserRoutes.patch('/update/:id', function (req, res){
    var updateObject = req.body;
    console.log(updateObject)
    myUser.update({_id  : req.params.id}, {$set: updateObject},function(err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
});
});
    ////Add bookid in user
    myUserRoutes.post('/SI/:ss', function (req, res) {
        let sId = req.params.ss;
        let bo = req.body.book_id   
     
        console.log(typeof bo)
        myUser.findOneAndUpdate({special_id:sId}, {$push:{books_available:bo}},function(err, doc){
            if(err){
                console.log("Something wrong when updating data!");
            }
        
            res.json(doc)
        });});

    ///remove bookid in rented

    myUserRoutes.post('/removerented', function (req, res) {
      
        let bo = req.body.book_id
     
        let userDetails =[]
        myUser.find(function (err, myuser) {
            if (err) {
                console.log(err);
            } else {
               
                userDetails = myuser
                for(i=0;i<userDetails.length;i++){
                    for(j=0;j<userDetails[i].rented.length;j++){
                        if(bo == userDetails[i].rented[j] ){
        
                        myUser.findOneAndUpdate({_id:userDetails[i]._id}, {$pull:{rented:bo}},function(err, doc){
                            if(err){
                                console.log("Something wrong when updating data!");
                            }
                        
                            res.json(doc)
                        }) 
                    }
                }}
            }
        });
 
        
    
    });

        ////adding bookid from rented
        myUserRoutes.post('/SI/addrented/:ss', function (req, res) {
            let sId = req.params.ss;
            let bo = req.body.book_id   
           
            console.log(typeof bo)
            myUser.findOneAndUpdate({special_id:sId}, {$push:{rented:bo}},function(err, doc){
                if(err){
                    console.log("Something wrong when updating data!");
                }
            
                res.json(doc)
            });});


        ////del book_id from the user
    myUserRoutes.post('/SI/:ss/del', function (req, res) {
            let sId = req.params.ss;
            let bo = req.body.book_id   
          
            console.log(typeof bo)
            myUser.findOneAndUpdate({special_id:sId}, {$pull:{books_available:bo}},function(err, doc){
                if(err){
                    console.log("Something wrong when updating data!");
                }
            
                res.json(doc)
            });
        
        });


/////adding image
myUserRoutes.post('/uploadImages/:ss', function (req, res) {
    let sId = req.params.ss;
    let bo = req.body.profile_pic  
  
    console.log(bo)
    myUser.findOneAndUpdate({special_id:sId}, {$set:{profile_pic:bo}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        res.json(doc)
    });});
//Add user
myUserRoutes.post('/', function (req, res) {
    let user = new myUser(req.body);
    user.save()
        .then(user => {
            res.status(200).json({ 'User': 'User added successfully' });
        })
        .catch(err => {
            res.status(400).send('adding new User failed');
        });
});

//Update User

myUserRoutes.post('/update/:id', function (req, res) {
    myUser.findById(req.params.id, function (err, myuser) {
        if (!myuser)
            res.status(404).send("User is not found");
        else
           
            myuser.first_name = req.body.first_name;
            myuser.last_name = req.body.last_name;
            myuser.email = req.body.email;
            myuser.phone_number = req.body.phone_number;
            myuser.books_available = req.body.books_available;
            myuser.rented =req.body.rented
            myuser.profile_pic = req.body.profile_pic



        myuser.save().then(myuser => {
            res.json('User is updated!');
        })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

///User delete

myUserRoutes.delete('/:id',function(req,res){
    myUser.findByIdAndRemove(req.params.id,(err,myuser)=>{
        if(err){
            res.status(500).json({error:err})
        }else{
            res.status(200).json("Successfully deleted")
        }
    })

});

module.exports = myUserRoutes