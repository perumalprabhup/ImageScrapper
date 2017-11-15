var express = require('express');
var router = express.Router(),
router = express.Router(),
	http =	require('http'),
    https =	require('https'),
    url = require('url'),
	Scraper = require ('images-scraper'),
	google = new Scraper.Google(),
	 fs = require('fs'),
    request = require('request'),
	download = require('image-downloader'),
	Jimp = require("jimp"),
	MongoClient = require('mongodb').MongoClient,
	
	url = "mongodb://scrabber:p9677748113@ds111066.mlab.com:11066/webscraper";

//url = "mongodb://localhost:27017/Prabhu2";


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prabhu',heading:'Enter Your Favorites' });
});

router.post('/images', function(req, res) {
    var imageName = req.body.imageScrap;
    
console.log("imageName "+imageName);



MongoClient.connect(url, function(err, db) {
  if (err) throw err;

google.list({
    keyword: imageName,
    num: 15,
    detail: true,
	timeout: 4000,
    nightmare: {
        show: false
    }
})
.then(function (res) {
	   console.log('first 15 results from google', res.length);
	    var count = 0;
	
	var myArray=[];
	
	   res.forEach(function(entry) {
		   
		  var array = entry.url.toString();
	

		   console.log("counts"+ count++)
		   var img = imageName+""+count+".jpg";
		   
		

		Jimp.read(array).then(function (lenna) {
		
			
				var arr = lenna.resize(256, 256)            // resize 
						.quality(60)                 // set JPEG quality 
						.greyscale()                 // set greyscale 
						.write(img); 

}).catch(function (err) {
    console.error(err+"asdasdadsdasd");
});

 var myobj = {url:array};
 console.log("myObh"+myobj)
  /* */
  db.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted"+res);
    db.close();
  });

    console.log(array);
	count++;
});


	
}).catch(function(err) {
    console.log('err', err);
});
 
// you can also watch on events 
google.on('result', function (item) {
    console.log('out', item);
});


  });
console.log('Scraping on');
    //res.send(imageName);
  //res.render('images.ejs');
 // res.redirect(__dirname +);
   res.redirect("/images");
});

module.exports = router;
