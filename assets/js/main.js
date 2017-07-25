// Material Select Initialization
$(document).ready(function() {
  $('.mdb-select').material_select();
});

// References to DOM elements
var output = $("#output");
var ele1 = $("#categories");
var ele2 = $("#types");
var ele3 = $("#products");

//First load first XHR : Goes and gets categories JSON object and retrives the data // This one happens immediately
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

//First load first XHR : Goes and gets categories JSON object and retrives the data
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

//First load first XHR : Goes and gets categories JSON object and retrives the data
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


var populateCategoriesDOM = function(data) {
  console.log("data", data.categories);

  // dynamically populate dom with data
  var myString = '';
  
  myString += `<select class="mdb-select colorful-select dropdown-primary">`;
  myString += `<option disabled="true" selected="true" value="0">Select a categories</option>`;
  for (var i = 0; i < data.categories.length; i++) {
    console.log(data.categories[i].name);
    myString += `<option value="0">${data.categories[i].name}</option>`;
  }  
  myString += `</select>`;
  ele1.html(myString);

  // Event Listeners
  var categoryDD= $(".dropdown-primary")[0];
  $(categoryDD).change(function(e) {
    secondXHR().then(populateTypesDOM);
  });
};

var populateTypesDOM = function(data) {
  console.log("data", data);
  // dynamically populate dom with data

  // Event Listeners

};


firstXHR().then(populateCategoriesDOM);



