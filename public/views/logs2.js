// $(function() {


//   var supplementController = {
//     template: _.template($('#user-supplement-template').html()),

//     all: function() {
//       // AJAX call to server to GET /api/logs
//       $.get('/api/supplements', function(allSupplements) {
//         console.log(allSupplements);
        

//         _.each(allSupplements, function(supplement, index) {
//           console.log(supplement);

//           var $supplementHtml = $(supplementController.template(supplement));
//           console.log($supplementHtml);

//           $('#supplement-list').append($supplementHtml);
//         });
//       });
//     },

//     create: function(titleData, dosageData, reasonData) {

//       var supplementData = {title: titleData, dosage: dosageData, reason: reasonData};
      
//       // AJAX call to server to POST /api/logs
//       $.post('/api/supplements', supplementData, function(newSupplement) {
//         console.log(newSupplement);
        

//         var $supplementHtml = $(supplementController.template(newSupplement));
//         console.log($supplementHtml);


//         $('#supplement-list').append($supplementHtml);
//       });
//     },

//     setupView: function() {

//       supplementController.all();

//       $('#new-supplement').on('submit', function(event) {
//         event.preventDefault();
        

//         var supplementTitle = $('#Title').val();
//         var supplementDosage = $('#Dosage').val();
//         var supplementReason = $('#Reason').val();

//         supplementController.create(supplementTitle, supplementDosage, supplementReason);

//         $(this)[0].reset();
//       });
//     }
//   };

//   supplementController.setupView();

// });