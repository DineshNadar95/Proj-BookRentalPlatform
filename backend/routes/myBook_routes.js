var express = require('express');
const myBookRoutes = express.Router();

let myBooks = require('../model/myBooks.model.js');

myBookRoutes.get('/', function (req, res){
    myBooks.find(function(err, mybook) {
        if (err) {
            console.log(err);
        } else {
            res.json(mybook);
        }
    });
});

myBookRoutes.get('/:id', function (req, res) {
    let id = req.params.id;
    myBooks.findById(id, function(err, mybook) {
        if (err) {
            console.log(err);
        } else {
            res.json(mybook);
        }
    });
});

myBookRoutes.post('/update/:id', function (req, res){
    myBooks.findById(req.params.id, function(err, mybook) {
        if (!mybook)
            res.status(404).send("book is not found");
        else
            // mybook.isbn = req.body.isbn;
            mybook.rental_price = req.body.rental_price;
            mybook.book_name = req.body.book_name;
            mybook.book_description = req.body.book_description;
            mybook.owner_id = req.body.owner_id;
            mybook.availablity = req.body.availablity;



            mybook.save().then(mybook => {
                res.json('Book is updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

myBookRoutes.post('/add', function (req, res) {
    let mybook = new myBooks(req.body);
    mybook.save()
        .then(mybook => {
            res.status(200).json({mybook});
        })
        .catch(err => {
            res.status(400).send('adding new mybook failed');
        });
});

////Search Function!!!
myBookRoutes.post('/search', function (req, res) {
    let m = req.body; //have to change the variable once we update the front end for this part
    let bData = []
    myBooks.find(function (err, mybook) {
        try {
            if (err) {
                console.log(err);
            } else {
                for (i = 0; i < mybook.length; i++) {

                    if ((mybook[i].book_name.toLowerCase()).includes(m.name.toLowerCase())) {

                        bData.push(mybook[i])
                    } else continue
                }
                if (bData.length == 0) {
                    throw "No Books"

                } else { res.status(200).json(bData); }
            }
        } catch (e) {
            res.status(400).json({ error: e })
        }
    });
});

// DELETE FUNCTION by id
myBookRoutes.delete('/:id',function(req,res){
    myBooks.findByIdAndRemove(req.params.id,(err)=>{
        if(err){
            res.status(500).json({error:err})
        }else{
            res.status(200).json("Successfully deleted")
        }
    })

})

module.exports = myBookRoutes