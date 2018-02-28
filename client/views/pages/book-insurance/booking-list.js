const handle = Meteor.subscribe('insurances');

Template.registerHelper('formatDate', function(date) {
  return moment(date).format('DD-MM-YYYY');
});

Template.bookInsuranceList.rendered = function(){

    // Initialize dataTables
    $('.dataTables-booking').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [        ]

    });

};

Template.bookInsuranceList.helpers({
  insurance: function () {
    if(Roles.userIsInRole(Meteor.userId(), 'Admin')) {
      return Insurances.find({status: "Un-Booked"});
    } else {
      return Insurances.find({branch: Meteor.user().profile.branch, status: "Un-Booked"});
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
  policyBooked: function () {
    if(this.status == "Booked") {
      return true;
    } else {
      return false;
    }
  }
});

Template.bookInsuranceList.events({
  'click #book': function(){
    Session.set('thisId', this._id);

    $('#bookInsuranceBookModal').modal("show");
  }
});
