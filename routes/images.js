var express = require('express');
var bodyParser = require ('body-parser');
var images = require('../model/image');
var router = express.Router();
 url = require('url'),
MongoClient = require('mongodb').MongoClient,
	
	url = "mongodb://scrabber:p9677748113@ds111066.mlab.com:11066/webscraper";
router.use(bodyParser.json());
/* GET home page. */
router.get('/', function(req, res, next) {
	var responses = res;
	
	
	MongoClient.connect(url, function(err, db) {
	db.collection('webscraper.customers').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('images.ejs', {getImages: result,title: 'HI',heading:'Search Images' })
	console.log("result"+result)
  })
	console.log("responses"+responses);
 // res.render('images', { title: 'HI',heading:'Search Images' });
});
 });


module.exports = router;
