const handle = Meteor.subscribe('insurances');

Template.registerHelper('formatDate', function(date) {
  return moment(date, "DD-MM-YYYY").format('DD-MM-YYYY');
});

Template.insuranceList.rendered = function(){

    // Initialize dataTables
    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
//            { extend: 'copy'},
//            {extend: 'csv'},
//            {extend: 'excel', title: 'ExampleFile'},
//            {extend: 'pdf', title: 'ExampleFile'},

/*            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            } */
        ]

    });

};

Template.insuranceList.helpers({
  insurance: function () {
    if(Roles.userIsInRole(Meteor.userId(), 'Admin')) {
      return Insurances.find();
    } else {
      return Insurances.find({branch: Meteor.user().profile.branch});
    }
  },
  statusLabel: function () {
    if(this.status == "Un-Booked") {
      return Spacebars.SafeString('<div class="label label-warning">Un Booked</div>');
    }
    if(this.status == "Booked") {
      return Spacebars.SafeString('<div class="label label-primary">Booked</div>');
    }
  },
});

Template.insuranceList.events({
  'click #edit': function(){
    Session.set('thisId', this._id);
    FlowRouter.go("/insuranceEdit");
//    $('#insuranceEditModal').modal("show");
  },
  'click #delete': function() {
    currentId = this._id;
    swal({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "Yes, delete it!",
      closeOnConfirm: false
    }, function () {
      Meteor.call('insurances.delete', currentId);
      swal("Deleted!", "Your data has been deleted.", "success");
    });
  }
});
