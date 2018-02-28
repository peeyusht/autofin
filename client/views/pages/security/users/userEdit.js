Template.userEdit.onRendered = function(){
//  $('.modal').appendTo("body");
};

Template.userEdit.helpers({
  user: function() {
    currentId = Session.get('thisId');
    return Meteor.users.findOne(currentId);
  },
  branch: function() {
    return Branches.find();
  },
  isSelectedRole: function(role){
    var currentId = Session.get('thisId');
    var user = Meteor.users.findOne(currentId);

    if(user && role === user.profile.roles){
      return 'selected';
    }
  },
  isSelectedBranch: function(branch){
    var currentId = Session.get('thisId');
    var user = Meteor.users.findOne(currentId);

    if(user && branch === user.profile.branch){
      return 'selected';
    }
  }
})

Template.userEdit.events({
    'click #cancel': function(){
      $('#userEditModal').modal("hide");
    },
    'click #save': function(e, template){
        e.preventDefault();

        user = {
          profile: {
            name: template.find('#userName').value,
            mobile: template.find('#userMobile').value,
            branch: template.find('#userBranch').value,
            roles: template.find('#userRole').value
          }
        };

        Meteor.call('users.update', Session.get('thisId'), user, function (error, result) {
          if(error){
            toastr.error(error.reason);
          } else {
            toastr.success("User Updated Successfully");
          }
        });

        template.find('#userName').value = "";
        template.find('#userEmail').value = "";
        template.find('#userMobile').value = "";
        template.find('#userRole').value = "";
        template.find('#userBranch').value = "";

        $('#userEditModal').modal("hide");
    }
});
