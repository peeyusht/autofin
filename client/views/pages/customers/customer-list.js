const handle = Meteor.subscribe('customers');

Template.customerList.rendered = function(){

    // Initialize dataTables
    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
/*            { extend: 'copy'},
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

Template.customerList.helpers({
  customer: function () {
    return Customers.find();
  }
});

Template.customerList.events({
  'click #customerAddButton': function() {
    $('#customerAddModal').modal("show");
  },
  'click #edit': function(){
    Session.set('thisId', this._id);

    $('#customerEditModal').modal("show");
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
      Meteor.call('customers.delete', currentId);
      swal("Deleted!", "Your data has been deleted.", "success");
    });
  }
});
