// Client Side JS
$(function() {

  // jQuery Validate 
    $('#signUpForm').validate({
         errorClass: "my-error-class",
         validClass: "my-valid-class"
       });

//this is holding the functionality
  var usersController = {

    // produce the underscore templates
    // template: _.template($('#supplements-template').html()),
    // supplementTemplate: _.template($('#supplements-template').html()),

    // now this is going to get the current user that is logged in
    show: function() {
      // AJAX call to the server 
      $.get('/api/users/current', function(user) {
        console.log(user);
        $userHtml = $(users.template({currentUser: user}));

// APPEND TO THE USER'S HTML PAGE
        $('#new-log').append($userHtml);

// THIS IS GOING THROUGH THE USER'S LOG
        _.each(user.supplement, function(supplement, index) {
          console.log(supplement);

         //GO THORUGH THE TEMPLATE
          $supplementHtml = $(userController.supplementTemplate(supplement));

// APPEND TO THE LOG TO THE PAGE
          $('#allSupplements').append($supplementHtml);
        });
        usersController.addEventHandlers();
      });
    },

// NOW WE WANNA CREATE A NEW SUPP FOR THE USER
    createSupplement: function(titleData, dosageData, reasonData) {
     // DEFINE OBEJECT W THE DATA WE NEED
      var supplementData = {Title: titleData, Dosage: dosageData, Reason: reasonData};
      
      // AJAX CALL TO THE SERVER TO UPDATE THE /API/USERS/CURRENT/SUPPS
      $.post('/api/users/current/supplements', supplementData, function(newSupplement) {
        console.log(newSupplement);
        
        //NOW PASS THE LOG THROUHG THE UNDERSCORE TEMP
        var $supplementHtml = $(userController.supplementTemplate(newSupplement));
        console.log($supplementHtml);

        // APPEND THE LOG TO THE PAGE
        $('#supplement_list').append($supplementHtml);
      });
    },

    setupView: function() {
      // NOW GET THE CURRENT USER
      usersController.show();

      // ADD THE SUBMIT EVENT ON THE NEW SUPP FORM
      $('#supplement_list').on('submit', function(event) {

        event.preventDefault();
        
        var supplementTitle = $('#title').val();
        var supplementDosage = $('#dosage').val();
        var supplementReason = $('#reason').val();

        console.log(supplementTitle, supplementDosage, supplementReason);
        // NOW CREATE THE NEW SUPP
        usersController.createSupplement(supplementTitle, supplementDosage, supplementReason);

         $(this)[0].reset();
      });
    }
  };

  usersController.setupView();

});


      