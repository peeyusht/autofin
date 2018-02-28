Template.userAdd.rendered = function(){
//  $('.modal').appendTo("body");

  $('.chosen-select').chosen({width: "100%"});

};


Template.userAdd.events({
    'click #cancel': function(){
        console.log("Cancel Button Pressed");
        $('#userAddModal').modal("hide");
    },
    'click #save': function(e, template){
        console.log("Save Button Pressed");
        e.preventDefault();

        user = {
          username: template.find('#userName').value,
          profile: {
            name: template.find('#fullName').value,
            mobile: template.find('#userMobile').value,
            branch: template.find('#userBranch').value,
            roles: template.find('#userRole').value
          },
          email: template.find('#userEmail').value,
          password: template.find('#userPassword').value
        };

        Meteor.call('users.add', user, function (error, result) {
          if(error){
            toastr.error(error.reason);
          } else {
            toastr.success("User Added Successfully");
          }
        });

        template.find('#userName').value = "";
        template.find('#fullName').value = "";
        template.find('#userEmail').value = "";
        template.find('#userPassword').value = "";
        template.find('#userMobile').value = "";
        template.find('#userRole').value = "";
        template.find('#userBranch').value = "";

        $('#userAddModal').modal("hide");
    }
});

Template.userAdd.helpers ({
  branch: function() {
    return Branches.find();
  }
})
