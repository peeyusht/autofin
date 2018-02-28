const handle = Meteor.subscribe('users');

Template.userList.rendered = function(){

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

Template.userList.helpers({
  user: function () {
    return Meteor.users.find().fetch();
  },
  userEmail: function() {
    return this.emails[0].address;
  },
  userRole: function() {
    return this.roles[0];
  },
  userBranch: function() {
    var branch = Branches.findOne(this.profile.branch);

    if(branch) {
      return branch.name;
    }
  }
});

Template.userList.events({
  'click #userAddButton': function() {
    $('#userAddModal').modal("show");
  },
  'click #edit': function(){
    Session.set('thisId', this._id);

    $('#userEditModal').modal("show");
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
      Meteor.call('users.delete', currentId);
      swal("Deleted!", "User has been deleted.", "success");
    });
  }
});
