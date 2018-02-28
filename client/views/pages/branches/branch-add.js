Template.branchAdd.rendered = function(){
//  $('.modal').appendTo("body");

};


Template.branchAdd.events({
    'click #cancel': function(){
        console.log("Cancel Button Pressed");
        $('#branchAddModal').modal("hide");
    },
    'click #save': function(e, template){
        console.log("Save Button Pressed");
        e.preventDefault();

        branch = {
          name: template.find('#branchName').value,
          address: template.find('#branchAddress').value
        };

        Meteor.call('branches.add', branch);

        template.find('#branchName').value = "";
        template.find('#branchAddress').value = "";

        $('#branchAddModal').modal("hide");
    }
});
