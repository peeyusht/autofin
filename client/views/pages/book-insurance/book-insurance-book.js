Template.bookInsuranceBook.rendered = function(){

    // Initialize dataTables
    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [        ]

    });

    $('#date_year .input-group.date').datepicker({autoclose: true, minViewMode: 1, format: 'mm/yyyy'}).on('changeDate', function(selected) {
      startDate = new Date(selected.date.valueOf());
      startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
      $('.to').datepicker('setStartDate', startDate);
    });

};

Template.bookInsuranceBook.helpers({
  insurance: function () {
    var currentId = Session.get("thisId");
    return Insurances.findOne(currentId);
  }
});

Template.bookInsuranceBook.events({
  'click #save': function( event, template ) {

    insurance = {
      policyNo: template.find('#policyNo').value,
      policyMonth: template.find('#policyMonth').value,
      status: "Booked",
      policyFile: Session.get("fileURL")
    };

    Meteor.call('insurances.book',  Session.get('thisId'), insurance, function(error) {
      if (error) {
        toastr.error("Error: ", error.reason);
        console.log('error', 'Error in processing login. ' + error.reason + '.');
        Meteor.call('logs.add', Meteor.user()._id, Meteor.user().profile.name, "Insurance", "Book", "Error", error.reason, "");
      } else {
        toastr.success("Insurance Successfully Booked");
        Meteor.call('logs.add', Meteor.user()._id, Meteor.user().profile.name, "Insurance", "Book", "Success", "", "");

        $('#bookInsuranceBookModal').modal("hide");

//        FlowRouter.go('/bookInsuranceList');
      }
    });
  },
  'change #uploadFileName': function( event, template ) {
//    console.log("File Change Event, ", event.target.files[0].name);
    FS.Utility.eachFile(event, function(file) {
      fileObj = new FS.File(file);
    })
  },
  'click #uploadFileButton': function( event, template ) {
      Files.insert(fileObj, function (error, fileObj) {
        if(error) {
          toastr.error("Error: File cannot be uploaded, ", error.reason);
          Session.set("fileURL", "");
        } else {

          var fileURL = '/cfs/files/images/' + fileObj._id;
          console.log("File Obj: ", fileObj._id, fileURL);

          Session.set("fileURL", fileURL);
          toastr.success("File uploaded successfully");
        }
      });
  }
});
