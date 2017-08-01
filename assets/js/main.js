// Material Select Initialization - unique to MDB
// $(document).ready(function() {
//   $('.mdb-select').material_select();
// });


//////////////////////////////
///// References to DOM /////
////////////////////////////


var output = $("#output");
var categoryDD = $("#categories");
var typesDD = $("#types");
var productsDD = $("#products");
var desciptDiv = $("#descriptionInput");
var selectedId = null;


//////////////////////////////
//////// XHR Requests ///////
////////////////////////////


//First load first XHR : Goes and gets categories JSON object and retrives the data // This one is fired immediately
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
      // console.log("Data in function", data)
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
      url: "shared/json/products.json"
    }).done(function(data) {
      // console.log("data in function", data)
      resolve(data);
    }).fail(function(xhr, status, error) {
      debugger;
      reject(error);
    });
  });
};


//////////////////////////////
//////// Functions /////////
////////////////////////////

// Dynamically populate DOM with data: Function creates a string to build DOM elements, 
// loops through data and extracts categories from JSON, then adds an event listener that, upon change event,  
// fires the secondXHR function and then runs the populateDOMtypes function
var populateDOMcategories = function(data) {

  var myString = '';
  
  myString += `<select class="primaryDD">`;
  myString += `<option disabled="true" selected="true" value="0">Select a category</option>`;
  
      for (var i = 0; i < data.categories.length; i++) {
        myString += `<option value="${i}">${data.categories[i].name}</option>`;
      }

  myString += `</select>`;
  categoryDD.html(myString);

  // Event Listener
  var mainDD= $(".primaryDD")[0];
  $(mainDD).change(function(e) {
    selectedId = e.target.value;
    // secondXHR().then((data, e.target.value)=>populateDOMtypes); // If you use this, you would delete the global variable
    secondXHR().then(populateDOMtypes);
  });
};


///// Function to dynamically populate DOM types
var populateDOMtypes = function(data) {
  // console.log("data", data);

  var myString = '';
  
  myString += `<select class="secondaryDD">`;
  myString += `<option disabled="true" selected="true" value="0">Select a type</option>`;
  
      for (var i = 0; i < data.types.length; i++) {
        // console.log("selectedId", selectedId)
        // console.log("each data", data.types[i].category)

        if (selectedId == data.types[i].category) {
          myString += `<option value="${i}">${data.types[i].name}</option>`;
        }
      }

  myString += `</select>`;
  typesDD.html(myString);

// Event Listener
  var secondaryDD= $(".secondaryDD")[0];
  $(secondaryDD).change(function(e) {
    selectedId = e.target.value;
    thirdXHR().then(populateDOMproducts);
  });
};


///// Function to dynamically populate DOM products
var populateDOMproducts = function(data) {
  // console.log("new data", data);

  var myString = '';
  
  myString += `<select class="tertiaryDD">`;
  myString += `<option disabled="true" selected="true" value="0">Select a product</option>`;
  
      for (var i = 0; i < data.products.length; i++) {
        // console.log("selectedId", selectedId)
        // console.log("each data", data.products[i].type)

        if (selectedId == data.products[i].type) {
          myString += `<option value="${data.products[i].description}">${data.products[i].name}</option>`;
        }
      }

  myString += `</select>`;
  productsDD.html(myString);


// Event Listener
  var tertiaryDD= $(".tertiaryDD")[0];
  $(tertiaryDD).change(function(e) {
    selectedId = e.target.value;
    populateProductDescription(e);
  });
};


//// Function to populate DOM with HTML that describes product
var populateProductDescription = function(e) {
  console.log("Description:", e.target.value);

  var myString = '';

  myString += `<h2> Product Description </h2>`;
  myString += `<p>${e.target.value}</p>`;
  desciptDiv.html(myString); 
  
};


firstXHR().then(populateDOMcategories);



// Understanding global variables example from Bill
// var fun = "this is some fun"

// var myFun = function () {
//   console.log("fun ", fun)
// }

// myFun();
// console.log("fun", fun)



