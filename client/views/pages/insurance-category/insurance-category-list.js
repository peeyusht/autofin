const handle = Meteor.subscribe('insurance-categories');

Template.insuranceCategoryList.rendered = function(){

    // Initialize dataTables
    $('.dataTables-example').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: []

    });

};

Template.insuranceCategoryList.helpers({
  insuranceCategory: function () {
    return InsuranceCategories.find();
  }
});

Template.insuranceCategoryList.events({
  'click #insuranceCategoryAddButton': function() {
    $('#insuranceCategoryAddModal').modal("show");
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
      Meteor.call('insuranceCategories.delete', currentId);
      swal("Deleted!", "Your data has been deleted.", "success");
    });
  }
});
