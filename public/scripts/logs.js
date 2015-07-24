// $(function() {
//   template = _.template($('#user-template').html());
// $.ajax({
//   url:'/api/supplements',
//   type:'GET',
//   success: function(data){
//     // console.log(data);

//     _.each(data, function(log, index) {
//         // console.log(log);

//         var $logHtml = $(template(log));
//         // console.log($logHtml);

//         $('#supplement_list').append($logHtml);
//       });
//     }
//   });

//  $("#submit").on('click', function(e){
//         event.preventDefault();
//         var x = $('#supplements').val();
//           // console.log(x)
//       // console.log('clicked');
//       $('.list-group').append(x)
//     });
// });

$(function() {


  var supplementController = {
    template: _.template($('#supplements-template').html()),

    all: function() {
      // AJAX call to server to GET /api/logs
      $.get('/api/supplements', function(supplements) {
        console.log('AJAX call to api');
        //changes the allSupplements to supplement_list just to see if it works

        _.each(supplements, function(supplement, index) {
          console.log(supplements);

          var $supplementHtml = $(supplementController.template(supplement));
          

          $('#allSupplements').append($supplementHtml);
        });
      });
    },

    create: function(titleData, dosageData, reasonData) {

      var supplementData = {title: titleData, dosage: dosageData, reason: reasonData};
      console.log(supplmentData);
      // AJAX call to server to POST /api/logs
      $.post('/api/supplements', supplementData, function(newSupplement) {
        console.log(newSupplement);
        

        var $supplementHtml = $(supplementController.template(newSupplement));
        console.log($supplementHtml);


        $('#supplement-list').append($supplementHtml);
      });
    },

    setupView: function() {

      supplementController.all();

      $('#new-log').on('submit', function(event) {
        event.preventDefault();
        

        var supplementTitle = $('#Title').val();
        var supplementDosage = $('#Dosage').val();
        var supplementReason = $('#Reason').val();

        supplementController.create(supplementTitle, supplementDosage, supplementReason);

        $(this)[0].reset();
      });
    }
  };

  supplementController.setupView();

});