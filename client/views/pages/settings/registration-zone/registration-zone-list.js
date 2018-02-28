const handle = Meteor.subscribe('registration-zones');

Template.registrationZoneList.rendered = function(){

    // Initialize dataTables
    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: []

    });

};

Template.registrationZoneList.helpers({
  registrationZone: function () {
    return RegistrationZones.find();
  }
});

Template.registrationZoneList.events({
  'click #registrationZoneAddButton': function() {
    $('#registrationZoneAddModal').modal("show");
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
      Meteor.call('registrationZones.delete', currentId);
      swal("Deleted!", "Your data has been deleted.", "success");
    });
  }
});
