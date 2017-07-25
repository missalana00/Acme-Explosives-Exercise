// Material Select Initialization - unique to MDB
$(document).ready(function() {
  $('.mdb-select').material_select();
});


//////////////////////////////
///// References to DOM /////
////////////////////////////


var output = $("#output");
var ele1 = $("#categories");
var ele2 = $("#types");
var ele3 = $("#products");


//////////////////////////////
//////// XHR Requests ///////
////////////////////////////


//First load first XHR : Goes and gets categories JSON object and retrives the data // This one if fired immediately
var firstXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "shared/json/categories.json"
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

//
var secondXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "shared/json/types.json"      
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};

// 
var thirdXHR = function() {
  return new Promise(function(resolve, reject) {
    $.ajax({
      url: "json/categories.json"
    }).done(function(data) {
      resolve(data);
    }).fail(function(xhr, status, error) {
      reject(error);
    });
  });
};


//////////////////////////////
//////// Functions /////////
////////////////////////////

// Dynamically populate DOM with data: Function creates a string to build DOM elements, 
// loops through data and extracts categories from JSON, then adds an event listener that, upon click, fires 
// the secondXHR function and then runs the populateDOMtypes function
var populateDOMcategories = function(data) {
  console.log("data", data.categories);

 
  var myString = '';
  
  myString += `<select class="mdb-select colorful-select dropdown-primary">`;
  myString += `<option disabled="true" selected="true" value="0">Select a categories</option>`;
  
      for (var i = 0; i < data.categories.length; i++) {
        console.log(data.categories[i].name);
        myString += `<option value="0">${data.categories[i].name}</option>`;
      } 

  myString += `</select>`;
  ele1.html(myString);

  // Event Listener
  var categoryDD= $(".dropdown-primary")[0];
  $(categoryDD).change(function(e) {
    secondXHR().then(populateTypesDOM);
  });
};





var populateDOMtypes = function(data) {
  console.log("data", data);
  // dynamically populate dom with data

  // Event Listeners
};


firstXHR().then(populateDOMcategories);



