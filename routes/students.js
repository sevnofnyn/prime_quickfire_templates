var express = require('express');
var router = express.Router();
var fs= require('fs');
var path = require('path');
var students = require('../models/students.json');

students = JSON.stringify(students);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('students')
});
router.get('/students', function(req, res, next) {
  var students1 = path.join(__dirname, '../models/students.json');
  fs.readFile(students1, 'utf8', function(err, data){
    if (err){
      next(err);}

    else{
      res.send(data);
    }
  })
});


router.post('/', function(req, res, next) {
  var studentsArray = students;
  var firstName=[];
  var lastName=[];
  studentsArray.push(req.body(firstName), req.body(lastName));
  console.log(studentsArray);

  //This is going to read the students file and it is going to parse the JSON data and push our request data on to it and write back to the JSON file
  var file = path.join(__dirname, '../models/students.json');
  fs.readFile(file, JSON.stringify(studentsArray), function (err) {
      if(err){
      console.log(err);
      res.sendStatus(500).send(err);
    } else {
        res.json(studentsArray);
        //this is our post route to put snarky comment from user
        var obj = JSON.parse(data);//we are turning the database into a JS array
        obj.push(req.body);//we are pushing the request onto the end of the array as a new snarky comment
        console.log(obj);
        fs.writeFile(file, JSON.stringify(obj), 'utf-8', function (err) {//this saves it by writing a file that saves it back to students.json, json stringify takes it out of being an array and back to json
          if (err) return console.log(err);
          console.log('Students');
          res.redirect('/students');//this refreshes our page to append the new comment to the appropriate image and sends us back to the first router.get

        })
      }
  });
});

module.exports = router;





