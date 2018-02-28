const handle = Meteor.subscribe('vehicles');

if(handle.ready()) {
  console.log("Vehicle Data: ", Vehicles.find().fetch());
}

Template.vehicleList.rendered = function(){
    // Initialize dataTables
    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
/*            {extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'ExampleFile'},
            {extend: 'pdf', title: 'ExampleFile'},

            {extend: 'print',
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

Template.vehicleList.helpers({
  vehicle: function () {
    return Vehicles.find();
  }
});

Template.vehicleList.events({
  'click #vehicleAddButton': function() {
    $('#vehicleAddModal').modal("show");
  },
  'click #edit': function(){
    Session.set('thisId', this._id);

    $('#vehicleEditModal').modal("show");
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
      Meteor.call('vehicles.delete', currentId);
      swal("Deleted!", "Your data has been deleted.", "success");
    });
  }
});
