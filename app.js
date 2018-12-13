var express = require("express"); 
var app = express(); 
var fs = require('fs');

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));



app.use(express.static("views"));
app.use(express.static("images"));



app.use(express.static("scripts"));

app.use(express.static("model"));


const fileUpload = require('express-fileupload');
app.use(fileUpload());


var jobs = require("./model/jobs.json")
var items = require("./model/items.json") 



app.get("/", function(req, res){
    
   
    res.render("index.ejs");
    console.log("Its true you know!")
    
});








// route to render jobs info page 
app.get("/jobs", function(req, res){
    
   // res.send("This is the best class ever");
    res.render("jobs.ejs", {jobs});
    console.log("on jobs page!")
    
});
// route to render contact info page 
app.get("/items", function(req, res){
    
   // res.send("This is the best class ever");
    res.render("items.ejs", {items});
    console.log("on items page!")
    
});





// route to render info page 
app.get("/addjobs", function(req, res){
    
   // res.send("This is the best class ever");
    res.render("addjobs.ejs");
    console.log("on jobs page!")
    
});
// route to render info page 
app.get("/message", function(req, res){
    
   // res.send("This is the best class ever");
    res.render("message.ejs");
    console.log("on board page!")
    
});


// route to render jobs page 
app.post("/addjobs", function(req, res){
    
    // function to find the max id
    
  	function getMax(jobs , id) {
		var max
		for (var i=0; i<jobs.length; i++) {
			if(!max || parseInt(jobs[i][id]) > parseInt(max[id]))
				max = jobs[i];
			
		}
		return max;
	}
	
	
	var maxPpg = getMax(jobs, "id"); // This calls the function above and passes the result as a variable called maxPpg.
	newId = maxPpg.id + 1;  // this creates a nwe variable called newID which is the max Id + 1
	console.log(newId); // We console log the new id for show reasons only
    
	// create a new product based on what we have in our form on the add page 
	
	var jobsx = {
    name: req.body.name,
    id: newId,
    Comment: req.body.comment,
    email: req.body.email
    
    
  };
    
     console.log(jobsx);
  var json = JSON.stringify(jobs); 


  fs.readFile('./model/jobs.json', 'utf8', function readFileCallback(err, data){
    if(err){
     throw(err);
         
    } else {
      
     jobs.push(jobsx); // add the data to the json file based on the declared variable above
      json = JSON.stringify(jobs, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./model/jobs.json', json, 'utf8')
    }
    
  })
  res.redirect("/jobs");
    
    
});


// url to delete job

app.get("/deletejobs/:id", function(req, res){
    
  var json = JSON.stringify(jobs); // Convert our json data to a string
  
  var keyToFind = parseInt(req.params.id) // Getes the id from the URL
  var data = jobs; // Tell the application what the data is
  var index = data.map(function(d) {return d.id;}).indexOf(keyToFind)
  console.log("variable Index is : " + index)
  console.log("The Key you ar looking for is : " + keyToFind);
  
  jobs.splice(index, 1);
  json = JSON.stringify(jobs, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./model/jobs.json', json, 'utf8')
  res.redirect("/");
    
});
//url delete items

app.get("/deleteitems/:id", function(req, res){
    
  var json = JSON.stringify(items); 
  
  var keyToFind = parseInt(req.params.id) 
  var data = items; 
  var index = data.map(function(d) {return d.id;}).indexOf(keyToFind)
  console.log("variable Index is : " + index)
  console.log("The Key you ar looking for is : " + keyToFind);
  
  items.splice(index, 1);
  json = JSON.stringify(items, null, 4);
      fs.writeFile('./model/items.json', json, 'utf8')
  res.redirect("/");
});






    
    

    




// route to render contact info page 
app.get("/additems", function(req, res){
    
   // res.send("This is the best class ever");
    res.render("additems.ejs");
    console.log("on items page!")
    
});


// route to render contact info page 
app.post("/additems", function(req, res){
    
      if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  filename = sampleFile.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./scripts/' + filename, function(err) {
    if (err)
      return res.status(500).send(err);
 console.log("Here is the image " + req.files.sampleFile)
    
  

    
    
    // function to find the max id
    
  	function getMax(items , id) {
		var max
		for (var i=0; i<items.length; i++) {
			if(!max || parseInt(items[i][id]) > parseInt(max[id]))
				max = items[i];
			
		}
		return max;
	}
	
	
	var maxPpg = getMax(items, "id"); // This calls the function above and passes the result as a variable called maxPpg.
	newId = maxPpg.id + 1;  // this creates a nwe variable called newID which is the max Id + 1
	console.log(newId); // We console log the new id for show reasons only
    
	// create a new product based on what we have in our form on the add page 
	
	var itemsx = {
    name: req.body.name,
    id: newId,
    Comment: req.body.comment,
    email: req.body.email,
    price: req.body.price,
    photo: filename
    
    
  };
    
     console.log(itemsx);
  var json = JSON.stringify(items); // Convert our json data to a string
  
  // The following function reads the new data and pushes it into our JSON file
  
  fs.readFile('./model/items.json', 'utf8', function readFileCallback(err, data){
    if(err){
     throw(err);
         
    } else {
      
      items.push(itemsx); // add the data to the json file based on the declared variable above
      json = JSON.stringify(items, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./model/items.json', json, 'utf8')
    }
    
  })
  res.redirect("/");
  });
    
});



// render edit jobs page 

app.get("/editjobs/:id", function(req, res){
    
   function chooseJobs(indOne){
   return indOne.id === parseInt(req.params.id)
  
     }
 
  var indOne = jobs.filter(chooseJobs);
  
  //res.send(indOne)
  res.render("editjobs.ejs", {indOne});

    
});


// Create post request to c the individual review
app.post('/editjobs/:id', function(req, res){
 var json = JSON.stringify(jobs);
 var keyToFind = parseInt(req.params.id); // Id passed through the url
 //var data = contact; // declare data as the reviews json file
  var index = jobs.map(function(jobs) {return jobs.id;}).indexOf(keyToFind)
 

 jobs.splice(index, 1, {name: req.body.name, Comment: req.body.comment, id: parseInt(req.params.id), email: req.body.email});
 json = JSON.stringify(jobs, null, 4);
 fs.writeFile('./model/jobs.json', json, 'utf8'); // Write the file back
 res.redirect("/");
});
    

// end po






app.post('/add', function(req, res){
	var count = Object.keys(jobs).length; // Tells us how many tts we have its not needed but is nice to show how we can do this
	console.log(count);
	
	// This will look for the current largest id in the reviews JSON file this is only needed if you want the reviews to have an auto ID which is a good idea 
	
	function getMax(jobs , id) {
		var max
		for (var i=0; i<jobs.length; i++) {
			if(!max || parseInt(jobs[i][id]) > parseInt(max[id]))
				max = jobs[i];
			
		}
		return max;
	}
	
	var maxPpg = getMax(jobs, "id"); // This calls the function above and passes the result as a variable called maxPpg.
	newId = maxPpg.id + 1;  // this creates a nwe variable called newID which is the max Id + 1
	console.log(newId); // We console log the new id for show reasons only
	
	// create a new product based on what we have in our form on the add page 
	
	var contactsx = {
    name: req.body.name,
    id: newId,
    Comment: req.body.comment,
    email: req.body.email
    
  };
  
  console.log(jobsx);
  var json = JSON.stringify(jobs); // Convert our json data to a string
  
  // The following function reads the new data and pushes it into our JSON file
  
  fs.readFile('./models/jobs.json', 'utf8', function readFileCallback(err, data){
    if(err){
     throw(err);
         
    } else {
      
     jobs.push(jobsx); // add the data to the json file based on the declared variable above
      json = JSON.stringify(jobs, null, 4); // converts the data to a json file and the null and 4 represent how it is structuere. 4 is indententation 
      fs.writeFile('./models/jobs.json', json, 'utf8')
    }
    
  })
  res.redirect("/jobs");
  
});




app.get("/upload", function(req, res){
    
   
    res.render("upload.ejs");
    console.log("Image upload code!")
    
});


//// *********************** UPLOADER ***************************** ////

app.get('/upload', function(req, res) { // Call a get request when somebody visits the main url
    res.render('upload.ejs');   // Sending a response which is just a string.
 
        
});




app.post('/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  filename = sampleFile.name;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv('./scripts/' + filename, function(err) {
    if (err)
      return res.status(500).send(err);
 console.log("Here is the image " + req.files.sampleFile)
    res.redirect('/');
  });
});

//////// ******************* UPLOADER END ************************** ///





// Now we need to tell the application where to run


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  console.log("Off we go again");
  
})



