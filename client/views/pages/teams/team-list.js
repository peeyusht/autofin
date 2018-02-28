const handle = Meteor.subscribe('teams');

Template.teamList.rendered = function(){

    // Initialize dataTables
    $('.dataTables-TeamList').DataTable({
        dom: '<"html5buttons"B>lTfgitp',
        buttons: [
            { extend: 'copy'},
            {extend: 'csv', title: 'TeamFile'},
            {extend: 'excel', title: 'TeamFile'},
            {extend: 'pdf', title: 'TeamFile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]

    });

};

Template.teamList.helpers({
  team: function () {
    return Teams.find();
  }
});

Template.teamList.events({
  'click #teamAddButton': function() {
    FlowRouter.go("/admin/teamAdd");

//    $('#teamAddModal').modal("show");
  },
  'click #edit': function(){
//    Session.set('thisId', this._id);
    Session.set('teamId', this._id);

    FlowRouter.go("/admin/teamEdit");
//    $('#teamEditModal').modal("show");
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
      Meteor.call('teams.delete', currentId);
      swal("Deleted!", "Your data has been deleted.", "success");
    });
  }
});
