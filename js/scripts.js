
//business logic
function Contact(first, last) { // new object constructor
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}

function Address(place, street, city, state) { //new object constructor
  this.place = place;
  this.street = street;
  this.city = city;
  this.state = state;
}
function resetFields() { // new function to zero out input boxes after submission
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.address-type").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
}

Contact.prototype.fullName = function() { // new method to compile first and last name into one
  return this.firstName + " " + this.lastName;
}

Address.prototype.fullAddress = function() { // new method to compile address specifics
  return this.place + ", " + this.street + ", " + this.city + ", " + this.state;
}

//user interface logic
$(document).ready(function() {
  $("#add-address").click(function() { // when you click on the add address button, adds new input fields for additional addresses
      $("#new-addresses").append(
        '<div class="newInputs">' +
          '<div class="new-address">' +
            '<div class="form-group">' +
              '<label for="address-type">Address Type</label>' +
              '<input type="text" class="form-control address-type">' +
            '</div>' +
           '<div class="form-group">' +
             '<label for="new-street">Street</label>' +
             '<input type="text" class="form-control new-street">' +
           '</div>' +
           '<div class="form-group">' +
             '<label for="new-city">City</label>' +
             '<input type="text" class="form-control new-city">' +
           '</div>' +
           '<div class="form-group">' +
             '<label for="new-state">State</label>' +
             '<input type="text" class="form-control new-state">' +
            '</div>' +
          '</div>' +
        '</div>');
    });

  $("form#new-contact").submit(function(event) { // prevents page from refreshing during submission event
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val(); // pulls inputted first name value into new variable
    var inputtedLastName = $("input#new-last-name").val(); // pulls inputted last name value into new variable

    var newContact = new Contact(inputtedFirstName, inputtedLastName); // creates new object from the acquired variables

    $(".new-address").each(function() {
      var inputtedType = $(this).find("input.address-type").val(); // declaring new variable for address type
      var inputtedStreet = $(this).find("input.new-street").val(); // declaring new variables to capture new inputs
      var inputtedCity = $(this).find("input.new-city").val();
      var inputtedState = $(this).find("input.new-state").val();
      var newAddress = new Address(inputtedType, inputtedStreet, inputtedCity, inputtedState); // new object to compile above declared variables into full address
      newContact.addresses.push(newAddress); // associates address with contact
    });

    $(".contacts").show(); // display contacts section
    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span></li>"); // appends list items of newly inputted full names

    $(".contact").last().click(function() { // makes newly inputted full names clickable to show full details and stores object info in event handler
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);

      $("ul#addresses").text(""); // clears out address list so that the following can be added

      newContact.addresses.forEach(function(address) { // loops through all addresses of contact and creates an appended list containing address details
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });
    resetFields(); // calls function above to reset all input boxes after submission
    $('.newInputs').remove();
  });
});
