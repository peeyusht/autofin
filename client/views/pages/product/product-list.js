const handle = Meteor.subscribe('products');

Template.branchList.rendered = function(){

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

Template.productList.helpers({
  product: function () {
    return Products.find();
  }
});

Template.productList.events({
  'click #productAddButton': function() {
    $('#productAddModal').modal("show");
  },
  'click #edit': function(){
    Session.set('thisId', this._id);

//    $('#branchEditModal').modal("show");
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
      Meteor.call('products.delete', currentId);
      swal("Deleted!", "Your data has been deleted.", "success");
    });
  }
});
