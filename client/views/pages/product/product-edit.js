

Template.branchEdit.onRendered = function(){
//  $('.modal').appendTo("body");
};

Template.branchEdit.helpers({
  branch: function() {
    currentId = Session.get('thisId');
    return Branches.findOne({_id:currentId});
  }
})

Template.branchEdit.events({
    'click #cancel': function(){
      $('#branchEditModal').modal("hide");
    },
    'click #save': function(e, template){
        e.preventDefault();

        currentId = Session.get('thisId');

        branch = {
          name: template.find('#branchName').value,
          address: template.find('#branchAddress').value
        };

        Meteor.call('branches.update', currentId, branch);

        template.find('#branchName').value = "";
        template.find('#branchAddress').value = "";

        $('#branchEditModal').modal("hide");
    }
});
