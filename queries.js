/* Add all the required libraries*/
var mongoose = require('mongoose'),
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, {useUnifiedTopology: true}, {useNewUrlParser: true});

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html

var findLibraryWest = function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */

   //find listing for "library West"
  var cursor = Listing.find({name: 'Library West'}).cursor();

  //Output data for Library West to console using cursor
  cursor.on('data', function(doc) {
    console.log(doc);
  });
  cursor.on('close', function() {
  });

  //Successfully found message
  console.log('Found Library West');

};

var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */

   //find listing for "CABL"
   var cursor = Listing.find({code: 'CABL'}).cursor();

  //Output data for CABL to console using cursor
   cursor.on('data', function(doc) {
     console.log(doc);
   });
   cursor.on('close', function() {
   });

   //Remove the listing for CABL and display message that it is deleted
   Listing.remove({code: "CABL"}).then(() => console.log('CABL has been deleted.'));

};

var updatePhelpsLab = function() {
  /*
    Phelps Lab's address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */

   //create variable to hold new updated address
   var update = {address : '1953 Museum Rd, Gainesville, FL 32603, United States'};

   ///find doc in database for Phelps Lab, update address then log doc to console
   Listing.findOneAndUpdate(
     {code: 'PHL'},
     update,
     {new: true, useFindAndModify: false},
      function(err, doc){
        if (err) throw (err);
        console.log(doc);
      });
};

var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */

   //get all listings for cursor
   var cursor = Listing.find().cursor();

   //output all listings to console
   cursor.on('data', function(doc) {
     console.log(doc);
   });
   cursor.on('close', function() {
   });
};

//Perform alll query functions
findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
